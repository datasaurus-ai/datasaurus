from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse
from src.routers.llava import run_replicate
from src.dto.dto import CreatePipeline
import re
from src.util.supabase import supabase_admin as supabase

router = APIRouter()

@router.post("/pipeline/{endpoint}")
async def run_pipeline(endpoint: str, image: UploadFile = File(...)):

    # get prompt from supabase
    data = supabase.table("pipeline").select("prompt").eq("endpoint", endpoint).execute()

    assert len(data.data) > 0

    prompt = data.data[0]["prompt"]

    return StreamingResponse(await run_replicate(image, prompt), media_type="text/plain")

    

@router.post("/pipeline")
async def create_pipeline(data: CreatePipeline):
    normalized_name = normalize_string(data.name)

    data = supabase.table("pipeline").insert({
        "name": data.name,
        "endpoint":normalized_name, 
        "prompt":data.prompt,
        }
        ).execute()
    
    assert len(data.data) > 0

    return data.data[0]




def normalize_string(input_string: str) -> str:
    input_string = input_string.lower()
    cleaned_string = re.sub(r'[^a-z\s-]', '', input_string)
    cleaned_string = re.sub(r'\s+', '-', cleaned_string)
    cleaned_string = re.sub(r'-+', '-', cleaned_string)
    cleaned_string = cleaned_string.strip('-')

    return cleaned_string

