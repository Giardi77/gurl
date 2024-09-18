package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"

	"github.com/Giardi77/gurl/internal/downloader"
)

func main() {
	var (
		url      string
		listFile string
		output   string
		threads  int
		timeout  int
	)

	flag.StringVar(&url, "u", "", "Single URL to download")
	flag.StringVar(&listFile, "l", "", "File containing list of URLs to download")
	flag.StringVar(&output, "o", "gurl_downloads", "Output directory for downloaded files")
	flag.IntVar(&threads, "t", runtime.GOMAXPROCS(0), "Number of concurrent download threads")
	flag.IntVar(&timeout, "timeout", 0, "Timeout in seconds for each download (0 for no timeout)")
	flag.Parse()

	urls, err := downloader.GetURLs(url, listFile)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting URLs: %v\n", err)
		os.Exit(1)
	}

	if len(urls) == 0 {
		fmt.Println("No URLs provided. Use -u for a single URL, -l for a file list, or pipe URLs.")
		flag.PrintDefaults()
		os.Exit(1)
	}

	err = downloader.DownloadFiles(urls, output, threads, timeout)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error during download: %v\n", err)
		os.Exit(1)
	}
}
