const request = require('supertest')
const { Server } = require('../server')

describe('Server', () => {
  it('has Cross Origin Resource Sharing enabled for all domains', async () => {
    let server = Server({})
    let response = await request(server)
      .post('/')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send({
        query: `{
        __schema {
          queryType {
            fields {
              name
            }
          }
        }
      }`,
      })

    let { headers } = response
    expect(headers['access-control-allow-origin']).toEqual('*')
  })
})
