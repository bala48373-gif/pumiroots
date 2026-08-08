from fastapi import FastAPI
from app.routers import product

app = FastAPI(title="Pumiroots API")

app.include_router(product.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Pumiroots API"}