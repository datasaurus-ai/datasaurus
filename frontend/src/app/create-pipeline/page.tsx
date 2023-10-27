/* eslint-disable @next/next/no-img-element */
"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ChangeEvent, useEffect , useState} from "react"
import { Loader2 } from "lucide-react"
import { createPipeline } from "@/api/pipeline";
import { useRouter } from 'next/navigation'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
 
const FormSchema = z.object({
  pipelineName: z.string().min(1, {
    message: "Pipeline name cannot be empty.",
  }),
  prompt: z.string().min(2, {
    message: "Prompt cannot be empty.",
  }),
  image: z.any()
    .refine((data: any) => ACCEPTED_IMAGE_TYPES.includes(data?.type), ".jpg, .jpeg, .png, and .webp files are accepted.")
    .refine((data: any) => data?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .optional()
});

  

 
export default function CreatePipeline() {

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pipelineName: '',
      prompt: '',
    },
  })

  const queryClient = useQueryClient();

  const createPipelineMutation = useMutation({
    mutationFn: createPipeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] });
    },
  });


  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    


    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      form.setValue('image', file)
    } else {
      setImagePreview(null); 
      form.setValue('image', undefined)

    }
  };

  async function onTest(data: z.infer<typeof FormSchema>) {
    console.log(data)
    setLoading(true);

    if (!data.image) {
      setErrorMessage("To test your pipeline, you need to upload a test image");
      setResponseMessage(null);
      setLoading(false);
      return;
    }

    try {
      const body = new FormData();
      body.append('prompt', data.prompt);
      body.append('image', data.image);
  

      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_PATH}/test-pipeline`, {
        method: 'POST',
        body: body, // Send formData as body
        });

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
        console.log(await response.json())
        throw new Error('Network response was not ok');
      }

      const reader = response.body!.getReader();
      let chunks = []; // Array to hold the chunks of data
      let receivedLength = 0; // Length of the chunks received

      while(true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
      }

      // Concatenate chunks into single Uint8Array
      let dataArray = new Uint8Array(receivedLength);
      let position = 0;
      for(let chunk of chunks) {
        dataArray.set(chunk, position);
        position += chunk.length;
      }


      let dataText = new TextDecoder("utf-8").decode(dataArray);


      setResponseMessage(dataText); 
      setErrorMessage(null); // clear any previous error message
    } catch (error: any) {

      console.log(error)
      // Display error message in the UI
      setErrorMessage(error.message);
      setResponseMessage(null); // clear any previous response message
    }

    setLoading(false);

  }
 
  async function onCreate(data: z.infer<typeof FormSchema>) {

    
    try {
      setLoading(true);

      // Extract relevant data for the new pipeline
      const newPipeline = {
        name: data.pipelineName,
        prompt: data.prompt,
      };

      // Using the mutation to create a new pipeline
      const response = await createPipelineMutation.mutateAsync(newPipeline);

      

      form.reset(); // Reset form fields after successful submission
      setImagePreview(null); // Clear image preview

      router.push(`/pipeline-detail/${response.endpoint}`)
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Error creating pipeline:',
        description: error.message,
      })

    } finally {
      setLoading(false);
    }
  }
    
  

 
  return (
    <>
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pipelineName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pipeline Name<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Color Detection Pipeline" {...field} />
              </FormControl>
              <FormDescription>
                The name of your pipeline is used to create api endpoints.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="What is the primary color in the picture?" {...field} />
              </FormControl>
              <FormDescription>
                The prompt that is used on image send to the pipeline.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
              <Input type="file" accept="image/png, image/jpeg" multiple={false} 
                        onChange={handleFileChange} 
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}/>
              </FormControl>
              <FormDescription>
                Test image to send to the pipeline.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {imagePreview && (
          <div className="flex justify-center">
            <img src={imagePreview.toString()} alt="Preview" className="mt-2 rounded-md object-contain" style={{maxWidth: '500px', maxHeight: '500px'}} />
          </div>
        )}


        <div className="flex w-full max-w-sm items-center space-x-2">
            <Button onClick={form.handleSubmit(onTest)} disabled={loading}>
              
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test
            </Button>
            <Button onClick={form.handleSubmit(onCreate)} disabled={loading} >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              Create
            </Button>
        </div>

        

      </form>
    </Form>

{responseMessage && <div className="alert alert-success">{responseMessage}</div>}
{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
</>
  )
}