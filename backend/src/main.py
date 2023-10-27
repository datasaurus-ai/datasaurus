import src.util.env   # noqa: F401
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from src.routers.llava import router as llava_router
from src.routers.pipeline import router as pipeline_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def docs_redirect():
    return RedirectResponse(url='/docs')

app.include_router(llava_router)
app.include_router(pipeline_router)