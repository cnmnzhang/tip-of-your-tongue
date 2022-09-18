import os
import requests

cat_endpoint = "https://api.thecatapi.com/v1/images/search"

# Read API from text file
def get_cat_api_key():
    return os.getenv("CAT_API_KEY")

# Request transcript
def request_cat(header):
    transcript_resp = requests.get(
        cat_endpoint,
        headers=header
    )

    return transcript_resp.json()