# save this as fix_model.py and run it once
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load your cleaned dataset
df = pd.read_csv('final_dataset.csv')

X = df['Cleaned_Text']
y = df['Category']

# Re-fit vectorizer and model properly
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
X_vec = vectorizer.fit_transform(X)

model = LogisticRegression(max_iter=1000, C=1.0)
model.fit(X_vec, y)

# Save both correctly
joblib.dump(vectorizer, 'vectorizer.pkl')
joblib.dump(model, 'resume_model.pkl')

print("✅ vectorizer.pkl and resume_model.pkl saved correctly!")
print(f"   Categories: {model.classes_}")
print(f"   Vocabulary size: {len(vectorizer.vocabulary_)}")