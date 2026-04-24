import pandas as pd

# Load the dataset
df = pd.read_csv('resumes_dataset.csv')

# 1. How big is it?
print("Shape:", df.shape)
# → (2484, 3)  means 2484 resumes, 3 columns

# 2. What columns exist?
print("\nColumns:", df.columns.tolist())

# 3. See first 3 rows
print("\nFirst 3 rows:")
print(df.head(3))

# 4. What job categories are in the data?
print("\nJob Categories:")
print(df['Category'].value_counts())
# ```

# **You should see output like this:**
# ```
# Shape: (2484, 3)

# Columns: ['ID', 'Resume_str', 'Category']

# Job Categories:
# Java Developer        84
# Testing               70
# Data Science          62
# ...
# ```

# ---

# ### 🧠 What This Data Means

# | Column | What it contains |
# |--------|-----------------|
# | `ID` | Just a number, ignore this |
# | `Resume_str` | The full resume text — **this is your input** |
# | `Category` | The job role label — **this is what you'll predict** |

# So your model will learn: *"Given this resume text → what job is this person applying for?"* And from that, you build scoring logic on top.

# ---

# ### 📌 What Comes in Step 2 (Next Session)

# Once Step 1 is done, Step 2 will be:
# ```
# → Look at one real resume from the dataset
# → See how messy raw text looks
# → Understand WHY we need to clean it
# → Write your very first cleaning function