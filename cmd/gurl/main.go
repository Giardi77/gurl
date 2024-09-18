package main

import (
	"flag"
	"fmt"
	"io"
	"os"
	"runtime"
	"strings"

	"github.com/Giardi77/gurl/internal/downloader"
)

const version = "1.0.0"

func main() {
	var (
		url         string
		listFile    string
		output      string
		threads     int
		timeout     int
		headers     stringSlice
		silent      bool
		showVersion bool
	)

	flag.StringVar(&url, "u", "", "Single URL to download")
	flag.StringVar(&listFile, "l", "", "File containing list of URLs to download")
	flag.StringVar(&output, "o", "gurl_downloads", "Output directory for downloaded files")
	flag.IntVar(&threads, "t", runtime.GOMAXPROCS(runtime.NumCPU()), "Number of concurrent download threads")
	flag.IntVar(&timeout, "timeout", 0, "Timeout in seconds for each download (0 for no timeout)")
	flag.Var(&headers, "H", "Custom HTTP header in the format 'key: value' (can be used multiple times)")
	flag.BoolVar(&silent, "s", false, "Silent mode: suppress all output")
	flag.BoolVar(&silent, "silent", false, "Silent mode: suppress all output")
	flag.BoolVar(&showVersion, "version", false, "Show version information")
	flag.Parse()

	if showVersion {
		fmt.Printf("gurl version %s\n", version)
		os.Exit(0)
	}

	// Set up output writers based on silent mode
	var stdout, stderr io.Writer
	if silent {
		stdout = io.Discard
		stderr = io.Discard
	} else {
		stdout = os.Stdout
		stderr = os.Stderr
	}

	urls, err := downloader.GetURLs(url, listFile)
	if err != nil {
		fmt.Fprintf(stderr, "Error getting URLs: %v\n", err)
		os.Exit(1)
	}

	if len(urls) == 0 {
		fmt.Fprintln(stderr, "No URLs provided. Use -u for a single URL, -l for a file list, or pipe URLs.")
		flag.PrintDefaults()
		os.Exit(1)
	}

	headerMap, err := parseHeaders(headers)
	if err != nil {
		fmt.Fprintf(stderr, "Error parsing headers: %v\n", err)
		os.Exit(1)
	}

	downloadErrors, criticalError := downloader.DownloadFiles(urls, output, threads, timeout, headerMap, silent)

	if criticalError != nil {
		fmt.Fprintf(stderr, "Critical error during download: %v\n", criticalError)
		os.Exit(1)
	}

	if len(downloadErrors) > 0 {
		fmt.Fprintf(stderr, "Some downloads failed:\n")
		for _, err := range downloadErrors {
			fmt.Fprintf(stderr, "- %v\n", err)
		}
	}

	fmt.Fprintln(stdout, "Download process completed.")
}

type stringSlice []string

func (s *stringSlice) String() string {
	return strings.Join(*s, ", ")
}

func (s *stringSlice) Set(value string) error {
	*s = append(*s, value)
	return nil
}

func parseHeaders(headers []string) (map[string]string, error) {
	headerMap := make(map[string]string)
	for _, header := range headers {
		parts := strings.SplitN(header, ":", 2)
		if len(parts) != 2 {
			return nil, fmt.Errorf("invalid header format: %s", header)
		}
		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])
		headerMap[key] = value
	}
	return headerMap, nil
}
