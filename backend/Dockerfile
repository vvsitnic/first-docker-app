FROM node
EXPOSE 3000
WORKDIR /app
COPY . .
RUN npm install --omit=dev
USER node
CMD ["node", "start.js"]