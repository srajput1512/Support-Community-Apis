import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from textblob import TextBlob
import sys
import json
import os

# Define function to retrieve keyword list from file
def get_keywords(file_path):
    with open(file_path, 'r') as file:
        keywords = file.read().split('\n')
    return [word.lower() for word in keywords if word.strip()]

# Define function to detect toxic language in text
def detect_toxicity(text, abusive_keywords, racist_keywords, threat_keywords, idiot_keywords):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    toxic = False
    
    # Check for abusive keywords
    for word in abusive_keywords:
        if word in text.lower():
            toxic = True
            break
    
    # Check for racist keywords
    for word in racist_keywords:
        if word in text.lower():
            toxic = True
            break
    
    # Check for threat keywords
    for word in threat_keywords:
        if word in text.lower():
            toxic = True
            break
            
    # Check for idiot keywords
    for word in idiot_keywords:
        if word in text.lower():
            toxic = True
            break
    
    # Check for sentiment polarity
    if polarity < -0.5:
        toxic = True
        
    return toxic, polarity, subjectivity

# Retrieve keyword lists from files
dir_path = os.path.dirname(os.path.abspath(__file__))
abusive_url = os.path.join(dir_path, 'files/abusive_url.txt')
racist_url = os.path.join(dir_path, 'files/racist_url.txt')
threat_url = os.path.join(dir_path, 'files/threat_url.txt')
idiot_url = os.path.join(dir_path, 'files/idiot_url.txt')

abusive_keywords = get_keywords(abusive_url)
racist_keywords = get_keywords(racist_url)
threat_keywords = get_keywords(threat_url)
idiot_keywords = get_keywords(idiot_url)
idiot_keywords += ['fool', 'foolish', 'dumb']
# Load dataset
df_path = os.path.join(dir_path, 'files/df.txt')
df = pd.read_csv(df_path)

# Extract comment text and toxicity label
df = df[['tweet', 'class']]
df = df.rename(columns={'tweet': 'text', 'class': 'label'})

# Convert label to binary (1=toxic, 0=not toxic)
df['label'] = df['label'].apply(lambda x: 1 if x == 2 else 0)

# Create TF-IDF vectorizer to transform comments into feature matrix
vectorizer = TfidfVectorizer(lowercase=True, max_features=5000)
X = vectorizer.fit_transform(df['text'])
y = df['label']

# Train logistic regression model to predict toxicity labels based on feature matrix
model = LogisticRegression()
model.fit(X, y)

# Read input comment from command line arguments
comment = sys.argv[1]

# Detect toxicity
toxic, polarity, subjectivity = detect_toxicity(comment, abusive_keywords, racist_keywords, threat_keywords, idiot_keywords)

# Use trained model to predict label for input comment
comment_vec = vectorizer.transform([comment])
prediction = model.predict(comment_vec)[0]

# Generate output dictionary
output_dict = {
    'toxic': bool(toxic or prediction),
    'polarity': polarity,
    'subjectivity': subjectivity
}

# Return result in JSON format
print(json.dumps(output_dict))
