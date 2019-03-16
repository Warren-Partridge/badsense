from flask import Flask, jsonify
from helper import get_similar, get_sentences
import os

app = Flask(__name__)

@app.route('/')
def error():
	return "No word specified. format: https://FULL_PATH/<word>"

@app.route('/<word>')
def index(word):
	return jsonify(get_sentences(word))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)