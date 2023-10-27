from typing import Optional
from pydantic import BaseModel, Field

class RunLlavaDto(BaseModel):
    prompt: str = Field(..., description="The prompt text", example="What is the primary color in this image?")
    temperature: Optional[float] = Field(None, description="The temperature parameter", example=0.1)
    top_P: Optional[float] = Field(None, description="The top-P parameter (management of randomness)", example=0.9)
    max_output_tokens: Optional[int] = Field(None, description="The maximum number of output tokens", example=1024)

class CreatePipeline(BaseModel):
    name: str = Field(..., description="The name of the pipeline", example="my first pipeline", min_length=1)
    prompt: str = Field(..., description="The prompt text", example="What is the primary color in this image?", min_length=1)
    temperature: Optional[float] = Field(None, description="The temperature parameter", example=0.1)
    top_P: Optional[float] = Field(None, description="The top-P parameter (management of randomness)", example=0.9)
    max_output_tokens: Optional[int] = Field(None, description="The maximum number of output tokens", example=1024)

    # class Config:
    #     schema_extra = {
    #         "example": {
    #             "name": "my-first-pipeline",
    #             "prompt": "What is the primary color in this image?",
    #         }
    #     }