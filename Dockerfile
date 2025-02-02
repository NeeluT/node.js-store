# Use Node.js image
FROM node:latest

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install nodemon globally for development purposes
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Command to start the application
CMD ["npm", "start"]
