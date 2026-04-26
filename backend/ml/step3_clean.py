import pandas as pd        # ← FIXED! was "from turtle import pd"
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

df = pd.read_csv('master_dataset.csv')
print("Before fix:", df['Category'].nunique(), "unique categories")

# Fix duplicate/inconsistent category names
category_mapping = {
    'Health and fitness':     'Health & Fitness',
    'DevOps Engineer':        'DevOps',
    'Blockchain Developer':   'Blockchain',
    'Designing':              'UI/UX Designer',
    'Information Technology': 'Software Developer',
    'Managment':              'Operations Manager',
    'Automation Testing':     'Testing',
}

df['Category'] = df['Category'].replace(category_mapping)

print("After fix :", df['Category'].nunique(), "unique categories")
print("\nAll categories now:")
print(df['Category'].value_counts().to_string())

# Download required nltk data (only runs once)
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()                                      # Step 1: lowercase
    text = re.sub(r'http\S+|www\S+', '', text)                   # Step 2: remove URLs
    text = re.sub(r'\S+@\S+', '', text)                          # Step 3: remove emails
    text = re.sub(r'[\+\(]?[1-9][0-9\s\-\(\)]{8,}[0-9]', '', text)  # Step 4: phones
    text = re.sub(r'[^a-z\s]', ' ', text)                        # Step 5: special chars
    text = re.sub(r'\s+', ' ', text).strip()                     # Step 6: extra spaces
    tokens = text.split()
    tokens = [                                                    # Step 7: stopwords + lemmatize
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in stop_words and len(word) > 2
    ]
    return ' '.join(tokens)

# Apply cleaning to all resumes
print("🧹 Cleaning resumes... (this may take 1-2 minutes)")
df['Cleaned_Text'] = df['Text'].apply(clean_text)
print("✅ Cleaning done!")

# Compare before vs after (1 example)
print("\n--- BEFORE cleaning ---")
print(df['Text'].iloc[0][:300])

print("\n--- AFTER cleaning ---")
print(df['Cleaned_Text'].iloc[0][:300])

# Word count stats
df['word_count'] = df['Cleaned_Text'].apply(lambda x: len(x.split()))
print(f"\n📊 Average words per resume : {df['word_count'].mean():.0f}")
print(f"📊 Shortest resume          : {df['word_count'].min()} words")
print(f"📊 Longest resume           : {df['word_count'].max()} words")

# Save
df.to_csv('cleaned_dataset.csv', index=False)
print("\n💾 Saved as cleaned_dataset.csv!")