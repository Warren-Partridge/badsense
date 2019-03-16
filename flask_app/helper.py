import requests
import random


templates = ["Where can I buy %s?", 
			"I really love %s.", 
			"%s near me urgent", "where the fuck do I get more %s"]

def get_similar(word):
	response = requests.get(f'http://api.datamuse.com/words?ml={word}').json()
	final = []
	for entry in response:
		final.append(entry['word'])
	return final

def get_sentences(word):
	words_list = get_similar(word)
	final = []
	for w in words_list:
		temp = random.choice(templates)
		final.append(temp % w)
	return final
