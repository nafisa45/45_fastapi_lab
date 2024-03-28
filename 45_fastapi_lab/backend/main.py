from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to match your React frontend URL
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
collection = db["users"]


class User(BaseModel):
    username: str
    password: str
    email: str
    phone_number: str


@app.post("/register/")
async def register_user(user: User):
    # Perform frontend validation for minimum character constraints
    if len(user.username) <= 5:
        raise HTTPException(status_code=400, detail="Username must have more than five characters.")
    if len(user.password) <= 6:
        raise HTTPException(status_code=400, detail="Password must have more than six characters.")
    if len(user.phone_number) != 11:
        raise HTTPException(status_code=400, detail="Phone number must have exactly 11 digits.")

    # Check if username, email, and phone number are unique
    existing_user = collection.find_one({"$or": [{"username": user.username}, {"email": user.email}, {"phone_number": user.phone_number}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username, email, or phone number already exists.")

    # Save user data to MongoDB
    user_dict = user.dict()
    collection.insert_one(user_dict)

    return {"message": "User registered successfully"}

