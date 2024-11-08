# Use the official Node.js image as the base  
FROM node:21  

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Copy prisma folder to the container - helps image build faster
COPY prisma ./prisma/

# Install dependencies  
RUN npm ci

# Copy the app source code to the container  
COPY . .  

# This is to fix a bug with cnc deploy
RUN mkdir -p /root/.config/gcloud

# Ensure Prisma generates the client
RUN npx prisma generate

# Build the Next.js app  
RUN npm run build  

# # Remove development dependencies
RUN npm prune --omit=dev

# Expose the port the app will run on  
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"]  


