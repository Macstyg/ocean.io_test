# Project description

Project is an kubernetes cluster consists of two pods: auth application and instance of MongoDB. Those pods are wired with services and proxy withing the ingress-nginx controller. To run application localy, you need to have docker and kubernetes running, and install skaffold and ingress-nginx <https://github.com/kubernetes/ingress-nginx>. Also you need to add the following line to you /etc/hosts file

> 127.0.0.1 ocean.dev

## Install and run

- **Install**: `npm install && npm run createSecret`
- **Run**: `npm start`

# Technologies used

- [Node.js](http://nodejs.org/) JS runtime
- [Expressjs](https://expressjs.com) Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com) MongoDB is a document database with the scalability and flexibility
- [Skaffold](http://skaffold.dev/) Skaffold handles the workflow for building, pushing and deploying your application
- [Kubernetes](https://kubernetes.io) System for automating deployment, scaling, and management of containerized applications

# TODO

Create test coverage
