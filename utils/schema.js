const { object, string } = require('joi')
const joi = require('joi')

module.exports = {
    newMovie:joi.object({
        title:joi.string().min(1).max(50).required()
    }),
    newComment:joi.object({
        movieId:joi.string().min(36).max(36).required(),
        comment:joi.string().min(1).max(200).required()
    }),
    getComments:joi.object({
        movieId:joi.string().min(36).max(36)
    })

}