from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import product, category, order

app = FastAPI(title="Pumiroots API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://pumiroots.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(product.router)
app.include_router(category.router)
app.include_router(order.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Pumiroots API"}