# save as check_categories.py and run it
import joblib

model = joblib.load('resume_model.pkl')
print("Categories your model knows:")
for i, cat in enumerate(model.classes_, 1):
    print(f"  {i}. {cat}")
print(f"\nTotal: {len(model.classes_)} categories")