const express = require('express')
const router = express.Router()
const { uploadImages } = require('../../middleware/imageUpload')
const fs = require('fs');
// const { redisRateLimiter } = require('../../middleware/rateLimiter');
// deactivated rate limiter since it requires additional configuration

router.post('/images', uploadImages.array('images', 10), (req, res) => {
  try {

    if (!req.files) {
      return res.status(400).json({
        message: 'No files uploaded',
      })
    }
    for (const file of req.files) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        // upload only png and jpg format
        return res.status(400).json({
          message: 'Only image files are allowed!',
        })
      }
    }
    return res.status(201).json({
      message: 'Images uploaded successfully',
      data: req.files,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error,
    })
  }
})

router.get('/images', (req, res) => {
  // Get the list of images in the images directory.
  const images = fs.readdirSync('images')

  // Get the list of articles in the data directory.
  const articles = JSON.parse(fs.readFileSync('data/articles.json'))
  const associatedImages = []
  let articlesIterator = 0;
  for (const image of images) {
    // Get a random article.
    const article = articles[articlesIterator < 25 ? articlesIterator++ : articlesIterator = 0]
    const imageUrl = `${process.env.IMAGES_ACCESS_URL}/${image}`
    associatedImages.push({
      image: imageUrl,
      article: article,
    })
  }
  fs.writeFileSync(
    'data/associated-images.json',
    JSON.stringify(associatedImages)
  )
  const data = JSON.parse(fs.readFileSync('data/associated-images.json'))
  res.json(data)
})

module.exports = router
