import pandas as pd

# ── Load all 3 datasets ──────────────────────────────────
df1 = pd.read_csv('resumes_dataset.csv')       # 3500 rows, 12 cols
df2 = pd.read_csv('UpdatedResumeDataSet.csv')  # 962 rows,  2 cols
df3 = pd.read_csv('linkedin.csv')              # 1251 rows, 11 cols

# ── Standardize to 2 columns: Category + Text ───────────

# Dataset 1: use 'Text' column as resume text
df1_clean = pd.DataFrame({
    'Category': df1['Category'],
    'Text':     df1['Text']
})

# Dataset 2: use 'Resume' column as resume text
df2_clean = pd.DataFrame({
    'Category': df2['Category'],
    'Text':     df2['Resume']
})

# Dataset 3: combine description + skills + experience as text
df3['Text'] = (
    df3['description'].fillna('') + ' ' +
    df3['skills'].fillna('')      + ' ' +
    df3['Experience'].fillna('')
)
df3_clean = pd.DataFrame({
    'Category': df3['category'],
    'Text':     df3['Text']
})

# ── Merge all into one ───────────────────────────────────
df_final = pd.concat([df1_clean, df2_clean, df3_clean], ignore_index=True)

# ── Quick check ──────────────────────────────────────────
print("✅ Total resumes:", len(df_final))
print("✅ Columns:", df_final.columns.tolist())
print("✅ Missing values:\n", df_final.isnull().sum())
print("\n📋 All Categories:")
print(df_final['Category'].value_counts().to_string())

# ── Save it ──────────────────────────────────────────────
df_final.to_csv('master_dataset.csv', index=False)
print("\n💾 Saved as master_dataset.csv!")