import pandas as pd

df = pd.read_csv('cleaned_dataset.csv')
print(f"Before removal : {len(df)} resumes")

# Remove empty and too-short resumes
df = df[df['word_count'] >= 20]
df = df.reset_index(drop=True)

print(f"After removal  : {len(df)} resumes")
print(f"Removed        : {5713 - len(df)} resumes")

# Final check - no zeros
print(f"\nShortest resume now : {df['word_count'].min()} words")
print(f"Longest resume now  : {df['word_count'].max()} words")
print(f"Average words       : {df['word_count'].mean():.0f} words")

# Check all categories still have enough data
print("\n📋 Final category counts:")
counts = df['Category'].value_counts()
print(counts.to_string())

# Flag categories with less than 20 resumes (too few to train on)
low_data = counts[counts < 20]
if len(low_data) > 0:
    print(f"\n⚠️  Categories with less than 20 resumes:")
    print(low_data.to_string())
else:
    print("\n✅ All categories have enough data!")

# Save final clean dataset
df.to_csv('final_dataset.csv', index=False)
print("\n💾 Saved as final_dataset.csv — Data is ready for training!")

# ── NEW LINES ADDED BELOW ─────────────────────────────────
# Remove categories with less than 20 resumes
df = df[df['Category'] != 'Automobile']
df = df.reset_index(drop=True)

print(f"\nAfter removing Automobile : {len(df)} resumes")
print(f"Total categories now      : {df['Category'].nunique()}")

# Overwrite the final dataset
df.to_csv('final_dataset.csv', index=False)
print("💾 final_dataset.csv updated!")