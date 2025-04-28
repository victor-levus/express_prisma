# Use the official Node.js image
FROM node:20-alpine3.21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# 6. Prisma generate (creates the Prisma Client)
RUN npx prisma generate

# (Optional) If you want to apply migrations automatically in production
# RUN npx prisma migrate deploy

# Expose the port
EXPOSE 5300

# Run the app
CMD ["node", "index.js"]
