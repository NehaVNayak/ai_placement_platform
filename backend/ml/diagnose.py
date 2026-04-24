# diagnose.py — run this to find why non-IT resumes predict wrong
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('stopwords', quiet=True)
nltk.download('wordnet',   quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[\+\(]?[1-9][0-9\s\-\(\)]{8,}[0-9]', '', text)
    text = re.sub(r'[^a-z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [
        lemmatizer.lemmatize(w)
        for w in text.split()
        if w not in stop_words and len(w) > 2
    ]
    return ' '.join(tokens)

model      = joblib.load('resume_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# ── Test resumes ───────────────────────────────────────────────
resumes = {
    "Civil Engineer": """
        site engineer construction concrete rcc reinforcement shuttering
        autocad staad pro surveying total station levelling bbmp road project
        subcontractor plumbing structural drawing BOQ bar bending schedule
        IS 456 IS 800 soil testing cement sand aggregate quality check
        supervised construction residential apartment foundation column beam slab
    """,

    "Mechanical Engineer": """
        cnc lathe milling machine production manufacturing automobile
        solidworks autocad quality inspection cmm vernier caliper micrometer
        fmea control plan iatf spc statistical process control
        5s kaizen lean manufacturing preventive maintenance breakdown
        press shop scrap rejection batch production fixtures tooling
    """,

    "Electrical Engineer": """
        substation transformer circuit breaker relay protection
        HT LT panel switchgear cable termination earthing
        SCADA PLC Allen Bradley Siemens motor control center MCC
        energy audit load calculation single line diagram AutoCAD electrical
        megger earth tester thermal imaging IS standards IE rules
    """,

    "ECE Engineer": """
        embedded systems arduino microcontroller PCB circuit design
        verilog VHDL VLSI CMOS digital electronics signal processing
        MATLAB simulink oscilloscope function generator breadboard soldering
        ESP8266 IoT sensor relay motor L293D DTMF FM transmitter
        8051 ARM cortex communication protocol UART SPI I2C
    """,
}

print("=" * 60)
print("  DIAGNOSIS REPORT")
print("=" * 60)

for label, raw_text in resumes.items():
    cleaned = clean_text(raw_text)
    words   = cleaned.split()
    vec     = vectorizer.transform([cleaned])
    proba   = model.predict_proba(vec)[0]

    # Top 5 predictions
    top5_idx  = proba.argsort()[-5:][::-1]
    top5      = [(model.classes_[i], round(proba[i]*100, 1)) for i in top5_idx]

    print(f"\n📄 {label}")
    print(f"   Word count after cleaning : {len(words)}")
    print(f"   Sample cleaned words      : {' '.join(words[:15])}")
    print(f"   Top 5 predictions:")
    for rank, (cat, pct) in enumerate(top5, 1):
        flag = " ✅" if cat == label else ""
        print(f"     {rank}. {cat:<30} {pct}%{flag}")

print("\n" + "=" * 60)
print("  VOCABULARY CHECK")
print("=" * 60)

# Check if domain-specific words are in vectorizer vocabulary
domain_words = {
    "Civil"      : ["autocad", "concrete", "rcc", "reinforcement", "structural", "surveying", "construction"],
    "Mechanical" : ["cnc", "lathe", "milling", "solidworks", "fmea", "kaizen", "manufacturing"],
    "Electrical" : ["substation", "transformer", "switchgear", "relay", "scada", "earthing", "plc"],
    "ECE"        : ["arduino", "microcontroller", "verilog", "vlsi", "embedded", "pcb", "matlab"],
}

vocab = vectorizer.vocabulary_

for domain, words in domain_words.items():
    found   = [w for w in words if w in vocab]
    missing = [w for w in words if w not in vocab]
    print(f"\n  {domain}:")
    print(f"    In vocabulary  : {found}")
    print(f"    NOT in vocab   : {missing}  ← these never influence predictions")