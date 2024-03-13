const express = require('express')
const db = require('../database/connection')

const router = express.Router()


router.get('/comments', async (req, res) => {

    const posts = await db.collection('comments').find().toArray()

    res.send(posts)
})

router.post('/comments', async function (req, res) {

    try {
        
        const comments = await db.collection('comments')
        const lastComm = await comments.find().sort({"id":-1}).limit(1).toArray() 
        const id = Math.floor(lastComm[0].id) + 1;
        const newComm = {
            "id" : id,
            ...req.body
        }
    
        const result = await db.collection("comments").insertOne(newComm)
        res.send(result)        
    } catch (error) {
        console.log(error)
    }

})

router.delete('/comments/:id', async (req, res)=>{
    try {
        const result = await db.collection('comments').findOneAndDelete(
            {"id": parseInt(req.params.no_emp)}
        )
        res.send((result)?"Commment deleted...":"COmment not found")
    } catch (error) {
        console.log(error)
    }
})

router.put('/comments', async function(req, res) {

    try {
        const commUpdate = db.collection('posts')
        const result = await commUpdate.findOneAndUpdate(
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