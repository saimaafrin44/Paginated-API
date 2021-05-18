const express = require('express')
const app = express()

const users = [
    {id:1, name: 'user 1'},
    {id:2, name: 'user 2'},
    {id:3, name: 'user 3'},
    {id:4, name: 'user 4'},
    {id:5, name: 'user 5'},
    {id:6, name: 'user 6'},
    {id:7, name: 'user 7'}
]

const posts = [
    {id:1, name: 'post 1'},
    {id:2, name: 'post 2'},
    {id:3, name: 'post 3'},
    {id:4, name: 'post 4'},
    {id:5, name: 'post 5'},
    {id:6, name: 'post 6'},
    {id:7, name: 'post 7'}
]

app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults)
  })
app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults)
  })

function paginatedResults(model) {
    return (req, res, next) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page -1) * limit
    const endIndex = page * limit

    const results = {} //to define if there is another page or not
    // users between the start and end index

    if(endIndex < model.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    results.results = model.slice(startIndex, endIndex)
    res.paginatedResults = results
    next()
}
    
}
app.listen(3000)