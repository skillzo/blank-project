FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "build"]


FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html  
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]