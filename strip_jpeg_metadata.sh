#!/bin/bash

# Check if directory is passed
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

TARGET_DIR="$1"

# Step 1: Apply orientation physically
# Step 2: Strip metadata (including orientation tag)
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' file; do
  echo "Fixing orientation and stripping metadata: $file"
  # This rotates pixels and resets orientation to 1
  exiftool -overwrite_original -auto-orient "$file"
  # Now strip all metadata (orientation has been applied)
  exiftool -overwrite_original -all= "$file"
done
