# Week 4 - Multi-Service Docker Compose Stack

## Objective

The objective of this task is to deploy the College Management System as a multi-service application using Docker Compose.

The application consists of three services:

- Nginx - Reverse proxy
- Node.js + Express - Backend application
- MySQL - Database

## Architecture

```text
              Browser
                 |
                 | HTTP :8080
                 v
          +-------------+
          |    Nginx    |
          |   :8080     |
          +-------------+
                 |
                 | proxy
                 v
          +-------------+
          |   Backend   |
          | Node/Express|
          |    :5000    |
          +-------------+
                 |
                 | MySQL connection
                 v
          +-------------+
          |    MySQL    |
          |    :3306    |
          +-------------+
                 |
                 v
            collegedata