from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os

with open("api-key", "r") as f:
    API_KEY = f.read().strip()

client = OpenAI(api_key=API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str


@app.post("/translate")
async def translate_message(msg: Message):
    promt = f"Translate the following Korean sentence into English:\n\n{msg.message}"

    response = client.chat.competions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    translated = response.choices[0].message.content.strip()
    return {"message": translated}