import pandas as pd

df = pd.read_csv('cleaned_dataset.csv')

# How many empty resumes?
empty = df[df['word_count'] == 0]
print("Empty resumes:", len(empty))
print("\nWhich categories have empty resumes?")
print(empty['Category'].value_counts())

# Also check very short resumes (less than 20 words)
too_short = df[df['word_count'] < 20]
print(f"\nResumes with less than 20 words: {len(too_short)}")