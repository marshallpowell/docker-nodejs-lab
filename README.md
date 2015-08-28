# docker-nodejs-lab

## Prerequisites for this lab include

### Download and Install Docker

* Fedora / RedHat Users run the below commands:
* `sudo wget -qO- https://get.docker.com/ | sh`
* `sudo service docker start`

* Other Linux Users: [click here](http://docs.docker.com/linux/step_one/)
* Windows Users: [click here](http://docs.docker.com/windows/step_one/)
* Mac Users: [click here](http://docs.docker.com/mac/step_one/) 


### Clone this project 
Navigate to the directory you will use for your project and run the below commands. If you are using the RH vagrant box, navigate to the /vagrant directory.

* `git clone https://github.com/marshallpowell/docker-nodejs-lab.git`

### Build the Docker image

* Navigate to the docker-lab-client directory (where the DockerFile is)
* Run this command to build the container: `sudo docker build -t vagrant/nodejs-client .`
* Run this command to run the container: `sudo docker run -d -p 8000:8000 --name client vagrant/nodejs-client`
* Open your browser and navigate to [http://localhost:8000](http://localhost:8000) , It should show a welcome page.
* That's it.
  
## The lab
Make sure you have the latest src before starting. Run git pull from the base directory of the project.

### Step 1
Link the client container with server container. To see that it is working properly you should be able to go to the /showProfile screen, 
submit the form and you will get an alter with the user's new ID. Create several users by changing the form data and pressing submit.

### Step 2
Implement the /getUsers controller on the client so that it displays a list of all the users saved on the server. You will need to create
a new template for the page. Add a new method to the UserService. See the / page for some instruction on how to use the handlebar templating features.

### Step 3
Update the /showProfile controller to show a user's profile if a "id" is passed in as a query param. You will need to implement an search capability within
the server. Add a new method to the UserService

### Step 4
Add a email validation to the userValidation class. Validate it works client side, then remove it from the code. See that it works server side too.

### Handy Docker commands 
[Docker CLI](https://docs.docker.com/reference/commandline/cli/)

#####show all the commands for the docker cli
`docker help`

#####show help info for any of the commands
`docker <any command> --help`

#####show list of all the running containers (useful to see if run worked, and to get a container id)
`sudo docker ps`

#####stop/start/restart a running docker process
`docker stop <container tag name>`
`docker start <container tag name>`
`docker restart <container tag name>`

#####delete a Docker container (useful when you are updating and testing the Dockerfile)
`docker rm <conainer id>`

#####build a docker container from a Dockerfile (must be in the directory of the Dockerfile)
`sudo docker build -t vagrant/nodejs-client . `

#####show all the docker images in your local repo
`docker images`

#####remove a docker image from your repository
`docker rmi <image id>`

#####builder a docker container, the -t is for tag
`docker build -t vagrant/nodejs-server .`

#####run a docker container in its simplest form. -d specificies to run the container in its own dameon. --name gives your container a easy to remeber name (docker will assign a random one if not). 
`docker run -d --name myserver vagrant/nodejs-server`

##### run a docker container with advanced options. -p specifies the public port which maps to the internal port. --link specifies it to link up with another container. --volume specifies a directory to mount on your local file system. The last arg is the tag for the container you want to run
`docker run -d -p 8000:8000 --link myserver --volume /vagrant/docker-nodejs-lab/docker-lab-client/nodejs/src/:/src --name client vagrant/nodejs-client`

##### open up a shell within a container
docker exec -i -t <container name> bash

##### show logs from a running container
docker logs <container name>

