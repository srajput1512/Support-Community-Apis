import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import sys
import json
import os


# Define the department names
departments = ['Accounts', 'Finance', 'Sales']

# Read the training data from CSV file
filename = 'training_dataset.csv'
filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
train_data = pd.read_csv(filepath)

# Vectorize the training data
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_data['description'])

# Train the classifier
clf = MultinomialNB()
clf.fit(X_train, train_data['department'])

# Get the input description from user
description = sys.argv[1]

# Vectorize the input description
X_new = vectorizer.transform([description])

# Predict department for input description
predicted_department = clf.predict(X_new)[0]

# Check if predicted department is in the given department names
if predicted_department in departments:
    response = {'department': predicted_department}
else:
    response = {'department': 'no department found'}

# Serialize the predicted department as JSON and write to stdout
sys.stdout.write(json.dumps(response))
sys.stdout.flush()
