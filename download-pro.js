// Optional: Download Pro models (1.7B) for higher quality
// These require more RAM (~6GB) but produce better results
module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit --local-dir models/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit",
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign-8bit --local-dir models/Qwen3-TTS-12Hz-1.7B-VoiceDesign-8bit",
          "huggingface-cli download Qwen/Qwen3-TTS-12Hz-1.7B-Base-8bit --local-dir models/Qwen3-TTS-12Hz-1.7B-Base-8bit"
        ]
      }
    }
  ]
}
