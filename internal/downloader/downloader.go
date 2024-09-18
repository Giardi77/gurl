package downloader

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

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

func DownloadFiles(urls []string, outputDir string, threads, timeout int) error {
	if err := os.MkdirAll(outputDir, 0766); err != nil {
		return fmt.Errorf("error creating output directory: %v", err)
	}

	jobs := make(chan string, len(urls))
	results := make(chan error, len(urls))

	// Start worker pool
	for w := 1; w <= threads; w++ {
		// Remove the w parameter when calling worker
		go worker(jobs, results, outputDir, timeout)
	}

	// Send jobs to workers
	for _, url := range urls {
		jobs <- url
	}
	close(jobs)

	// Collect results
	var errs []string
	for range urls {
		if err := <-results; err != nil {
			errs = append(errs, err.Error())
		}
	}

	if len(errs) > 0 {
		return fmt.Errorf("encountered errors: %s", strings.Join(errs, "; "))
	}

	return nil
}

// Remove the id parameter
func worker(jobs <-chan string, results chan<- error, outputDir string, timeout int) {
	for url := range jobs {
		results <- downloadFile(url, outputDir, timeout)
	}
}

func downloadFile(url, outputDir string, timeout int) error {
	client := &http.Client{
		Timeout: time.Duration(timeout) * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return fmt.Errorf("error downloading %s: %v", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status: %s", resp.Status)
	}

	filename := filepath.Base(url)
	filepath := filepath.Join(outputDir, filename)

	out, err := os.Create(filepath)
	if err != nil {
		return fmt.Errorf("error creating file %s: %v", filepath, err)
	}
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return fmt.Errorf("error writing to file %s: %v", filepath, err)
	}

	fmt.Printf("Downloaded: %s\n", filename)
	return nil
}
