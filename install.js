module.exports = {
  run: [
    // Clone the repository if not already present
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/blizaine/qwen3-tts-apple-silicon app"
      }
    },
    // Install MLX and core dependencies
    // Note: requirements.txt has audioop-lts which requires Python 3.13+
    // We install packages directly to work with Python 3.10/3.11
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install mlx mlx-lm",
          "uv pip install git+https://github.com/Blaizzy/mlx-audio.git",
          "uv pip install librosa soundfile transformers sentencepiece tiktoken",
          "uv pip install huggingface_hub tqdm pyyaml numpy",
          "uv pip install fastapi uvicorn python-multipart"
        ]
      }
    },
    // Download models from HuggingFace (mlx-community 8bit quantized models)
    // Using Lite 0.6B for CustomVoice and Base (faster, lower memory)
    // VoiceDesign only available in 1.7B Pro version
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download('mlx-community/Qwen3-TTS-12Hz-0.6B-CustomVoice-8bit', local_dir='models/Qwen3-TTS-12Hz-0.6B-CustomVoice-8bit')\"",
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download('mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-8bit', local_dir='models/Qwen3-TTS-12Hz-1.7B-VoiceDesign-8bit')\"",
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download('mlx-community/Qwen3-TTS-12Hz-0.6B-Base-8bit', local_dir='models/Qwen3-TTS-12Hz-0.6B-Base-8bit')\""
        ]
      }
    },
    // Create output directories
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "mkdir -p outputs/CustomVoice outputs/VoiceDesign outputs/Clones voices"
        ]
      }
    },
    // Link venv for deduplication
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
