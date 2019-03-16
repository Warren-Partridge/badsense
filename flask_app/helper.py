import requests
import random
import re
from unidecode import unidecode

noun_temps = ["Where can I buy %s?", 
			"I really love %s.", 
			"%s near me urgent", 
			"where the fuck do I get more %s",
			"gimme more %s",
			"i could really use some %s right now",
			"%s tutorials",
			"where to get more %s",
			"%s interest group near me",
			"people who love %s",
			"all i want is some %s",
			"i just need some %s in my life",
			"%s shops",
			"%s shops near me",
			"%s addiction",
			"%s addiction support group",
			"how to tell if addicted to %s",
			"%s addiction medical condition",
			"where to find more %s",
			"MORE %s",
			"%s bulk order urgent"
			]

verb_temps = ["Where can I go %s?", 
			"I really love %s.", 
			"%s interest groups near me", 
			"is %s a normal hobby",
			"science behind %s",
			"where to buy %s equipment",
			"is it bad to be %s every day",
			"how to join %s team",
			"%s tutorials"]

def get_similar(word):
	response = requests.get(f'http://api.datamuse.com/words?ml={word}').json()
	final = []
	for entry in response:
		word = entry['word']
		final.append(unidecode(word))
	return final

def get_sentences(word):
	words_list = get_similar(word)
	final = []
	for w in words_list:
		if re.search(r"ing\b", w):
			print("chose verb")
			temp = random.choice(verb_temps)
		else:
			temp = random.choice(noun_temps)
		final.append(temp % w)
	return final
