# resume_cli.py
# ─────────────────────────────────────────────────────────────
#  AI Resume Evaluator — CLI Tool  (Step 9)
#  Usage:
#    python resume_cli.py my_resume.pdf
#    python resume_cli.py my_resume.txt --jd job_description.txt
# ─────────────────────────────────────────────────────────────

import argparse
import joblib
import re
import sys
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

import pdfplumber
from step8_scorer import score_resume

# ── NLTK setup ────────────────────────────────────────────────
nltk.download('stopwords', quiet=True)
nltk.download('wordnet',   quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))


# ── Text Cleaning (must match training pipeline exactly) ──────

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+', '', text)          # remove URLs
    text = re.sub(r'\S+@\S+', '', text)                  # remove emails
    text = re.sub(r'[\+\(]?[1-9][0-9\s\-\(\)]{8,}[0-9]', '', text)  # phones
    text = re.sub(r'[^a-z\s]', ' ', text)               # keep only letters
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [
        lemmatizer.lemmatize(w)
        for w in text.split()
        if w not in stop_words and len(w) > 2
    ]
    return ' '.join(tokens)


# ── File Extraction ───────────────────────────────────────────

def extract_text(filepath):
    if filepath.endswith('.pdf'):
        try:
            with pdfplumber.open(filepath) as pdf:
                text = '\n'.join(
                    page.extract_text() or '' for page in pdf.pages
                )
            if not text.strip():
                print("⚠️  PDF appears to be scanned/image-based — text extraction may be incomplete.")
            return text
        except Exception as e:
            print(f"❌ Could not read PDF: {e}")
            sys.exit(1)

    elif filepath.endswith('.txt'):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"❌ Could not read file: {e}")
            sys.exit(1)

    else:
        print("❌ Unsupported file type. Please use a .pdf or .txt file.")
        sys.exit(1)


# ── Report Printer ────────────────────────────────────────────

def print_report(category, confidence, scores, suggestions, word_count, jd_provided):
    def bar(score):
        filled = score // 10
        return ('█' * filled).ljust(10) + f"  {score}/100"

    def grade(overall):
        if overall >= 85: return "🟢 Excellent!"
        if overall >= 70: return "🟢 Very Good"
        if overall >= 55: return "🟡 Good — room to improve"
        if overall >= 40: return "🟠 Needs work"
        return "🔴 Major improvements needed"

    # Confidence label
    if confidence >= 70:
        conf_label = "🟢 High"
    elif confidence >= 45:
        conf_label = "🟡 Medium"
    else:
        conf_label = "🔴 Low — resume may be generalist or mixed-domain"

    print()
    print("=" * 58)
    print("          📄  AI RESUME EVALUATION REPORT")
    print("=" * 58)
    print(f"  Predicted Role   : {category}")
    print(f"  Confidence       : {confidence:.1f}%  {conf_label}")
    print(f"  Word Count       : {word_count} words")
    print(f"  JD Provided      : {'✅ Yes (ATS scored against JD)' if jd_provided else '❌ No (using keyword richness)'}")
    print("-" * 58)
    print("  SCORES:")
    print(f"  Technical Skills : {bar(scores['technical'])}")
    print(f"  Soft Skills      : {bar(scores['soft'])}")
    print(f"  Action Verbs     : {bar(scores['action_verbs'])}")
    print(f"  Resume Length    : {bar(scores['length'])}")
    print(f"  ATS / Keywords   : {bar(scores['ats'])}")
    print("-" * 58)
    print(f"  OVERALL SCORE    : {scores['overall']}/100  {grade(scores['overall'])}")
    print("-" * 58)
    print("  💡 SUGGESTIONS:")
    for i, s in enumerate(suggestions, 1):
        print(f"  {i}. {s}")
    print("=" * 58)
    print()


# ── Main ──────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='🤖 AI Resume Evaluator — instant feedback on your resume!',
        epilog='Example: python resume_cli.py my_resume.pdf --jd job.txt'
    )
    parser.add_argument(
        'resume',
        help='Path to your resume (.pdf or .txt)'
    )
    parser.add_argument(
        '--jd',
        help='Optional: path to a job description (.txt) for ATS scoring',
        default=None
    )
    args = parser.parse_args()

    # ── Load model ────────────────────────────────────────────
    print("\n⏳ Loading AI model...")
    try:
        model      = joblib.load('resume_model.pkl')
        vectorizer = joblib.load('vectorizer.pkl')
        print("✅ Model loaded!")
    except FileNotFoundError as e:
        print(f"❌ Model file not found: {e}")
        print("   Make sure resume_model.pkl and vectorizer.pkl are in the same folder.")
        sys.exit(1)

    # ── Extract + clean resume ────────────────────────────────
    print("⏳ Reading your resume...")
    raw_text   = extract_text(args.resume)
    cleaned    = clean_text(raw_text)
    word_count = len(cleaned.split())

    if word_count < 20:
        print("❌ Resume too short or text could not be extracted properly.")
        print("   If using a PDF, make sure it is not a scanned image.")
        sys.exit(1)

    print(f"✅ Resume read! ({word_count} words extracted)")

    # ── Load job description ──────────────────────────────────
    jd_text = None
    if args.jd:
        try:
            with open(args.jd, 'r', encoding='utf-8') as f:
                jd_text = clean_text(f.read())
            print("✅ Job description loaded!")
        except FileNotFoundError:
            print(f"⚠️  Job description file not found: {args.jd} — skipping JD scoring.")

    # ── Predict role + confidence ─────────────────────────────
    vec        = vectorizer.transform([cleaned])
    category   = model.predict(vec)[0]
    proba      = model.predict_proba(vec)[0]
    confidence = max(proba) * 100

    # ── Score resume ──────────────────────────────────────────
    scores, suggestions = score_resume(cleaned, jd_text)

    # ── Print report ──────────────────────────────────────────
    print_report(
        category, confidence, scores, suggestions,
        word_count, jd_provided=jd_text is not None
    )


if __name__ == '__main__':
    main()