import pandas as pd
import json

data = []

# Read JSONL file
with open("resumes_dataset.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        data.append(json.loads(line))

# Convert to DataFrame
df = pd.DataFrame(data)

# Save as CSV
df.to_csv("resumes_dataset.csv", index=False)

print("✅ Converted to CSV successfully!")