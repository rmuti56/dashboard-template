# Use the official Node.js 16 image
FROM --platform=Linux/X86_64 node:16-alpine

# Set the working directory to /app
WORKDIR /app

COPY dist ./dist

# Expose port 3000
EXPOSE 3000

# Set the command that will start the production serve
CMD ["serve", "-s", "dist"]