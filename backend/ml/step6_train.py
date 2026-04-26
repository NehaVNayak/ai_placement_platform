import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# ── 1. Load data ─────────────────────────────────────────
df = pd.read_csv('final_dataset.csv')
print(f"✅ Loaded {len(df)} resumes, {df['Category'].nunique()} categories")

# ── 2. Separate text and labels ──────────────────────────
X = df['Cleaned_Text']   # input  → resume text
y = df['Category']       # output → job category

print(f"✅ X (resumes) : {X.shape}")
print(f"✅ y (labels)  : {y.shape}")

# ── 3. Split into train and test ─────────────────────────
# 80% for training, 20% for testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% = ~1064 resumes held back for testing
    random_state=42,     # fixed seed = same split every time
    stratify=y           # keep category proportions balanced
)

print(f"\n✅ Training set : {len(X_train)} resumes")
print(f"✅ Testing set  : {len(X_test)} resumes")

# ── 4. Convert text → numbers using TF-IDF ───────────────
print("\n⏳ Converting text to numbers...")
vectorizer = TfidfVectorizer(
    max_features=5000,   # top 5000 most important words
    ngram_range=(1, 2),  # single words AND pairs ("machine learning")
    sublinear_tf=True    # smooth the numbers
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)

print(f"✅ Each resume is now {X_train_tfidf.shape[1]} numbers!")
# → Each resume = row of 5000 numbers

# ── 5. Train the model ───────────────────────────────────
print("\n⏳ Training model... (may take 1-2 minutes)")
model = LogisticRegression(
    max_iter=1000,
    random_state=42
)
model.fit(X_train_tfidf, y_train)
print("✅ Training done!")

# ── 6. Test the model ────────────────────────────────────
print("\n⏳ Testing model on unseen resumes...")
y_pred = model.predict(X_test_tfidf)

accuracy = accuracy_score(y_test, y_pred)
print(f"\n🎯 Accuracy : {accuracy * 100:.2f}%")

# ── 7. Save model + vectorizer ───────────────────────────
joblib.dump(model,     'models/resume_model.pkl')
joblib.dump(vectorizer,'models/vectorizer.pkl')
print("\n💾 Saved resume_model.pkl")
print("💾 Saved vectorizer.pkl")
print("\n🎉 Your first ML model is trained and saved!")
# ```

# ---

# ### 🧠 What's happening in plain English:
# ```
# Step 1 → Load all 5320 clean resumes
# Step 2 → X = resume text (input), y = job title (answer)
# Step 3 → Split: 4256 to LEARN from, 1064 to TEST on
# Step 4 → Convert all text → numbers (TF-IDF)
# Step 5 → Model studies 4256 resumes + their labels
# Step 6 → Test on 1064 resumes it has NEVER seen
# Step 7 → Save model so we can use it later
# ```

# ### 🎯 What is "Accuracy"?
# ```
# Accuracy = 85%  means:
# Out of 1064 test resumes → model correctly
# predicted the job category for 904 of them ✅