 
# Use Node.js official image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend code
COPY . .

# Expose backend port (7700)
EXPOSE 7700

# Start the backend
CMD ["npm", "start"]
