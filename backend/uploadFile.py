import requests

API_BASE_URL = 'http://localhost:8000'

def upload_file(file_path):
    url = f"{API_BASE_URL}/upload"
    try:
        with open(file_path, 'rb') as file:  
            files = {'file': file}  
            response = requests.post(url, files=files)
            response.raise_for_status()  
            print("Response:", response.json())  
    except requests.exceptions.RequestException as e:
        print("Error:", e)
    except Exception as e:
        print("Unexpected Error:", e)

file_path = './video.mp4'
upload_file(file_path)
