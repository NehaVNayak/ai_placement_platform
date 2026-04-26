import re

DOMAINS = {
    "Software / IT": {
        "detect": ["python","java","javascript","react","node","sql","docker","kubernetes","aws","api","backend","frontend","software","developer","engineer","devops","cloud","git","linux","machine learning","database","microservices","typescript"],
        "technical": ["python","java","javascript","typescript","react","angular","vue","node","sql","nosql","mongodb","postgresql","redis","docker","kubernetes","aws","azure","gcp","git","linux","machine learning","tensorflow","pytorch","api","rest","graphql","microservices","html","css","flask","django","fastapi","golang","spark","kafka","pandas","numpy"],
        "soft": ["led","collaborated","mentored","agile","scrum","cross-functional","stakeholder","problem-solving","communicated","presented"],
        "verbs": ["built","engineered","developed","architected","automated","deployed","optimized","migrated","integrated","launched","scaled","reduced","improved","delivered","designed","implemented","refactored","debugged","shipped","maintained"],
        "metric_hint": "e.g. Reduced latency by 40%, Scaled to 1M users",
    },
    "Finance / Accounting": {
        "detect": ["finance","accounting","financial","budget","audit","tax","investment","portfolio","revenue","equity","balance sheet","valuation","cpa","cfa","banking","treasury","compliance","gaap","ifrs","reconciliation","forecasting"],
        "technical": ["excel","sap","oracle","quickbooks","tableau","power bi","gaap","ifrs","dcf","npv","irr","financial modelling","variance analysis","cash flow","audit","tax filing","payroll","reconciliation","erp","budgeting","forecasting","risk management","compliance","sox","cpa","cfa","bloomberg"],
        "soft": ["analysed","communicated","collaborated","advised","presented","negotiated","strategic","detail-oriented","stakeholder","leadership"],
        "verbs": ["analysed","audited","forecasted","managed","reduced","increased","optimized","prepared","reported","reconciled","identified","developed","implemented","led","streamlined","saved","negotiated","evaluated","monitored","delivered"],
        "metric_hint": "e.g. Reduced costs by 500K, Managed 10M portfolio, Cut reporting time by 30%",
    },
    "Marketing / Advertising": {
        "detect": ["marketing","brand","campaign","seo","sem","social media","content","digital marketing","advertising","email marketing","growth","conversion","roi","ctr","impressions","analytics","copywriting","creative","audience","engagement"],
        "technical": ["google analytics","seo","sem","google ads","meta ads","hubspot","mailchimp","salesforce","hootsuite","canva","adobe creative suite","figma","crm","email marketing","content marketing","social media","copywriting","wordpress","shopify","ahrefs","semrush","power bi","tableau"],
        "soft": ["creative","collaborated","communicated","presented","led","strategic","analytical","cross-functional","stakeholder","innovative"],
        "verbs": ["launched","grew","increased","drove","created","developed","managed","optimized","designed","executed","generated","improved","built","delivered","led","transformed","spearheaded","scaled","analysed","produced"],
        "metric_hint": "e.g. Grew organic traffic by 80%, Achieved 3.5% CTR, Generated 500 leads/month",
    },
    "Healthcare / Medicine": {
        "detect": ["patient","clinical","hospital","nursing","physician","doctor","medical","diagnosis","treatment","pharmacy","surgeon","nurse","therapist","healthcare","icu","emr","ehr","mbbs","md","paramedic","radiology","pathology"],
        "technical": ["emr","ehr","epic","cerner","icd-10","clinical assessment","patient care","triage","bls","acls","medication administration","wound care","iv therapy","venipuncture","ecg","radiology","infection control","hipaa","medical terminology","phlebotomy","vital signs"],
        "soft": ["compassionate","communicated","collaborated","empathetic","detail-oriented","calm","teamwork","leadership"],
        "verbs": ["treated","assessed","monitored","administered","coordinated","implemented","educated","managed","reduced","improved","collaborated","documented","performed","assisted","led","developed","delivered","trained","diagnosed","advised"],
        "metric_hint": "e.g. Managed 30+ patients/day, Reduced readmission by 15%, Trained 10 junior nurses",
    },
    "Legal": {
        "detect": ["legal","law","attorney","lawyer","litigation","counsel","contract","compliance","judicial","advocate","llb","llm","barrister","solicitor","paralegal","intellectual property","corporate law","criminal law","arbitration","mediation"],
        "technical": ["contract drafting","legal research","litigation","due diligence","compliance","intellectual property","corporate law","arbitration","mediation","westlaw","lexisnexis","case management","legal writing","discovery","motion practice","regulatory","gdpr","employment law","data privacy"],
        "soft": ["analytical","communicated","negotiated","advised","presented","detail-oriented","strategic","collaborative","persuasive"],
        "verbs": ["drafted","negotiated","advised","represented","litigated","researched","analysed","managed","led","reviewed","prepared","filed","argued","settled","structured","coordinated","defended","secured","resolved","counselled"],
        "metric_hint": "e.g. Managed 50+ active cases, Secured 2M settlement, Reduced review time by 25%",
    },
    "Education / Teaching": {
        "detect": ["teaching","teacher","educator","curriculum","classroom","students","school","college","university","professor","lecturer","training","instruction","pedagogy","academic","tutor","coaching","learning outcomes"],
        "technical": ["curriculum design","lesson planning","lms","google classroom","canvas","moodle","assessment","differentiated instruction","classroom management","e-learning","instructional design","edtech","research methodology","bloom taxonomy","cbse","cambridge","special education","stem"],
        "soft": ["mentored","communicated","facilitated","motivated","collaborated","patient","empathetic","creative","leadership","organised"],
        "verbs": ["taught","developed","designed","mentored","facilitated","improved","created","led","implemented","assessed","coached","trained","guided","increased","delivered","coordinated","published","researched","evaluated","organised"],
        "metric_hint": "e.g. Improved pass rate by 20%, Taught 200+ students/semester, Reduced dropout by 10%",
    },
    "Human Resources": {
        "detect": ["hr","human resources","recruitment","talent","onboarding","payroll","employee relations","hris","performance management","workforce","compensation","benefits","labour law","talent acquisition"],
        "technical": ["hris","workday","successfactors","bamboohr","ats","recruitment","talent acquisition","onboarding","payroll","performance appraisal","employee engagement","labour law","grievance handling","succession planning","kpi","excel","power bi"],
        "soft": ["communicated","mediated","empathetic","negotiated","organised","collaborative","strategic","influential","leadership","advising"],
        "verbs": ["recruited","hired","managed","developed","implemented","improved","reduced","increased","designed","led","coordinated","resolved","trained","facilitated","advised","partnered","built","launched","administered","drove"],
        "metric_hint": "e.g. Reduced time-to-hire by 30%, Managed 500-employee payroll, Increased retention by 15%",
    },
    "Sales / Business Development": {
        "detect": ["sales","revenue","business development","account management","client","customer","pipeline","quota","crm","b2b","b2c","upsell","cross-sell","negotiation","closing","leads","territory","target","deal"],
        "technical": ["salesforce","hubspot","crm","b2b","b2c","pipeline management","lead generation","cold calling","account management","contract negotiation","market research","competitive analysis","forecasting","excel","tableau","power bi","zoominfo","sap"],
        "soft": ["negotiated","persuaded","communicated","strategic","goal-oriented","resilient","collaborative","presented"],
        "verbs": ["grew","exceeded","achieved","drove","generated","closed","negotiated","developed","managed","launched","expanded","increased","secured","built","led","identified","converted","retained","upsold","delivered"],
        "metric_hint": "e.g. Exceeded quota by 130%, Generated 1.2M ARR, Grew client base by 40%",
    },
    "Design / Creative": {
        "detect": ["design","ui","ux","graphic","brand","visual","creative","illustration","typography","figma","adobe","photoshop","illustrator","sketch","motion","video","photography","designer"],
        "technical": ["figma","adobe xd","sketch","photoshop","illustrator","indesign","after effects","premiere pro","blender","user research","wireframing","prototyping","usability testing","typography","brand identity","design systems","motion graphics","html","css","zeplin","invision","framer"],
        "soft": ["creative","collaborated","presented","communicated","empathetic","detail-oriented","innovative","strategic","stakeholder"],
        "verbs": ["designed","created","developed","built","delivered","led","improved","produced","launched","collaborated","conceptualised","illustrated","animated","prototyped","tested","refined","revamped","transformed","established","directed"],
        "metric_hint": "e.g. Improved task completion by 25%, Reduced drop-off by 18%, Designed for 500K users",
    },
    "Engineering (Non-IT)": {
        "detect": ["mechanical","civil","electrical","chemical","structural","manufacturing","construction","autocad","solidworks","production","plant","maintenance","quality control","process engineering","hvac","welding","fabrication","site engineer"],
        "technical": ["autocad","solidworks","catia","ansys","matlab","plc","scada","lean manufacturing","six sigma","iso 9001","quality control","project management","ms project","primavera","structural analysis","hvac","piping","bim","revit","hydraulics","cnc","fmea","root cause analysis","kaizen"],
        "soft": ["led","coordinated","collaborated","communicated","problem-solving","analytical","detail-oriented","safety-conscious","teamwork"],
        "verbs": ["designed","engineered","developed","managed","implemented","reduced","improved","led","optimized","built","coordinated","commissioned","tested","validated","delivered","installed","maintained","analysed","constructed","supervised"],
        "metric_hint": "e.g. Reduced downtime by 30%, Managed 5M project, Cut defect rate by 20%",
    },
    "Operations / Supply Chain": {
        "detect": ["operations","supply chain","logistics","procurement","inventory","warehouse","distribution","vendor","sourcing","demand planning","fulfillment","scm","erp","lean","six sigma","kpi"],
        "technical": ["erp","sap","oracle","supply chain management","procurement","inventory management","demand planning","lean","six sigma","kaizen","vendor management","logistics","warehouse management","sourcing","contract management","kpi","excel","power bi","tableau","ms project","forecasting"],
        "soft": ["analytical","problem-solving","collaborative","communicated","negotiated","organised","strategic","detail-oriented","leadership"],
        "verbs": ["managed","optimized","reduced","improved","implemented","negotiated","led","developed","streamlined","delivered","coordinated","sourced","analysed","forecasted","built","launched","automated","consolidated","monitored","saved"],
        "metric_hint": "e.g. Reduced inventory costs by 15%, Improved SLA to 98%, Saved 300K in procurement",
    },
    "General / Other": {
        "detect": [],
        "technical": ["microsoft office","excel","word","powerpoint","google workspace","data analysis","reporting","project management","research","planning","budgeting","coordination","documentation","presentation","stakeholder management"],
        "soft": ["communicated","collaborated","organised","led","managed","facilitated","presented","problem-solving","detail-oriented"],
        "verbs": ["managed","developed","improved","led","implemented","coordinated","delivered","created","increased","reduced","built","designed","launched","executed","achieved","trained","organised","analysed","streamlined","supported"],
        "metric_hint": "e.g. Managed team of 10, Reduced processing time by 25%, Coordinated 50+ events",
    },
}

QUANTIFIED_PATTERN = re.compile(
    r"\d[\d,\.]*\s*"
    r"(%|percent|x|times|users|customers|clients|patients|students|employees|"
    r"ms|seconds|hours|days|weeks|months|years|"
    r"k|m|cr|lakh|million|billion|"
    r"cases|projects|accounts|leads|deals|tickets|calls|orders|"
    r"units|items|beds|surgeries|hearings|filings|campaigns|"
    r"cgpa|gpa)"           # ← add this
    r"|\bcgpa\s*:?\s*\d[\d\.]*"   # ← catches "CGPA: 9.35" format
    r"|\b\d+\.?\d*\s*%",          # ← catches bare percentages like 73.4%
    re.IGNORECASE
)

SECTION_PATTERNS = {
    "education": re.compile(r"\b(education|degree|university|college|bachelor|master|phd|llb|mbbs)\b", re.IGNORECASE),
    "experience": re.compile(r"\b(experience|work|employment|internship|career|position|role|job|practice|clinical|teaching)\b", re.IGNORECASE),
    "skills": re.compile(r"\b(skills|technologies|tools|proficiencies|expertise|competencies|qualifications|technical)\b", re.IGNORECASE),
    "summary": re.compile(r"\b(summary|objective|profile|about|overview|introduction|statement)\b", re.IGNORECASE),
    "certifications": re.compile(r"\b(certifications?|certified|certificate|licence|license|credential)\b", re.IGNORECASE),
}

EMAIL_PATTERN    = re.compile(r"\b[\w.+-]+@[\w-]+\.[a-z]{2,}\b", re.IGNORECASE)
PHONE_PATTERN    = re.compile(r"[\+\(]?[1-9][0-9\s\-\(\)]{7,}[0-9]")
LINKEDIN_PATTERN = re.compile(r"linkedin\.com/in/[\w\-]+", re.IGNORECASE)
DATE_PATTERN     = re.compile(r"\b(19|20)\d{2}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*(19|20)?\d{2}\b|\b(present|current|till date|to date)\b", re.IGNORECASE)


from typing import Dict

def detect_domain(text):
    scores: Dict[str, int] = {
        n: sum(1 for kw in cfg["detect"] if kw in text)
        for n, cfg in DOMAINS.items()
        if n != "General / Other"
    }

    best = max(scores, key=lambda k: scores[k])

    if scores[best] == 0:
        return "General / Other", DOMAINS["General / Other"]

    return best, DOMAINS[best]


def score_resume(cleaned_resume, cleaned_jd=None):
    raw = cleaned_resume
    word_count = len(raw.split())
    domain_name, domain = detect_domain(raw)
    suggestions = []

    found_tech = [kw for kw in domain["technical"] if kw in raw]
    tech_score = min(100, int(len(found_tech) / max(len(domain["technical"]) * 0.4, 1) * 100))
    if len(found_tech) == 0:
        suggestions.append({"title": f"No {domain_name} skill keywords found", "detail": f"No recognisable {domain_name} skills detected. Add a Skills section. Examples: {', '.join(domain['technical'][:6])}."})
    elif len(found_tech) < 4:
        missing = [kw for kw in domain["technical"][:10] if kw not in found_tech]
        suggestions.append({"title": f"Thin skill set: {len(found_tech)} keyword(s) for {domain_name}", "detail": f"Detected: {', '.join(found_tech)}. Consider adding: {', '.join(missing[:5])}."})

    found_soft = [kw for kw in domain["soft"] if kw in raw]
    soft_score = min(100, int(len(found_soft) / 5 * 100))
    if len(found_soft) < 2:
        suggestions.append({"title": "Soft skills underrepresented", "detail": f"Only {len(found_soft)} soft-skill signal(s). For {domain_name}, show: {', '.join(domain['soft'][:5])}."})

    found_verbs = list(set([v for v in domain["verbs"] if re.search(r"\b" + re.escape(v) + r"\b", raw)]))
    verb_score = min(100, int(len(found_verbs) / 8 * 100))
    if len(found_verbs) == 0:
        suggestions.append({"title": "No strong action verbs found", "detail": f"Use power verbs for {domain_name}: {', '.join(domain['verbs'][:8])}."})
    elif len(found_verbs) < 4:
        suggestions.append({"title": f"Limited action verbs ({len(found_verbs)} found)", "detail": f"Detected: {', '.join(found_verbs)}. Add: {', '.join([v for v in domain['verbs'] if v not in found_verbs][:5])}."})

    if word_count < 200:
        length_score = 30
        suggestions.append({"title": "Resume is very short", "detail": f"{word_count} words. Aim for 400-700 words with detailed experience bullets."})
    elif word_count < 350:
        length_score = 65
        suggestions.append({"title": f"Resume could use more detail ({word_count} words)", "detail": "Below ideal length. Expand role descriptions with scope, tools, and outcomes."})
    elif word_count > 900:
        length_score = 65
        suggestions.append({"title": f"Resume may be too long ({word_count} words)", "detail": "Trim to 1-2 pages. Remove outdated roles and filler bullets."})
    else:
        length_score = 100

    ats_score = 100
    quant_matches = QUANTIFIED_PATTERN.findall(raw)
    if len(quant_matches) == 0:
        ats_score -= 25
        suggestions.append({"title": "No measurable achievements found", "detail": f"Add metrics: {domain['metric_hint']}."})
    elif len(quant_matches) < 3:
        ats_score -= 10
        suggestions.append({"title": f"Only {len(quant_matches)} metric(s) found", "detail": f"Each role needs 2-3 outcomes with numbers. {domain['metric_hint']}."})

    missing_secs = [n for n, p in SECTION_PATTERNS.items() if not p.search(raw)]
    critical = [s for s in ["experience","skills","education"] if s in missing_secs]
    if critical:
        ats_score -= 15 * len(critical)
        suggestions.append({"title": f"Missing sections: {', '.join(s.title() for s in critical)}", "detail": f"ATS needs labelled headings for: {', '.join(critical)}."})
    elif "summary" in missing_secs:
        suggestions.append({"title": "No professional summary detected", "detail": "Add a 2-3 line summary at the top for better ATS classification."})

    missing_contact = []
    if not (EMAIL_PATTERN.search(cleaned_resume) or "email" in raw): missing_contact.append("email")
    if not (PHONE_PATTERN.search(cleaned_resume) or "phone" in raw): missing_contact.append("phone")
    if not (LINKEDIN_PATTERN.search(cleaned_resume) or "linkedin" in raw): missing_contact.append("LinkedIn")
    if missing_contact:
        ats_score -= 5 * len(missing_contact)
        suggestions.append({"title": f"Contact info incomplete: {', '.join(missing_contact)}", "detail": "Ensure email, phone, and LinkedIn are visible in your header."})

    if len(DATE_PATTERN.findall(raw)) < 2:
        ats_score -= 10
        suggestions.append({"title": "Dates unclear or missing", "detail": "Add date ranges to every role (e.g. Jun 2021 - Mar 2024 or Present)."})

    ats_score = max(0, min(100, ats_score))

    jd_match = None
    if cleaned_jd:
        jd_words, res_words = set(cleaned_jd.split()), set(raw.split())
        jd_match = min(100, int(len(jd_words & res_words) / max(len(jd_words), 1) * 150))
        all_kws = set(domain["technical"] + domain["soft"] + domain["verbs"])
        missing_jd = [w for w in jd_words if w not in res_words and len(w) > 4 and w in all_kws][:6]
        if missing_jd:
            suggestions.append({"title": f"JD gaps: {len(missing_jd)} keyword(s) missing", "detail": f"JD mentions: {', '.join(missing_jd)}. Mirror these where truthful."})

    if jd_match is not None:
        overall = int(tech_score*0.25 + soft_score*0.10 + verb_score*0.15 + length_score*0.10 + ats_score*0.25 + jd_match*0.15)
    else:
        overall = int(tech_score*0.30 + soft_score*0.10 + verb_score*0.15 + length_score*0.15 + ats_score*0.30)

    if not suggestions:
        suggestions.append({"title": "Resume looks strong!", "detail": f"Domain: {domain_name}. Found {len(found_tech)} skills, {len(found_verbs)} verbs, {len(quant_matches)} metrics."})

    return {"technical": tech_score, "soft": soft_score, "action_verbs": verb_score,
            "length": length_score, "ats": ats_score, "overall": overall, "domain": domain_name}, suggestions