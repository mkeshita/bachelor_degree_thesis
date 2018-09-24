#! /usr/bin/python3
# -*- coding: utf-8 -*-

from time import sleep
import requests, json


CONFIG_FILE = "../../../config.json" # File with API IP, API port, and Bearer token
TRIES = 3 # Number of tries to call the API if first try failed
WAIT_SECONDS = 5 # Seconds to wait between API calls on retry

def update_values_api(values_dict):
    # Read config (philips hue bridge) from file
    with open(CONFIG_FILE, "r") as f:
        config = json.load(f)

    # Set authorization header needed for authorized POST requests
    headers = { "Authorization" : "Bearer " + config["APIAuthorizedToken"] }

    # Prepare body JSON
    payload = {}
    for key in values_dict:
        payload[key] = values_dict[key]

    # Try to call the API thre times
    for _ in range(0,2):
        # Make the request to the API
        r = requests.post("http://" + config["APIAddress"] + ":" + str(config["APIPort"]) + "/cpd-update", json=payload, headers=headers)
        # If response status code != 200, wait 5s and retry
        if r.status_code == requests.codes.ok:
            return True # POST request sucessfully
        else:
            sleep(WAIT_SECONDS)
    return False # POST request unsucessfully
