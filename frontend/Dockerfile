# 1. Base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json & package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Install Angular CLI globally
RUN npm install -g @angular/cli@16

# 6. Copy all source files
COPY . .

# 7. Expose port
EXPOSE 4200

# 8. Start dev server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
