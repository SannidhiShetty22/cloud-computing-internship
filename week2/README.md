# Week 2 - Local Cloud Storage Simulation with MinIO

## Objective

The objective of this task is to simulate cloud object storage locally without using a real AWS account or incurring cloud costs.

## Technology Used

- Docker
- Docker Compose
- MinIO
- Python
- Boto3

## Architecture

Python Application
        |
        v
MinIO Object Storage
        |
        v
college-files Bucket

## Setup

Start MinIO using:

```bash
docker compose -f week2/docker-compose.yml up -d