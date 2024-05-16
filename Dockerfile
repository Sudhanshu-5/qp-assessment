# Starting image with a node base image
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# copy project dir to docker local dir
COPY . .

# Build TypeScript code
RUN npm run build

# Start a new stage from a smaller base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the port on which app runs 
EXPOSE 3001

# Command to run the application
CMD ["node", "./dist/index.js"]