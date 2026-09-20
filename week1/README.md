# College Management System - Cloud Architecture

## Overview

This project presents a 3-tier cloud architecture for a College Management System.

The architecture is designed to support students, faculty, and administrators while providing scalability, caching, database storage, and object storage.

## Architecture

![Cloud Architecture](cloud-architecture.png)

## Components

### 1. Client Tier
Students, faculty, and administrators access the system through a web browser.

### 2. Cloud Load Balancer
The load balancer receives incoming HTTPS requests and distributes traffic across multiple application servers.

### 3. Application Servers
Node.js and Express application servers handle the application's business logic and API requests.

Two application servers are shown to support horizontal scaling.

### 4. Redis Cache
Redis stores frequently accessed data temporarily.

This reduces repeated database queries and improves application response time.

### 5. MySQL Database
MySQL stores structured college management data such as:

- Students
- Faculty
- Courses
- Marks
- Attendance

### 6. Amazon S3 Object Storage
Object storage is used for files such as:

- Student profile photos
- Documents
- Uploaded files

### 7. Horizontal Scaling
Additional application server instances can be added when traffic increases.

The load balancer distributes requests between the available application servers.

## Why This Architecture?

The architecture separates the client, application, and database layers.

This makes the system easier to scale and maintain. Multiple application servers improve availability, Redis reduces database load, and object storage is suitable for storing uploaded files.

## Technologies

- Node.js
- Express.js
- MySQL
- Redis
- Amazon S3
- Cloud Load Balancer
- draw.io