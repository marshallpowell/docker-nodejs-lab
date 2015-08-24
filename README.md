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
  


