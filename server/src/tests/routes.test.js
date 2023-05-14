/* eslint-disable no-undef */
const request = require('supertest')
const { expect } = require('expect')
const app = require('../app')

describe('Post images', () => {
  it('should post images', async () => {
    const res = await request(app)
      .post('/api/v1/kisi-test/images')
      .send({
        images: [
          {
            fieldname: 'images',
            originalname: 'rm 2019-1.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './images',
            filename: '717704.jpg',
            path: 'images\\717704.jpg',
            size: 175272,
          },
        ],
      })
    expect(res.statusCode).toEqual(201)
  })
})

describe('Get images', () => {
  it('should get images associated with an article', async () => {
    const res = await request(app).get('/api/v1/kisi-test/images')
    expect(res.statusCode).toEqual(200)
    expect(res.body[0]).toHaveProperty('image')
    expect(res.body[0]).toHaveProperty('article')
    expect(res.body[0].article).toHaveProperty('title')
    expect(res.body[0].article).toHaveProperty('description')
  })
})
