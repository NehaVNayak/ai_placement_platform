from google import genai
import json

client = genai.Client(api_key="AIzaSyBXkFkmAnft_BF3QuZUyF4C5QMINzTHAcA")

def generate_question(subject, difficulty):

    prompt = f"""
    Generate ONE technical MCQ question.

    Subject: {subject}
    Difficulty: {difficulty}

    Return ONLY valid JSON. No markdown.
    {{
      "question": "",
      "options": ["","","",""],
      "answer": "",
      "explanation": ""
    }}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",   # ✅ FIXED
            contents=prompt
        )

        content = response.text.strip()
        content = content.replace("```json", "").replace("```", "").strip()

        return json.loads(content)

    except Exception as e:
        print("Gemini Error:", e)
        return None