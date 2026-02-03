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
    // Create conda environment with Python 3.11 (required for MLX)
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install gradio"
        ]
      }
    },
    // Download models from HuggingFace
    // Using Lite models by default (faster, lower memory)
    // Users can download Pro models later if needed
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice-8bit --local-dir models/Qwen3-TTS-12Hz-0.6B-CustomVoice-8bit",
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-VoiceDesign-8bit --local-dir models/Qwen3-TTS-12Hz-0.6B-VoiceDesign-8bit",
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-0.6B-Base-8bit --local-dir models/Qwen3-TTS-12Hz-0.6B-Base-8bit"
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
