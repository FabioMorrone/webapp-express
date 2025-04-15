const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;
const serverError = require('./middleware/serverError');
const notFound = require('./middleware/notFound');
const movies = require('./routers/movies')

app.use(cors(
    {
        origin: process.env.FRONT_URL || `http://localhost:5173`
    }
))

app.use(express.json())

app.use(express.static(`public`))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})

app.get('/', (req, res) => {
    res.send(`Movies API server running`)
})

app.use('/api/v1/movies', movies)

app.use(serverError)

app.use(notFound)