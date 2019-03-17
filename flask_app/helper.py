import requests
import random
import re
from unidecode import unidecode

meme_noun_temps = ["Where can I buy %s?", 
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

meme_verb_temps = ["Where can I go %s?", 
			"I really love %s.", 
			"%s interest groups near me", 
			"is %s a normal hobby",
			"science behind %s",
			"where to buy %s equipment",
			"is it bad to be %s every day",
			"how to join %s team",
			"%s tutorials"]

noun_temps = ["Where can I go %s?",
			"%s appreciation day",
			"%s society",
			"%s club",
			"%s hobby",
			"%s facebook group",
			"buy %s on amazon",
			"%s bulk order",
			"where to find %s",
			"large amounts of %s on short notice",
			"%s memes",
			"%s reddit",
			"%s alternatives",
			"%s for cheap",
			"least expensive %s",
			"most expensive %s",
			"%s new version",
			"i just need some %s in my life",
			"i could really use some %s right now",
			"%s addiction",
			"%s bulk order urgent",
			"how to tell if addicted to %s",
			"%s near me urgent",
			"where to find more %s",
			"where the fuck do I get more %s",
			"all i want is some %s",
			"%s wikipedia"
]

verb_temps = [
			"competitive %s",
			"%s hobby groups near me",
			"%s clubs near me",
			"%s meetup",
			"%s tutorials",
			"casual %s",
			"%s tutorials",
			"daily %s blog",
			"%s store",
			"science behind %s",
			"Where can I go %s?", 
			"I really love %s.", 
			"%s interest groups near me", 
			"is %s a normal hobby",
			"science behind %s",
]

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
