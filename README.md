# Optimize HTTP Server

---

## Running Locally
1. Clone this repo.
```sh
git clone git@github.com:devansh016/http-server-assignment.git
```
2. Build the Docker Image
```sh
docker build -t optimise-http-server .
```
3. Run the Docker Image
```sh
docker run -p 8080:8080 --memory=1500m --cpus=2 optimise-http-server
```
4. The application will be running on port 8080.

## Optimisation
Used fs.createReadStream instead of fs.readFile to optimise the performance as the file are large in size ~100MB.
