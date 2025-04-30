# Use the official latest Node.js image
FROM node:22-slim

# Install git and zip utilities
RUN apt-get update && apt-get install -y git zip bash curl

# Create a non-root user for security
RUN useradd -m -u 1001 builder

# Set working directory to ephemeral scratch space (/tmp)
WORKDIR /tmp/build

# Ensure the builder user has write access to /tmp/build
RUN chown -R builder:builder /tmp/build

# Copy build script into the container
COPY build.sh /usr/local/bin/build.sh

# Give execute permissions to the build script
RUN chmod +x /usr/local/bin/build.sh
RUN ls -l /usr/local/bin/

# Set environment variables for build process (these will be overridden at runtime)
ENV BUILD_OUTPUT=output.zip
ENV SCRATCH_DIR=/tmp/build
ENV BUILD_FOLDER=./dist
ENV BASE_FOLDER="."
ENV INSTALL_CMD="npm install"
ENV BUILD_CMD="npm run build"

# Switch to the non-root user
USER builder

# Set the entrypoint to the build script
ENTRYPOINT ["/usr/local/bin/build.sh"]
