import request from 'supertest'
import app from '../../app'

describe('Text in router app', () => {
  test('should return 1', async () => {
    const result = await request(app).get('/api/v1/')
    console.log(result)
    expect(1).toBe(1)
  })
})
