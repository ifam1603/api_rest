const express = require('express')
const postsRoutes = require('./routes/postsRoutes')
const commRoutes = require('./routes/commentsRoutes')

const app = express()
const port = 3000
app.use(express.json())
app.use('/', postsRoutes)
app.use('/',commRoutes)

//app.use(require('./routes/employeesRoutes'))
app.listen(port, async () => { 
    console.log(`Example app listening on port ${port}!`)
})