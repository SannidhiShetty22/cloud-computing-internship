import boto3
from botocore.client import Config

s3 = boto3.client(
    "s3",
    endpoint_url="http://localhost:9000",
    aws_access_key_id="minioadmin",
    aws_secret_access_key="minioadmin123",
    region_name="us-east-1",
    config=Config(signature_version="s3v4")
)

bucket = "college-files"

print("Uploading file...")
s3.upload_file(
    "week2/test-file.txt",
    bucket,
    "test-file.txt"
)

print("\nFiles in bucket:")
response = s3.list_objects_v2(Bucket=bucket)

for obj in response.get("Contents", []):
    print("-", obj["Key"])

print("\nDownloading file...")
s3.download_file(
    bucket,
    "test-file.txt",
    "week2/downloaded-file.txt"
)

print("Download successful!")

print("\nDownloaded file content:")
with open("week2/downloaded-file.txt", "r") as file:
    print(file.read())