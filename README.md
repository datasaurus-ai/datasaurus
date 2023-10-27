<p align="center">
  <a href="https://datasaurus.app">
    <img height="150" src="https://raw.githubusercontent.com/datasaurus-ai/datasaurus/d03d4bf9458adf67ca2e1579bf8be3fc1173e04c/frontend/public/logo.png?raw=true" alt="logo">
  </a>
</p>

<h1 align="center">
  Datasaurus
</h1>

<p align="center">
  <i>Do computer vision with 1000x less data</i>
</p>

<p align="center">
  <a href="/LICENSE"><img alt="License Apache-2.0" src="https://img.shields.io/github/license/datasaurus-ai/datasaurus?style=flat-square"></a>
</p>

<p align="center">
  <a href="https://datasaurus.app/">Hosted App (coming soon)</a> - <a href="#running-locally">Running Locally</a>
</p>

<br>
Leverage foundational text-vision model for your computer vision tasks. Instead of having to train from scratch your own models rely on pre-trainded models. You can achieve great performance with no data and even better one with a couple of datapoints. You already have a lot of data, then exceed your previous models by fine-tuning a foundational model (coming soon)
<br>
<br>
<p align="center">
 <img width="720" src="https://github.com/datasaurus-ai/datasaurus/blob/63bd3dc725a8bfe2bdd42d8b65f7802f05759371/frontend/public/demo.gif?raw=true" alt="demo">
</p>

## Features

- Fully open-source
  - fine-tuned model weights can be downloaded
- Do computer vision tasks without any data
- Promptable system
  - your requirement change then you just need to adjust your prompt no need to retrain a whole computer vision model
And may more coming soon...

## Examples
Instead of training a model from scratch you can just prompt your images
- **Color Detection Pipeline**
  - Prompt: Determine the main color of specific objects within an image.
- **Count and Action Recognition Pipeline**
  - Prompt: Identify the number of people in a scene and their actions.
- **Fruit Ripeness Analysis Pipeline**
  - Prompt: Analyze images of fruit to determine their level of ripeness.
- **Dog Breed Identification Pipeline**
  - Prompt: Classify the breed of a dog from a given image.

## Supported Base Models

- llava-v1.5-7b
- llava-v1.5-13b
- GPT4-V (as soon as the model api is available)

## Roadmap

- [x] v0 launched
- [ ] add examples sections
- [ ] dataset importer + associated dashboard
- [ ] parameterizable prompt 
- [ ] finetune models
- [ ] add visual in-context learning
- [ ] support for additional inference backend (gglm)
- [ ] hosting service deployment (right now waitlist)
- [ ] stronger output guidance

## Running Locally

1. Install [NodeJS 20](https://nodejs.org/en/download/current) (earlier versions will very likely work but aren't tested).
2. Install [Supabase](https://supabase.com/docs/guides/cli/local-development) `npm i supabase --save-dev`
3. Install [Conda](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)
4. Clone this repository and open it: `git clone https://github.com/datasaurus-ai/datasaurus && cd datasaurus`
5. Install the frontend dependencies: `cd frontend && npm install && cd ..`
6. Install the backend dependencies: `cd backend && conda create --name datasaurus-backemnd --file requirements.txt && cd ..`
7. Start supabase: `supabase start`
8. Complete the backend `.env` file (`cd frontend && cp .env.example .env && cd ..`)
9. Complete the frontend `.env` file (`cd frontend && cp .env.example .env && cd ..`)
10. Start the backend: `cd frontend && uvicorn src.main:app --reload && cd ..`.
11. Start the frontend: `cd frontend && npm run dev && cd ..`.
12. Navigate to [http://localhost:3000](http://localhost:3000)