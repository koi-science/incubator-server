#!/usr/bin/python2.7

import requests
import random
import time




temps = [10, 20, 30]

while True:
	for t in temps:
		n = 20
		while n > 0:
			data={
				'id' : '1234',
				'curr_temp' : t + random.randint(-10, 10),
				'set_temp' : t
			}
			try:
				r = requests.post("http://dev.koi.science:3000/temperature/", data)
			except requests.exceptions.ConnectionError:
				print("OOps!")
			print(r.status_code, r.reason)
			n -= 1

			time.sleep(2)



