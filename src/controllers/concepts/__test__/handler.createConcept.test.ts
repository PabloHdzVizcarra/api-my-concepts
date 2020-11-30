import request from 'supertest'
import app from '../../../app'
import * as mongoose from '../../../module/mongoose/mongoose.config'
import { IConcepts } from '../../../types'

describe('Test in createConcept handler for end-point "api/v1/create-concept"', () => {
  test('it should return a status code 404, if the data cannot be saved in the database', async () => {
    const mock = jest
      .spyOn(mongoose, 'createConceptInSchema')
      .mockResolvedValue({
        error: true,
        message: 'database error',
      })

    const res = await request(app)
      .post('/api/v1/create-concept')
      .set('Content-type', 'application/json')
      .send({
        title: 'Ubuntu',
        description: 'Best linux distro',
      })
    expect(res.status).toBe(404)
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })

  test('it must return an object with the message and data properties and status code 201, when the data is correctly saved in teh database', async () => {
    const mock = jest
      .spyOn(mongoose, 'createConceptInSchema')
      .mockResolvedValue({
        error: false,
        message: null,
        data: <IConcepts>{
          title: 'DRY',
          description: 'dont repeat your self',
        },
      })

    const res = await request(app)
      .post('/api/v1/create-concept')
      .set('Content-type', 'application/json')
      .send({
        title: 'Ubuntu',
        description: 'Best linux distro',
      })
    expect(res.status).toBe(201)
    expect(mock).toHaveBeenCalled()
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toEqual({
      description: expect.any(String),
      title: expect.any(String),
    })
  })
})
