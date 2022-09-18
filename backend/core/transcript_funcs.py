import requests
import time
import os

upload_endpoint = "https://api.assemblyai.com/v2/upload"
transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
# download_num = 1

# Increment file number
# def increment_file():
#     download_num += 1


# Read API from text file
def get_api_key():
    return os.getenv("ASSEMBLYAI_API_KEY")

# upload helper
def _read_file(filename, chunk_size=5242889):
    with open(filename, "rb") as f:
        while True:
            data = f.read(chunk_size)
            if not data:
                break
            yield data


# Upload file to AssemblyAI
def upload_file(audio, header):
    upload_response = requests.post(upload_endpoint,
        headers=header,
        data=_read_file(audio)
    )
    return upload_response.json()


# Request transcript
def request_transcript(upload_url, lang, header):
    transcript_req = {
        "audio_url": upload_url["upload_url"],
        "language_code": lang 
    }

    transcript_resp = requests.post(
        transcript_endpoint,
        json=transcript_req,
        headers=header
    )

    return transcript_resp.json()

# Request transcript using audio url
def url_request_transcript(lang, header):
    transcript_req = {
        "audio_url": "blob:http://127.0.0.1:5501/39d2afd6-b7d4-493f-bca4-5e0578fcbc18",
        "language_code": lang 
    }

    transcript_resp = requests.post(
        transcript_endpoint,
        json=transcript_req,
        headers=header
    )

    return transcript_resp.json()


# Get endpoint for status request
def status_req_endpoint(transcript_response):
    status_req_endpoint = transcript_endpoint
    status_req_endpoint += "/" + transcript_response["id"]
    return status_req_endpoint

# Wait for the audio transcription to finish
def wait_for_completion(status_req_endpoint, header):
    while True:
        status_req_response = requests.get(status_req_endpoint, headers=header)
        status_req_response = status_req_response.json()

        if status_req_response["status"] == "completed":
            return status_req_response
            break

        # wait 2 seconds
        time.sleep(2)

def print_transcript(transcript_info):
    output = ""
    for word in transcript_info["words"]:
        output += word["text"] + " "
    return output
        