 
# Use Node.js official image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Expose frontend port (3000)
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
