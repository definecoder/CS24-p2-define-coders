
# FROM node:latest

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000


# CMD ["npm", "run", "dev"]

#if not works
#-------------------

# FROM node:18-alpine as base
# RUN apk add --no-cache g++ make py3-pip libc6-compat
# WORKDIR /app
# COPY package*.json ./
# EXPOSE 3000

# FROM base as builder
# WORKDIR /app
# COPY . .
# RUN npm run build


# FROM base as production
# WORKDIR /app

# ENV NODE_ENV=production
# RUN npm ci

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# CMD npm start

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install 
# COPY . .
# CMD npm run dev


# Use the Ubuntu base image
# Use the Ubuntu base image
FROM ubuntu:latest

# Install necessary packages for Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the Next.js project
CMD ["npm", "run", "dev"]
