import { body, ValidationChain, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { LogSendData } from '../module/log_debug/debug'

const conceptValidationRules = (): ValidationChain[] => [
  body('title', 'Debes agregar un titulo al concepto')
    .isString()
    .not()
    .isEmpty(),
  body('description', 'Debe contener una description el concepto')
    .isString()
    .not()
    .isEmpty(),
]

function conceptUpdateRules(): ValidationChain[] {
  return [
    body(
      'description',
      'debes proporcionar una descripcion para poder actualizar',
    )
      .exists()
      .isLength({ min: 10 }),
  ]
}

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
    return
  }

  const extractedErrors: string[] = []
  errors.array().map(err => extractedErrors.push(err.msg))

  LogSendData('enviaste datos incorrectos')
  res.status(422).json({
    errors: extractedErrors,
  })
}

export { conceptValidationRules, validationMiddleware, conceptUpdateRules }
