module.exports = {
  run: [
    // Remove virtual environment
    {
      method: "fs.rm",
      params: {
        path: "app/env"
      }
    },
    // Remove downloaded models (optional - comment out to keep models)
    // {
    //   method: "fs.rm",
    //   params: {
    //     path: "app/models"
    //   }
    // }
  ]
}
