import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
import joblib

# Load data + model
df    = pd.read_csv('final_dataset.csv')
model = joblib.load('resume_model.pkl')
vec   = joblib.load('vectorizer.pkl')

X = df['Cleaned_Text']
y = df['Category']

# Same split as before (random_state=42 gives identical split)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

X_test_tfidf = vec.transform(X_test)
y_pred       = model.predict(X_test_tfidf)

# Full report — shows accuracy per category
report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
df_report = pd.DataFrame(report).transpose()

# Show TOP 5 best categories
print("🏆 TOP 5 — Categories model predicts BEST:")
top5 = df_report[:-3].sort_values('f1-score', ascending=False).head(5)
print(top5[['precision', 'recall', 'f1-score', 'support']].to_string())

# Show BOTTOM 5 worst categories
print("\n⚠️  BOTTOM 5 — Categories model struggles with:")
bot5 = df_report[:-3].sort_values('f1-score', ascending=True).head(5)
print(bot5[['precision', 'recall', 'f1-score', 'support']].to_string())

# Show 3 real examples of predictions
print("\n🔍 3 Real Prediction Examples:")
print("-" * 55)
X_test_list = X_test.reset_index(drop=True)
y_test_list = y_test.reset_index(drop=True)

for i in range(3):
    actual    = y_test_list[i]
    predicted = y_pred[i]
    snippet   = X_test_list[i][:60]
    status    = "✅" if actual == predicted else "❌"
    print(f"Resume   : {snippet}...")
    print(f"Actual   : {actual}")
    print(f"Predicted: {predicted}  {status}")
    print("-" * 55)