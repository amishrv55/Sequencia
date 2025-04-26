from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import api_router
from app.api.v1.endpoints import ticker as ticker_router
from app.api.v1.endpoints import leaderboard
from app.api.v1.endpoints import question
from app.api.v1.endpoints.article import router as article_router

app = FastAPI()

# 👇 CORS fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Routers
app.include_router(api_router, prefix="/api/v1")
app.include_router(ticker_router.router, prefix="/api/v1/tickers", tags=["Tickers"])

app.include_router(leaderboard.router, prefix="/api/v1/leaderboard", tags=["Leaderboard"])
app.include_router(question.router, prefix="/api/v1/questions", tags=["Questions"])
app.include_router(article_router, prefix="/api/v1/articles", tags=["Articles"])


