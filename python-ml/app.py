import streamlit as st
import pickle 
import numpy as np 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

import sys
import os

cwd = os.getcwd()

def load_tfidf():
    tfidf = pickle.load(open(os.getcwd() + "/python-ml/tf_idf.pkt", "rb"))
    return tfidf

def load_model():
    nb_model = pickle.load(open(os.getcwd() + "/python-ml/toxicity_model.pkt", "rb"))
    return nb_model

def toxicity_prediction(text):
    tfidf = load_tfidf()
    text_tfidf = tfidf.transform([text]).toarray()
    nb_model = load_model()
    prediction = nb_model.predict(text_tfidf)
    class_name = "tox" if prediction == 1 else "non-tox"
    print(class_name)

api_response_value = sys.argv[1]

print(toxicity_prediction(api_response_value))