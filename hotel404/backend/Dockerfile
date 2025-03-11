# Use Node.js official image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Ensure tsx is installed globally
RUN npm install -g tsx

# Copy the entire backend code
COPY . .

# Set environment variable for the port
ENV PORT=7700

# Expose backend port
EXPOSE 7700

# Start the backend
CMD ["npm", "start"]
