const { expect } = require('chai')
const chai = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('Testing the movies API', ()=>{

    var movieId

    context('POST /movies',()=>{

        it('should response status 200,message and movie object',(done)=>{
            supertest(app)
            .post('/movies')
            .query({title:'Batman'})
            .then(res=>{
                    movieId = res.body.data.id
                    chai.expect(res.status).to.equal(200)
                    chai.expect(res.body.message).to.equal('Success')
                    chai.expect(res.body).to.have.property('data')
                done()
            }).catch(error=>{
                done(error)
            })
        })

        it('should response status 400 and message',(done)=>{
            supertest(app)
            .post('/movies')
            .then(res=>{
                    chai.expect(res.status).to.equal(400)
                    chai.expect(res.body.message).to.equal('Validation failed')
                done()
            }).catch(error=>{
                done(error)
            })
        })

        it('should response status 404 and message',(done)=>{
            supertest(app)
            .post('/movies')
            .query({title:'asddas'})
            .then(res=>{
                    chai.expect(res.status).to.equal(404)
                    chai.expect(res.body.message).to.equal('Movie not found')
                done()
            }).catch(error=>{
                done(error)
            })
        })
    })

    context('GET /movies',()=>{
        it('should response status 200, message and array of movies',(done)=>{
            supertest(app)
            .get('/movies')
            .then(res=>{
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body.message).to.equal('Success')
                chai.expect(res.body).to.have.property('data')
            done()
            }).catch(error=> done(error))
            
        })
    })

    context('POST /comments',()=>{
        it('should response status 200, message and object with movie',(done)=>{
            supertest(app)
            .post('/comments')
            .send({
                movieId:movieId,
                comment:'new comment'
            }).then(res=>{
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Success')
                expect(res.body).to.have.property('data')
                done()
            }).catch(error=>done(error))
        })

        it('should response status 404 and message',(done)=>{
            supertest(app)
            .post('/comments')
            .send({
                movieId:'00000000-0000-0000-0000-000000000000',
                comment:'new comment'
            }).then(res=>{
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('Movie not found')
                done()
            }).catch(error=>done(error))
        })

        it('should response status 400 and message',(done)=>{
            supertest(app)
            .post('/comments')
            .send({
                comment:'new comment'
            }).then(res=>{
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Validation failed')
                done()
            }).catch(error=>done(error))
        })
    })

    context('GET /comments',()=>{
        it('should response status 200 and message',(done)=>{
            supertest(app)
            .get('/comments')
            .then(res=>{
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Success')
                expect(res.body).to.have.property('data')
                done()
            }).catch(error=>done(error))
        })

        it('should response status 400 and message ',(done)=>{
            supertest(app)
            .get('/comments')
            .query({title:''})
            .then(res=>{
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Validation failed')
                done()
            }).catch(error=>done(error))
        })

        it('should response status 404 and message',(done)=>{
            supertest(app)
            .get('/comments')
            .query({movieId:'00000000-0000-0000-0000-000000000000'})
            .then(res=>{
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('Comments not found')
                done()
            }).catch(error=>done(error))
        })
    })
})