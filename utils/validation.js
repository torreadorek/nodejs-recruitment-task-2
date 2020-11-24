
module.exports = {
    query: (schema) => {
        return  async (req,res,next) => {
           try{
            const  validate =  await schema.validateAsync(req.query)
            if(validate) next()
            }catch(error) {
                res.status(400).json({message:'Validation failed'})
           }
        }
    },
    body: (schema) => {
        return  async (req,res,next) => {
           try{
            const  validate =  await schema.validateAsync(req.body)
            if(validate) next()
            }catch(error) {
                res.status(400).json({message:'Validation failed'})
           }
        }
    }
}
