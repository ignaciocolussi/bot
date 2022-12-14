FROM node:18-bullseye-slim

# Create app directory
WORKDIR /usr/src

RUN apt update && apt install -yq tzdata expect vim openssl

#Set Timezone
RUN ln -fs /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
 RUN npm ci --only=production

# Bundle app source
COPY src/ /usr/src


EXPOSE 80

# 👇 new migrate and start app script
CMD [  "npm", "run", "start" ]