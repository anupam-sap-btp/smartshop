cds.on('bootstrap', app => {
    app.get('/health', (_, res) => {
      res.status(200).send('OK')
    })
  })