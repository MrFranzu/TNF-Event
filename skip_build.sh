# skip_build.sh
#!/bin/bash

# Check if the build output directory exists
if [ -d "build" ]; then
  echo "Build directory exists, skipping build..."
  exit 0
else
  echo "No build directory, proceeding with build..."
  npm run build
fi
