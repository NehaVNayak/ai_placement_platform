import pandas as pd

df = pd.read_csv('cleaned_dataset.csv')

# See what these short resumes actually look like
too_short = df[df['word_count'] < 20]

print("Sample of short resumes:\n")
for i, row in too_short.head(5).iterrows():
    print(f"Category : {row['Category']}")
    print(f"Words    : {row['word_count']}")
    print(f"Text     : {row['Cleaned_Text']}")
    print("-" * 50)