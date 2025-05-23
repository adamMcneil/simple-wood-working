#!/bin/bash

# Strip GPS/location metadata from all JPEG files in the given directory

# Usage: ./strip_location.sh /path/to/images

DIR="${1:-.}"  # Use current directory if none provided

if ! command -v exiftool &> /dev/null; then
    echo "Error: exiftool is not installed."
    exit 1
fi

echo "Stripping GPS metadata from JPEG images in: $DIR"

find "$DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    echo "Processing: $file"
    exiftool -gps:all= -xmp:geotag= -overwrite_original "$file"
done

echo "Done."
