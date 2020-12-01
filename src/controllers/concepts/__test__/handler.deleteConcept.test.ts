import request from 'supertest'
import app from '../../../app'
import * as mongoose from '../../../module/mongoose/mongoose.config'

describe('Test in end-point "DELETE /concept/:name"', () => {
  test('it must return with a json, with an error property and staus code 404 when the requested resource is not found in the database', async () => {
    const mock = jest.spyOn(mongoose, 'deleteDataInSchema').mockResolvedValue({
      error: true,
      message: 'No se encontro en la database',
    })
    const res = await request(app).delete('/concept/someName')
    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body).toHaveProperty('error')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })

  test('it must return with a json, with an error property and staus code 500 when exists a error from database', async () => {
    const mock = jest.spyOn(mongoose, 'deleteDataInSchema').mockResolvedValue({
      error: true,
      message: 'Error de conexion con la database',
      databaseError: true,
    })
    const res = await request(app).delete('/concept/someName')
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty('error')
    expect(res.type).toBe('application/json')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })
  test('should respond with status code 200 and success propertie when delete data is success from database', async () => {
    const mock = jest.spyOn(mongoose, 'deleteDataInSchema').mockResolvedValue({
      error: false,
      message: 'se elimino con exito en la database',
    })

    const res = await request(app).delete('/concept/someName')
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body).toHaveProperty('success')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })
})
