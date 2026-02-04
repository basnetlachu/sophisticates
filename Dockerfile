# Build and Run Stage
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files from the app subdirectory
COPY sophisticates-react/package*.json ./

# Install dependencies
RUN npm install

# Copy the app subdirectory content
COPY sophisticates-react/ .

# Build the frontend
RUN npm run build

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port (Coolify will use this)
EXPOSE 3000

# Start the server
CMD ["node", "server/index.js"]
