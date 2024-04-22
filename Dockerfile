FROM node:20-alpine

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any dependencies
RUN npm install --production

COPY . .

# app binds to port 3000, make sure the container exposes this port
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "transactionsewer.js" ]
