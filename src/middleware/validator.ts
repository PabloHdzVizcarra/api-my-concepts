import { body, ValidationChain, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

const conceptValidationRules = (): ValidationChain[] => [
  body('title', 'Debes agregar un titulo al concepto')
    .isString()
    .not()
    .isEmpty(),
  body('description', 'Debe contener uns description el concepto')
    .isString()
    .not()
    .isEmpty(),
]

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  }

  const extractedErrors: ErrorConstructor[] = []
  errors.array().map(err => extractedErrors.push(err.msg))
  res.status(422).json({
    errors: extractedErrors,
  })
}

export { conceptValidationRules, validationMiddleware }
