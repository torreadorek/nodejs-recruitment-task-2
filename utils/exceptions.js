module.exports = {
    errorHandler: (error,req,res,next)=>{
       res.status(500).json({message:'Something went wrong'})
    },
    restHandler: (req,res)=>{
        res.status(404).send('Not found')
    }
}