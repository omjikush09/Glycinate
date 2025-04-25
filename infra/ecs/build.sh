#!/bin/bash
set -exuo pipefail

# Ensure the scratch directory is clean and set up
echo "[*] Starting secure build in $SCRATCH_DIR"
mkdir -p "$SCRATCH_DIR"
cd "$SCRATCH_DIR"

# Clone the Git repository (provided via environment variable)
echo "[*] Cloning repo..."
git clone "$GIT_URL" . || { echo "❌ Clone failed"; exit 1; }

echo "[*] Checking out branch: $GIT_BRANCH"
git checkout "$GIT_BRANCH" || { echo "❌ Failed to checkout branch $GIT_BRANCH"; exit 1; }

# Install dependencies using the command provided in the environment variable
echo "[*] Installing dependencies with: $INSTALL_CMD"
eval "$INSTALL_CMD" || { echo "❌ Dependency installation failed"; exit 1; }

# Run the build command using the command provided in the environment variable
echo "[*] Building project with: $BUILD_CMD"
eval "$BUILD_CMD" || { echo "❌ Build failed"; exit 1; }

# Package the output (e.g., a dist/ folder or other artifacts)
echo "[*] Packaging output..."
cd ./dist || { echo "❌ Failed to change directory to ./dist"; exit 1; }
zip -r "$BUILD_OUTPUT" . || { echo "❌ Packaging failed"; exit 1; }

# Upload the build result to the signed S3 URL
echo "[*] Uploading to signed S3 URL..."
if curl -v --fail -H "User-Agent: Mozilla/5.0" -H "Content-Type: application/zip" -X PUT -T "$BUILD_OUTPUT" "$SIGNED_S3_URL"; then
  echo "[✓] Upload succeeded"
else
  echo "❌ Upload failed"
  exit 2
fi

echo "[✓] Build complete"
