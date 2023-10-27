import { fetchData, addData, deleteData } from '@/api/api'
import { Pipeline } from '../types/supabase-derived';


export const fetchPipelines = async (): Promise<Pipeline["Row"][] | null> => {
    try{
        const data = await fetchData('pipeline')
        return data
    
    } catch (error: any) {
        throw new Error(`Error fetching pipelines: ${error.message} \n Maybe the backend is not running?`)
    }
};
  
export async function createPipeline(newPipeline: { name: string; prompt: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_PATH}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPipeline),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  
export const deletePipeline = async (id: string) => {
    return deleteData('pipeline', id)
};