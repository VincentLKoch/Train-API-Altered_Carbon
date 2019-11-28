import 'regenerator-runtime/runtime'

import app from './src/app'

const port = 8081

const server = app.listen(port, () => {
  const port = server.address().port
  console.log('Server listening on port ' + port + '...')
})
