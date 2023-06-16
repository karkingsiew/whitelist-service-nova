FROM node:18-alpine

# Set to install production dependencies only
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose port 80
EXPOSE 80

# Run node.js application
CMD [ "node", "whitelist-service.js" ]