from fastapi import FastAPI

app = FastAPI(title="Pumiroots API")

@app.get("/")
def read_root():
    return {"message": "Welcome to Pumiroots API"}