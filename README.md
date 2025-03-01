![SignaGen-ai logo](https://i.imgur.com/jUWoPBS.png)

# SignaGen-ai

## Overview

SignaGen-ai is a web application that allows users to generate signatures using AI.



https://github.com/user-attachments/assets/2e7a2fbc-8f23-49e8-93d2-5b51b7ed44df



Try out an the demo here: https://signagen.netlify.app

```
Demo Login:
  Email: demo@towner.dev
  Pass: demo1234
```

Built using:
- (Next.js)[https://nextjs.org/]
- (Tailwind CSS)[https://tailwindcss.com]
- (Better Auth)[https://www.better-auth.com]
- (Neon)[https://neon.tech]
- (Drizzle ORM)[https://orm.drizzle.team]
- (Shadcn UI)[https://ui.shadcn.com]
- [Flux.1-Schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- [Replicate](https://replicate.com/black-forest-labs/flux-schnell)
- (Netlify)[https://netlify.com]

## TODO
- profile page/customization

## Setup

### Prerequisites

- Replicate API key. Get one [here](https://replicate.com/account/api-tokens) Aprox. Cost $0.003/image
- A Database to integrate with Drizzle and Better Auth. Neon was used for this project.

### Installation

1. Clone
```bash
git clone https://github.com/townerr/SignaGen-ai.git
```

2. Install
```bash
cd sig-gen
npm install
```

3. Create a `.env` file in the root directory and add your Replicate API key, Better Auth Secret and URL, and Database connection string.
```bash
NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_api_key
DATABASE_URL=postgresql://....
NEXT_PUBLIC_BETTER_AUTH_SECRET=secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
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
