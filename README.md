# Qwen3-TTS MLX WebUI

High-quality text-to-speech with a beautiful Web UI, optimized for Apple Silicon using MLX.

## Features

- **Custom Voice**: Use preset speakers (Ryan, Vivian, Serena, etc.) with emotion and speed control
- **Voice Design**: Create custom voices using natural language descriptions
- **Voice Cloning**: Clone any voice from a reference audio sample
- **Saved Voices**: Save voice profiles for reuse

## Requirements

- Apple Silicon Mac (M1, M2, M3, M4)
- macOS 12.0 or later
- ~3GB RAM for Lite models, ~6GB for Pro models

## Installation

1. Click "Install" in Pinokio
2. Wait for dependencies and models to download
3. Click "Start" to launch the Web UI

## Models

### Lite Models (0.6B) - Installed by default
- Faster generation
- Lower memory usage (~2-3GB)
- Good quality for most use cases

### Pro Models (1.7B) - Optional download
- Higher quality output
- More memory required (~5-6GB)
- Click "Download Pro Models" after installation

## Usage

### Custom Voice
1. Enter your text
2. Select a speaker from the dropdown
3. Choose an emotion/style (or type your own)
4. Adjust speed if needed
5. Click "Generate"

### Voice Design
1. Enter your text
2. Describe the voice you want in natural language
   - Example: "A warm, friendly female voice with a slight British accent"
3. Click "Generate"

### Voice Cloning
1. Upload a reference audio file (3-10 seconds works best)
2. Optionally provide the transcript of the reference audio
3. Enter the text you want the cloned voice to say
4. Click "Generate"

## API Usage

The Web UI also exposes a REST API. Access the API documentation at:
- Swagger UI: `http://localhost:PORT/docs` (when running)

### Python Example

```python
import requests

response = requests.post(
    "http://localhost:7860/api/generate",
    json={
        "text": "Hello, this is a test.",
        "speaker": "Vivian",
        "emotion": "Normal tone",
        "speed": 1.0
    }
)

# Save the audio
with open("output.wav", "wb") as f:
    f.write(response.content)
```

### cURL Example

```bash
curl -X POST "http://localhost:7860/api/generate" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "speaker": "Ryan"}' \
  --output output.wav
```

## Output Files

Generated audio files are saved to:
- `app/outputs/CustomVoice/` - Custom voice generations
- `app/outputs/VoiceDesign/` - Voice design generations
- `app/outputs/Clones/` - Voice clone generations

## Credits

- [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) by Alibaba
- [MLX Audio](https://github.com/Blaizzy/mlx-audio) by Prince Canuma
- [Original CLI](https://github.com/kapi2800/qwen3-tts-apple-silicon) by kapi2800

## License

This project follows the licenses of its dependencies:
- Qwen3-TTS: Apache 2.0
- MLX: MIT
