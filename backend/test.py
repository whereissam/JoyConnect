import requests

# Define the endpoint URL
url = 'http://172.21.10.105:8011/uploadImage'

# Open the image file
image_path = './test.jpg'  # Replace with your image file path

# Define the payload
payload = {
    'number': 3  # Replace with your integer
}

# Define the files to be uploaded
files = {
    'image': open(image_path, 'rb')
}

# Make the POST request
response = requests.post(url, data=payload, files=files)

# Print the response from the server
print(response.status_code)
print(response.json())
