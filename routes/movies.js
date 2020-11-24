const router = require('express').Router()
const controller = require('../controllers/movies')
const validation = require('../utils/validation')
const schema = require('../utils/schema')

router.route('/movies')
.post(validation.query(schema.newMovie),controller.newMovie)
.get(controller.getMovies)

router.route('/comments')
.post(validation.body(schema.newComment),controller.newComment)
.get(validation.query(schema.getComments),controller.getComments)

module.exports = router