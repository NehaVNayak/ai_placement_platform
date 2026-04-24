import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

df  = pd.read_csv('final_dataset.csv')

# ── Option A: Remove categories with under 40 resumes ────
counts     = df['Category'].value_counts()
keep_cats  = counts[counts >= 40].index
df_reduced = df[df['Category'].isin(keep_cats)]

print(f"Option A — Reduced dataset:")
print(f"  Categories : {df_reduced['Category'].nunique()}")
print(f"  Resumes    : {len(df_reduced)}")

# ── Option B: Keep everything ─────────────────────────────
print(f"\nOption B — Full dataset:")
print(f"  Categories : {df['Category'].nunique()}")
print(f"  Resumes    : {len(df)}")

# ── Train & test BOTH and compare accuracy ────────────────
def train_and_score(dataframe, label):
    X = dataframe['Cleaned_Text']
    y = dataframe['Category']
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    vec   = TfidfVectorizer(max_features=5000, ngram_range=(1,2), sublinear_tf=True)
    X_tr  = vec.fit_transform(X_train)
    X_te  = vec.transform(X_test)
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_tr, y_train)
    acc = accuracy_score(y_test, model.predict(X_te))
    print(f"\n🎯 {label} accuracy: {acc*100:.2f}%")
    return acc, model, vec

acc_a, model_a, vec_a = train_and_score(df_reduced, "Option A (reduced)")
acc_b, model_b, vec_b = train_and_score(df,         "Option B (full)   ")

print(f"\n📊 Difference: {(acc_a - acc_b)*100:.2f}% better with Option A")
print("\nWhich do you want to keep? (A or B)")