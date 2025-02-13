# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the container
COPY . .

# Expose the port Vite will use (default is 5173)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
