import { body, ValidationChain, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { LogSendData } from '../module/log_debug/debug'

const conceptValidationRules = (): ValidationChain[] => [
  body('title', 'You must add a title to the concept')
    .isString()
    .not()
    .isEmpty(),
  body('description', 'Must contain a valid description')
    .isString()
    .not()
    .isEmpty(),
  body('subtitle', 'You must add a subtitle to the concept')
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 10 }),
]

function conceptUpdateRules(): ValidationChain[] {
  return [
    body(
      'description',
      'You must provide a valid description in order to update it',
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

  LogSendData('You sent wrong data')
  res.status(422).json({
    errors: extractedErrors,
  })
}

export { conceptValidationRules, validationMiddleware, conceptUpdateRules }
