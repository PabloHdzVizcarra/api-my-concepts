import request from 'supertest'
import app from '../../app'
import { UIConcept } from '../../types'

describe('Test in End-Point "/api/v1/create-concept"', () => {
  const wrongData: UIConcept = {
    title: '',
    description: '',
  }

  const correctData: UIConcept = {
    title: 'Programming',
    description: 'best activity of the world',
  }

  test('should return a status code 422, if the complete data is not sent in the request', async () => {
    const result = await request(app)
      .post('/api/v1/create-concept')
      .send(wrongData)
    expect(result.status).toBe(422)
  })

  test('it should return an array object with the property errors ocurred when sending erroneus data to the end-point', async () => {
    const result = await request(app)
      .post('/api/v1/create-concept')
      .send(wrongData)
    expect(result.body).toHaveProperty('errors')
    expect(result.body.errors).toStrictEqual(expect.any(Array))
  })
})
