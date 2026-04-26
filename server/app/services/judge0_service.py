import requests
import time

JUDGE0_URL = "https://ce.judge0.com"


def submit_code(source_code, language_id, stdin=""):
    url = f"{JUDGE0_URL}/submissions?base64_encoded=false&wait=false"

    payload = {
        "source_code": source_code,
        "language_id": language_id,
        "stdin": stdin
    }

    res = requests.post(url, json=payload)
    return res.json()["token"]


def get_result(token):
    url = f"{JUDGE0_URL}/submissions/{token}?base64_encoded=false"

    while True:
        res = requests.get(url).json()

        if res["status"]["id"] in [1, 2]:
            time.sleep(1)
            continue

        return res