![Logo](gurl_logo.png)

<h4 align="center">🚀 Download files concurrently with ease! 🚀</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contribute">Contribute</a>
</p>

# Features

- Download **multiple files** concurrently
- Support for **custom HTTP headers**
- **Progress bar** for visual feedback
- **Silent mode** for script integration
- **Timeout** settings for each download
- Handles **rate limiting** and **too many requests** errors

# Installation and update

    go install github.com/Giardi77/gurl/cmd/gurl@latest


# Usage

gurl supports various options for flexible file downloading:


gurl -u <url> # Download a single URL
gurl -l <file> # Download URLs from a file
gurl -t <threads> # Set number of concurrent downloads
gurl -timeout <seconds> # Set timeout for each download
gurl -H "Key: Value" # Add custom HTTP headers
gurl -s # Silent mode (no output)
gurl -o <directory> # Set output directory          # Download a single URL