import boto3
import os
from flask import Flask
from flask import render_template
from flask import request
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

s3endpoint = 'https://s3.bitiful.net' 
s3region = 'cn-east-1'
s3accessKeyId = os.getenv('S3_ACCESS_KEY_ID') #Get the access key ID from the env file
s3SecretKeyId = os.getenv('S3_SECRET_KEY_ID') #Get the secret key ID from the env file 


client = boto3.client(
    's3',
    aws_access_key_id = s3accessKeyId,
    aws_secret_access_key = s3SecretKeyId,
    endpoint_url = s3endpoint,
    region_name = s3region
)

@app.get('/policyweb')
def get_policy_uploa_web():
    return render_template('policy.html')

@app.get('/policyupload_url')
def get_policy_upload_url():
    subfolder = 'policyhomework/'
    key = F"{subfolder}{request.args.get('key')}"
    url = client.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': 'databackuphomework',
            'Key': key,
        },
        ExpiresIn=3600
    )
    return {'url': url}

@app.get('/dataweb')
def get_data_upload_web():
    return render_template('data.html')

@app.get('/dataupload_url')
def get_data_upload_url():
    subfolder = 'homework108/'
    key = F"{subfolder}{request.args.get('key')}"
    url = client.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': 'databackuphomework',
            'Key': key,
        },
        ExpiresIn=3600
    )
    return {'url': url}
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)