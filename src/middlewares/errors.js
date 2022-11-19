const ERROR_HANDLERS = {
    CastError: res =>
      res.status(400).send({ error: 'Could not undestand' }),
  
    ValidationError: (res, { message }) =>
      res.status(409).send({ error: message }),
  
  
    defaultError: (res, error) => {
      console.error(error.name)
      res.status(500).end()
    }
  }
  
  module.exports = (error, request, response, next) => {
    const handler =
      ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  
    handler(response, error)
  }