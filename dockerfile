# Use the official Node.js image as a base image
FROM node:20 as frontend

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the Next.js application will run (usually 3000)
EXPOSE 3000

# Command to run the Next.js application in development mode
CMD ["npm", "run", "dev"]