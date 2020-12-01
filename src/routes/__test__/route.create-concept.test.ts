import request from 'supertest'
import app from '../../app'
import { UIConcept } from '../../types'
import * as handler from '../../controllers/concepts/concepts.controllers'

describe('Test in End-Point "POST /concept"', () => {
  const wrongData: UIConcept = {
    title: '',
    description: '',
  }

  const correctData: UIConcept = {
    title: 'Programming',
    description: 'best activity of the world',
  }

  test('should return a status code 422, if the complete data is not sent in the request', async () => {
    jest.spyOn(handler, 'createConcept')
    const result = await request(app).post('/concept').send(wrongData)

    expect(result.status).toBe(422)
    expect(handler.createConcept).not.toHaveBeenCalled()
  })

  test('it should return an array object with the property errors ocurred when sending erroneus data to the end-point', async () => {
    jest.spyOn(handler, 'createConcept')
    const result = await request(app).post('/concept').send(wrongData)

    expect(result.body).toHaveProperty('errors')
    expect(result.body.errors).toStrictEqual(expect.any(Array))
    expect(handler.createConcept).not.toHaveBeenCalled()
  })
})
