FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
ARG NEXT_PUBLIC_API_URL
# Environment variables
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--dns-result-order=ipv4first
RUN npm install --legacy-peer-deps
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TYPESCRIPT_CHECK=0
RUN npm run build --no-lint
EXPOSE 3000
CMD ["npm", "start"]