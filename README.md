![SignaGen-ai logo](https://i.imgur.com/jUWoPBS.png)

# SignaGen-ai

## Overview

SignaGen-ai is a web application that allows users to generate signatures using AI.



https://github.com/user-attachments/assets/2e7a2fbc-8f23-49e8-93d2-5b51b7ed44df



Try out an the demo here: **insert example site link**

Built using:
- Next.js / React
- Tailwind CSS
- [Flux.1-Schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- [Replicate](https://replicate.com/black-forest-labs/flux-schnell)

## TODO:
- Add auth and DB
- Save users generated images in DB so they have a history of them

## Setup

### Prerequisites

- Replicate API key. Get one [here](https://replicate.com/account/api-tokens) Aprox. Cost $0.003/image

### Installation

1. Clone
```bash
git clone https://github.com/yourusername/sig-gen.git
```

2. Install
```bash
cd sig-gen
npm install
```

3. Create a `.env` file in the root directory and add your Replicate API key
```bash
NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_api_key
```

4. Run
```bash
cd sig-gen
npm run dev
```

4. Go to the web app and try it out
```bash
http://localhost:3000
```
