"use client"

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PipelineDetail({ params }: { params: { slug: string } }) {
  const [isCopied, setIsCopied] = useState(false); // State to handle feedback about copying
  const curlCommand = `curl -X POST ${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_PATH}/pipeline/${params.slug} \\
  -H 'Content-Type: multipart/form-data' \\
  -F 'image=@/path/to/your/image.jpeg'`;

  // -F 'attribute_name=<attribute_value>' \\


  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>API Endpoint Interaction</CardTitle>
        <CardDescription>
          You can use the following CURL command to interact with the pipeline API endpoint, or integrate it within your application&apos;s code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="curlCommand">Curl Command:</Label>
            <div 
              id="curlCommand"
              className="border rounded-md px-4 py-2 w-full h-auto whitespace-pre-wrap overflow-auto break-words" // Tailwind classes for styling
            >
              {curlCommand}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">


        <CopyToClipboard text={curlCommand} onCopy={onCopyText}>
          <Button>{isCopied ? "Copied!" : "Copy to Clipboard"}</Button>
        </CopyToClipboard>
      </CardFooter>
    </Card>
  );
}