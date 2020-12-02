import { Response, Request, ErrorRequestHandler, NextFunction } from 'express'

const defaultController = (req: Request, res: Response): void => {
  res.status(404).send('Sorry the endpoint is not available')
}

const errorController = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  res.status(500).send(error)
}

export { defaultController, errorController }
