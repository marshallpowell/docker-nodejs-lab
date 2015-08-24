FROM fedora:22

# Install Node.js and npm #yum install -y npm
RUN /usr/bin/dnf install -y npm

#create the dir for your node app
RUN mkdir nodejs; cd nodejs; mkdir src

# Bundle app source
COPY ./nodejs/src nodejs/src/

# Install app dependencies
RUN cd nodejs/src; npm install

#Your node app is set to listen on 8000, so we tell docker to expose that port
EXPOSE  8000

#Define the command to start your node application
CMD ["node", "nodejs/src/app.js"]
