![Logo](gurl_logo.png)

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contribute">Contribute</a>
</p>

# Features

- Download **multiple files** concurrently
- Support for **custom HTTP headers**
- Handles **rate limiting** and **too many requests** errors 

# Installation and update

    go install github.com/Giardi77/gurl/cmd/gurl@latest


# Usage

gurl supports various options for flexible file downloading:

### Download:

    gurl -u <url>
    gurl -l <file>
    cat urls.txt | gurl

### Other useful
    
 - `gurl -t <threads>` # Set number of concurrent downloads (Default maximum possible)
 - `gurl -timeout <seconds>` # Set timeout for each download
 - `gurl -H "Key: Value"` # Add custom HTTP headers (More than one accepted)
 - `gurl -s` # Silent mode (no output)
 - `gurl -o <directory>` # Set output directory
