module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python -m uvicorn server:app --host 0.0.0.0 --port {{port}}"
        ],
        on: [{
          event: "/http:\\/\\/[0-9.:]+:([0-9]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[1]}}/demo"
      }
    }
  ]
}
