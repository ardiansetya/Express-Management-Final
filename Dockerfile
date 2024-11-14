# Use Node.js official image (Alpine-based for a smaller image size)
FROM node:16-alpine

# Install build tools to support native dependencies (like bcrypt)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && apk add --no-cache --virtual .build-deps \
    bash

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and the rest of the project files
COPY prisma ./prisma/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port (default port for most Node.js apps)
EXPOSE 3000

# Start the app with nodemon in development mode
CMD ["npx", "nodemon", "src/app.js"]
