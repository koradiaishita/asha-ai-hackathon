FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

# Build the app for production
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The port must be set by the PORT environment variable in Cloud Run
ENV PORT=8080

# Use shell form to use environment variables
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'