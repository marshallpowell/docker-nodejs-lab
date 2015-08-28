FROM fedora:22

# Install Node.js and npm #yum install -y npm
RUN /usr/bin/dnf install -y npm

#create the dir for your node app
RUN mkdir src

# Bundle app source
COPY ./nodejs/src /src/
COPY ./nodejs/src/package.json /

ENV NODE_PATH=/node_modules

# Install app dependencies
RUN npm install

#Your node app is set to listen on 8001, so we tell docker to expose that port
EXPOSE  8001

#Define the command to start your node application
CMD ["node", "src/app.js"]

#example build command: sudo docker build -t vagrant/nodejs-client
#example run command with local volume mount: sudo docker run -d -p 8000:8000 --volume=/vagrant/docker-nodejs-lab/docker-lab-client/nodejs/src:/src --name client vagrant/nodejs-client
