from io import BufferedReader, BytesIO
from src.dto.dto import RunLlavaDto
from fastapi import APIRouter
from fastapi import File, Form, UploadFile, Depends
from typing import Optional
import asyncio
import replicate
from fastapi.responses import StreamingResponse

router = APIRouter()

# Not available yet
def get_gglm_command(file: UploadFile, data: RunLlavaDto) -> str:
    path_to_llava = '~/Git/llama.cpp/llava'
    model_path = '~/Git/llama.cpp/models/llava/ggml-model-q4_k.gguf'
    mmproj_path = '~/Git/llama.cpp/models/llava/mmproj-model-f16.gguf'

    command = (
        f"{path_to_llava} -m {model_path} --mmproj {mmproj_path} "
        f"--image {data.imagePath} --temp {data.temperature} -p {data.prompt} "
        f"--top-p {data.top_P} -n {data.max_output_tokens}"
    )

    return command

# Not available yet
async def run_gglm(file: UploadFile, data: RunLlavaDto) -> str:

    # Run the shell command
    process = await asyncio.create_subprocess_shell(
        get_gglm_command(file, data), stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )

    # Capture the output
    stdout, stderr = await process.communicate()

    if process.returncode != 0:
        raise RuntimeError(f"Command failed with error: {stderr.decode()}")

    return stdout.decode()

async def run_replicate(
    file: UploadFile,
    prompt: str,
    temperature: Optional[float] = None,
    max_output_tokens: Optional[int] = None,
):
    
    # convert file to buffered_reader
    content = await file.read()
    bytes_io = BytesIO(content)
    buffered_reader = BufferedReader(bytes_io)

    data = {
        "image": buffered_reader,
        "prompt": prompt,
        "max_tokens": max_output_tokens,
        "temperature": temperature,
    }

    # Use dictionary comprehension to omit pairs where the value is None
    filtered_data = {k: v for k, v in data.items() if v is not None}

    return replicate.run(
        "yorickvp/llava-13b:2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591",
        input=filtered_data
    )

async def get_form_data(prompt: str = Form(...), temperature: Optional[float] = Form(None), top_P: Optional[float] = Form(None), max_output_tokens: Optional[int] = Form(None)) -> RunLlavaDto:
    return RunLlavaDto(
        prompt=prompt,
        temperature=temperature,
        top_P=top_P,
        max_output_tokens=max_output_tokens,
    )

@router.post("/test-pipeline")
async def run_llava_endpoint(
    image: UploadFile = File(...),
    form_data: RunLlavaDto = Depends(get_form_data),
):
    return StreamingResponse(await run_replicate(image, form_data.prompt, form_data.temperature, form_data.max_output_tokens), media_type="text/plain")

