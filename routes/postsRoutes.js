const express = require('express')
const db = require('../database/connection')

const router = express.Router()


router.get('/posts', async (req, res) => {

    const posts = await db.collection('posts').find().toArray()

    res.send(posts)
})

router.get('/posts/:id', async (req, res) => {
    const posts = await db.collection('posts').find({"id": parseInt(req.params.id)}).toArray()
    res.send(posts)
})

router.post('/posts', async function (req, res) {

    try {
        
        const posts = await db.collection('posts')
        const lastPost = await posts.find().sort({"id":-1}).limit(1).toArray() 
        const id = Math.floor(lastPost[0].id) + 1;
        const newPost = {
            "id" : id,
            ...req.body
        }
    
        const result = await db.collection("posts").insertOne(newPost)
        res.send(result)        
    } catch (error) {
        console.log(error)
    }

})

router.delete('/posts/:id', async (req, res)=>{
    try {
        const result = await db.collection('posts').findOneAndDelete(
            {"id": parseInt(req.params.no_emp)}
        )
        res.send((result)?"Post deleted...":"post not found")
    } catch (error) {
        console.log(error)
    }
})

router.put('/posts', async function(req, res) {

    try {
        const postUpdate = db.collection('posts')
        const result = await postUpdate.findOneAndUpdate(
            { "id":parseInt(req.body.no_emp) }, 
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});






router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router
