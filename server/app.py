from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from translator import translate

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/translate")
async def somethingelse(text: str = "",from_language: str = 'auto', to_language: str = 'English'):
    result = translate(text, from_language, to_language)
    return {"result": result}
