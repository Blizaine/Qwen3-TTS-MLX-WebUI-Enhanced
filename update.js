module.exports = {
  run: [
    // Update the launcher scripts
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    // Update the app repository
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    // Update dependencies
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt --upgrade",
          "uv pip install gradio --upgrade"
        ]
      }
    }
  ]
}
