import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

df = pd.read_csv('final_dataset.csv')

# Test on just 3 resumes first
sample = df['Cleaned_Text'].head(3)

# Create TF-IDF converter
vectorizer = TfidfVectorizer(max_features=10)  # only top 10 words for now

# Convert text → numbers
result = vectorizer.fit_transform(sample)

# See what it looks like
print("📝 Original text (first 60 chars):")
for i, text in enumerate(sample):
    print(f"  Resume {i+1}: {text[:60]}...")

print("\n🔢 After TF-IDF conversion (numbers!):")
print(result.toarray())

print("\n📋 The 10 words these numbers represent:")
print(vectorizer.get_feature_names_out())