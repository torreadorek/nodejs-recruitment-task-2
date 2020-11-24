const Movie  = require('../models').Movie
const axios = require('axios')
const Comment = require('../models').Comment
require('dotenv').config({path:`${__dirname}/config/.env`})

module.exports = {
    newMovie: async (req,res,next)=>{
        try{
            const {title} = req.query
            await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`)
            .then( async movie=>{
                if(movie.data.Response==='True') {
                  const [result,created] =  await Movie.findOrCreate({
                        where:{
                            imdbId:movie.data.imdbID
                        },
                        defaults:{
                            imdbId:movie.data.imdbID,
                            title:movie.data.Title,
                            year:movie.data.Year,
                            released:movie.data.Released,
                            director:movie.data.Director,
                            actors:movie.data.Actors
                        },
                        raw:true,
                        nested:true
                    })
                     if(result)  res.status(200).json({message:'Success',data:result})
                     else res.status(400).json({message:'Failed to add new movie'})
                } else res.status(404).json({message:'Movie not found'})
            })
            
        }catch(error){
            next(error)
        }
    },
    getMovies: async (req,res,next)=>{
        try{
            await Movie.findAll({
                attributes:['imdbId','title','year','released','director','actors'],
                order:[
                    ['title','ASC']
                ]
            })
            .then(movies=>{
                if(movies) res.status(200).json({message:'Success',data:movies})
                else res.status(404).json({message:'Movies not found'})
            })
        }catch(error) {
            next(error)
        }
    },
    newComment: async (req,res,next)=>{
        try{
            const {movieId,comment} = req.body
            const movie = await Movie.findOne({
                where:{
                    id:movieId
                }
            })
            if(movie) {
                await Comment.create({
                    movieId,
                    comment
                }).then(comment=>{
                    res.status(200).json({message:'Success',data:comment})
                })
            } else res.status(404).json({message:'Movie not found'})
        } catch(error) {
            next(error)
        }
    },
    getComments: async (req,res,next)=>{
        try{
            const {movieId} = req.query         
            const filterById = movieId?{
                attributes:['movieId','comment','createdAt'],
                where:{movieId}
            }:{
                attributes:['movieId','comment','createdAt']
            }
            await Comment.findAll(filterById)
            .then(comments=>{
                if(comments.length!==0) res.status(200).json({message:'Success',data:comments})
                else res.status(404).json({message:'Comments not found'})
            })
        }catch(error) {
            next(error)
        }
    }
}