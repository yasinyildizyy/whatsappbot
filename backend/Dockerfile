# Base image
FROM node:20-slim

# Install Chromium and dependencies
RUN apt-get update && \\
    apt-get install -y \\
    chromium \\
    libxss1 \\
    libatk-bridge2.0-0 \\
    libgtk-3-0 \\
    libasound2 \\
    libnss3 \\
    libx11-xcb1 \\
    libxcomposite1 \\
    libxcursor1 \\
    libxdamage1 \\
    libxext6 \\
    libxfixes3 \\
    libxi6 \\
    libxrandr2 \\
    libxrender1 \\
    libxtst6 \\
    fonts-liberation \\
    libappindicator1 \\
    xdg-utils \\
    && apt-get clean \\
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer env variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port and run application
EXPOSE 3000
CMD ["npm", "start"]