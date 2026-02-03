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
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download('mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit', local_dir='models/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit')\"",
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download('mlx-community/Qwen3-TTS-12Hz-1.7B-Base-8bit', local_dir='models/Qwen3-TTS-12Hz-1.7B-Base-8bit')\""
        ]
      }
    }
  ]
}
