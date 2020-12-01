import request from 'supertest'
import app from '../../../app'
import * as handler from '../../../module/mongoose/mongoose.config'
import { IConcepts } from '../../../types'

describe('Test in PATCH "/api/concept/:name"', () => {
  const example = 'nothing'

  test('should respond with a status code 404, and object with an error property with a message if the document is not found in the database', async () => {
    const mock = jest.spyOn(handler, 'updateDocInSchema').mockResolvedValue({
      error: true,
      message: `El documento con title: ${example} no se encontro en la database`,
    })
    const res = await request(app)
      .patch(`/concept/${example}`)
      .send({ description: 'actualizando el concepto' })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
    expect(res.type).toBe('application/json')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })

  test('should respond with a status code 500 and an object with and error property and when an error occurs with the database', async () => {
    const mock = jest.spyOn(handler, 'updateDocInSchema').mockResolvedValue({
      error: true,
      message: `Error con la database`,
      errorDB: true,
    })
    const res = await request(app)
      .patch(`/concept/${example}`)
      .send({ description: 'actualizando el concepto' })
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty('error')
    expect(res.type).toBe('application/json')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })

  test('should', async () => {
    const mock = jest.spyOn(handler, 'updateDocInSchema').mockResolvedValue({
      error: false,
      message: `Documento ${example} actualizado con exito`,
      document: <IConcepts>{
        title: 'nothing',
        description: 'datos actualizados',
      },
    })

    const res = await request(app)
      .patch(`/concept/${example}`)
      .send({ description: 'actualizando el concepto' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('document')
    expect(res.type).toBe('application/json')
    expect(mock).toHaveBeenCalled()
    mock.mockRestore()
  })
})
