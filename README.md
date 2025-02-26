**insert logo**

# SignaGen-ai

## Overview

SignaGen-ai is a web application that allows users to generate signatures using AI.

**insert video demo**

Try out an example here: https://sig-gen.vercel.app/

```Note: The example site is just displaying the same pre-generated signatures as an example, and not actually generating signatures. If you want to generate signatures, you can setup the app locally with the instructions below.```

Built using:
- Next.js / React
- Tailwind CSS
- [Flux.1-Schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- Flask

## Setup

### Prerequisites
- Python 3.10+
- Node
- CUDA
- Since the server is running the Flux.1-Schnell model locally, it requires a Nvidia GPU for CUDA. It is also recommended to have at least 16GB of RAM.
- The server will likely not run on Silicon Macs. You can edit the web application to use one of Flux.1-Schnell's API [endpoints](https://huggingface.co/black-forest-labs/FLUX.1-schnell#api-endpoints), but that will cost money.

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sig-gen.git
```

2. Install Web App
```bash
cd sig-gen
npm install
```

3. Install Flask Server
```bash
cd sig-server
pip install -r requirements.txt
```

4. Run Web App
```bash
cd sig-gen
npm run dev
```

5. Run Ai Server
```bash
cd sig-server
./run.sh
```
or
```
flask --app run
```

6. Go to the web app and try it out
```bash
http://localhost:3000
```