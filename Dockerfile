# Use the official Node.js image (LTS version recommended)
FROM node:18-alpine

# Create app directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
# If you're using Yarn, use: RUN yarn install

# Copy the rest of your backend files
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000

# The command to start your backend
CMD ["node", "index.js"]
