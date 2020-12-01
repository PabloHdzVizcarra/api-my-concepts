import request from 'supertest'
import app from '../../app'
import * as mongoose from '../../module/mongoose/mongoose.config'
import { DataRes, IConcepts } from '../../types'

describe('Text in end-point "get /concepts"', () => {
  test('it should return a status code 500 and error message if there is an error with the database', async () => {
    const mock = jest
      .spyOn(mongoose, 'getAllDataFromSchema')
      .mockResolvedValue(<DataRes>{ error: true, message: 'database error' })

    const result = await request(app).get('/concepts')
    expect(result.status).toBe(500)
    expect(result.text).toBeTruthy()

    mock.mockRestore()
  })

  test('it should return a status code 200 and the data from the database', async () => {
    const mock = jest
      .spyOn(mongoose, 'getAllDataFromSchema')
      .mockResolvedValue(<DataRes>{
        error: false,
        message: 'Get data Success',
        data: [
          <IConcepts>{
            title: 'Programming',
            description: 'Best activite fo the world',
          },
        ],
      })
    const result = await request(app).get('/concepts')
    expect(result.status).toBe(200)
    expect(result.body).toEqual([
      <IConcepts>{
        title: expect.any(String),
        description: expect.any(String),
      },
    ])

    mock.mockRestore()
  })
})
