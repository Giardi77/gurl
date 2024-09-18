package downloader

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/fatih/color"
	"github.com/schollz/progressbar/v3"
	"github.com/valyala/fasthttp"
)

// Global variable to track if we should stop due to too many requests
var shouldStop atomic.Bool

func GetURLs(url, listFile string) ([]string, error) {
	var urls []string

	if url != "" {
		urls = append(urls, url)
	}

	if listFile != "" {
		fileUrls, err := readUrlsFromFile(listFile)
		if err != nil {
			return nil, err
		}
		urls = append(urls, fileUrls...)
	}

	if len(urls) == 0 {
		stat, _ := os.Stdin.Stat()
		if (stat.Mode() & os.ModeCharDevice) == 0 {
			scanner := bufio.NewScanner(os.Stdin)
			for scanner.Scan() {
				urls = append(urls, strings.TrimSpace(scanner.Text()))
			}
		}
	}

	return urls, nil
}

func readUrlsFromFile(filename string) ([]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var urls []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		urls = append(urls, strings.TrimSpace(scanner.Text()))
	}

	return urls, scanner.Err()
}

func DownloadFiles(urls []string, outputDir string, threads, timeout int, headers map[string]string, silent bool) ([]error, error) {
	if err := os.MkdirAll(outputDir, 0766); err != nil {
		return nil, fmt.Errorf("error creating output directory: %v", err)
	}

	var wg sync.WaitGroup
	errors := make(chan error, len(urls))

	semaphore := make(chan struct{}, threads)

	client := &fasthttp.Client{
		ReadTimeout:     time.Duration(timeout) * time.Second,
		WriteTimeout:    time.Duration(timeout) * time.Second,
		MaxConnsPerHost: threads,
	}

	shouldStop.Store(false)

	var bar *progressbar.ProgressBar
	if !silent {
		bar = progressbar.Default(int64(len(urls)))
	}

	for _, url := range urls {
		wg.Add(1)
		go func(url string) {
			defer wg.Done()
			semaphore <- struct{}{}
			defer func() { <-semaphore }()

			if shouldStop.Load() {
				errors <- fmt.Errorf("skipped %s due to too many requests", url)
				if !silent && bar != nil {
					bar.Add(1)
				}
				return
			}

			if err := downloadFile(client, url, outputDir, headers); err != nil {
				errors <- err
			}
			if !silent && bar != nil {
				bar.Add(1)
			}
		}(url)
	}

	wg.Wait()
	close(errors)

	if !silent {
		fmt.Println() // New line after progress bar
	}

	var downloadErrors []error
	for err := range errors {
		if err != nil {
			downloadErrors = append(downloadErrors, err)
		}
	}

	if shouldStop.Load() {
		return downloadErrors, fmt.Errorf("downloads stopped due to too many request errors")
	}

	return downloadErrors, nil
}

func downloadFile(client *fasthttp.Client, url, outputDir string, headers map[string]string) error {
	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()
	defer fasthttp.ReleaseRequest(req)
	defer fasthttp.ReleaseResponse(resp)

	req.SetRequestURI(url)
	for key, value := range headers {
		req.Header.Set(key, value)
	}

	maxRetries := 3
	for i := 0; i < maxRetries; i++ {
		if err := client.Do(req, resp); err != nil {
			return fmt.Errorf("[ERROR] %s: %v", url, err)
		}

		switch resp.StatusCode() {
		case fasthttp.StatusOK:
			filename := filepath.Base(url)
			filepath := filepath.Join(outputDir, filename)

			if err := os.WriteFile(filepath, resp.Body(), 0644); err != nil {
				return fmt.Errorf("[ERROR] %s: error writing to file: %v", url, err)
			}

			return nil
		case fasthttp.StatusTooManyRequests:
			if i == maxRetries-1 {
				shouldStop.Store(true)
				return fmt.Errorf("%s %s: too many requests, stopping further downloads", color.RedString("[%d]", resp.StatusCode()), url)
			}
			retryAfter := resp.Header.Peek("Retry-After")
			if len(retryAfter) > 0 {
				seconds, _ := time.ParseDuration(string(retryAfter) + "s")
				time.Sleep(seconds)
			} else {
				time.Sleep(time.Duration(i+1) * time.Second)
			}
		default:
			return fmt.Errorf("%s %s", color.RedString("[%d]", resp.StatusCode()), url)
		}
	}

	return fmt.Errorf("[ERROR] %s: failed to download after %d retries", url, maxRetries)
}
