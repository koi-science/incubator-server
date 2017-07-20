#!/usr/bin/python2.7

import requests
import random
import time


datasets = [('1234', 10), ('5678', 20), ('9012', 30)]


while True:
	for d in datasets:
		data = {
			'id' : d[0],
			'curr_temp' : d[1] + random.randint(-10, 10),
			'set_temp' : d[1],
		}

		try:
			r = requests.post("http://dev.koi.science:4000/temperature/", data)
			print(r.status_code, r.reason)
		except requests.exceptions.ConnectionError:
			print("OOps!")

		time.sleep(2)

