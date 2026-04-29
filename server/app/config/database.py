from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["ai_placement_db"]

students_collection = db["students"]
faculty_collection = db["faculty"]
questions_collection = db["technical_questions"]
attempts_collection = db["student_attempts"]
programming_questions_collection = db["programming_questions"]
programming_attempts_collection = db["programming_attempts"]
coding_questions = db["coding_questions"]
coding_submissions = db["coding_submissions"]
aptitude_questions = db["aptitude_questions"]
<<<<<<< HEAD
aptitude_attempts = db["aptitude_attempts"]

chat_collection = db["chat_history"]
notifications_collection = db["notifications"]
=======
aptitude_attempts = db["aptitude_attempts"]
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
