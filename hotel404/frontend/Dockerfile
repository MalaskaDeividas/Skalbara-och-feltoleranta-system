# First stage: Build the React app
FROM node:16-alpine as build-stage

WORKDIR /app

# Copy package.json first to optimize Docker caching
COPY package*.json ./
RUN npm install

# Now copy the rest of the files
COPY . .

# Build the React app
RUN npm run build  

# Second stage: Serve the static files with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React files to Nginx’s serving directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to serve the React app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
