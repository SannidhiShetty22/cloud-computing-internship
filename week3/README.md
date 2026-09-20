# Week 3 - Dockerise an Application

## Objective

The objective of this task is to package the College Management System backend into a Docker container.

## Technology Used

- Node.js
- Express.js
- Docker
- Docker Desktop
- Node.js Alpine image

## Docker Image

Image name:

`- `screenshots/docker-running-week3.png``

## Dockerfile

The Dockerfile uses Node.js 20 Alpine as a lightweight base image.

The application dependencies are installed using `npm ci --omit=dev`.

The backend runs on port 5000.

## Build the Docker Image

```bash
docker build -t college-management-backend:week3 .