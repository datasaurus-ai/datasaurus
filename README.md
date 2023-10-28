<p align="center">
  <a href="https://datasaurus.app">
    <img height="150" src="https://github.com/datasaurus-ai/datasaurus/assets/32412211/9ac40d6b-097b-4eaf-ba69-5129b52121af" alt="logo">
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
Leverage a foundational text-vision model for your computer vision tasks. Instead of having to train your own models from scratch, rely on pre-trained models. You can achieve great performance with no data, and an even better one with a couple of datapoints. If you already have a lot of data, then exceed your previous models' performance by fine-tuning a foundational model (coming soon).
<br>
<br>
<p align="center">
 <img width="720" src="https://github.com/datasaurus-ai/datasaurus/assets/32412211/7b9a36dd-9264-4442-ba25-e29a5a1516f3" alt="demo">
</p>

## Features

- Fully open-source
  - Fine-tuned model weights can be downloaded.
- Do computer vision tasks without any data.
- Promptable system
  - If your requirements change, then you just need to adjust your prompt; no need to retrain an entire computer vision model.
- And many more features coming soon...

## Examples

Instead of training a model from scratch, you can just prompt your images.
- **Color Detection Pipeline**
  - Prompt: Determine the main color of specific objects within an image.
- **Count and Action Recognition Pipeline**
  - Prompt: Identify the number of people in a scene and their actions.
- **Fruit Ripeness Analysis Pipeline**
  - Prompt: Analyze images of fruit to determine their level of ripeness.
- **Dog Breed Identification Pipeline**
  - Prompt: Classify the breed of a dog from a given image.

## Supported Base Models

- LLaVA-v1.5-7B
- LLaVA-v1.5-13B
- GPT4-V (as soon as the model API is available)

## Roadmap

- [x] v0 launched
- [ ] Add examples sections.
- [ ] Dataset importer + associated dashboard.
- [ ] Parameterizable prompt.
- [ ] Fine-tune models.
- [ ] Add visual in-context learning.
- [ ] Support for additional inference backend (gglm).
- [ ] Hosting service deployment (right now, waitlist).
- [ ] Stronger output guidance.

## Running Locally

1. Install [NodeJS 20](https://nodejs.org/en/download/current) (earlier versions will very likely work but aren't tested)
2. Install [Supabase](https://supabase.com/docs/guides/cli/local-development) with `npm i supabase --save-dev`
3. Install [Conda](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)
4. Clone this repository and open it: `git clone https://github.com/datasaurus-ai/datasaurus && cd datasaurus`
5. Install the frontend dependencies: `cd frontend && npm install && cd ..`
6. Install the backend dependencies: `cd backend && virtualenv datasaurus-backend && source datasaurus-backend/bin/activate && pip install -r requirements.txt && cd ..`
7. Start Supabase: `cd supabase && supabase start && cd ..`
8. Register for an account on replicate.com and obtain an API key. We utilize Replicate as our backend for performing inference. (Note: running models locally capability coming soon.)
9. Create the backend `.env` file (`cd backend && cp .env.example .env && cd ..`) and complete it
10. Create the frontend `.env` file (`cd frontend && cp .env.example .env && cd ..`) and complete it
11. Start the backend: `cd backend && source datasaurus-backend/bin/activate && uvicorn src.main:app --reload && cd ..`
12. Start the frontend: `cd frontend && npm run dev && cd ..`.
13. Navigate to [http://localhost:3000](http://localhost:3000)

## Interested?

If you are interested, please leave us a star or/and sign up for launch of the hosted version on [datasaurus.app](https://datasaurus.app)