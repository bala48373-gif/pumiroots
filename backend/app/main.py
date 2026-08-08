from fastapi import FastAPI
from app.routers import product, category

app = FastAPI(title="Pumiroots API")

app.include_router(product.router)
app.include_router(category.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Pumiroots API"}