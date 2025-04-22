const connection = require('../data/db')


function index(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const sqlReviews = 'SELECT * FROM reviews WHERE reviews.movie_id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Movie not found' });

        const movie = results[0]
        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            movie.reviews = results;
            res.json(movie);

        })

    })
}


function storeReview(req, res) {
    const id = Number(req.params.id);

    const { username, text, vote } = req.body;

    const sql =
        "INSERT INTO reviews (name, text, vote, movie_id) VALUES (?, ?, ?, ?)";

    connection.query(sql, [username, text, vote, id], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: "Failed to store the review" });
        }

        res.status(201).json({
            message: "Review stored successfully",
            reviewId: results.insertId,
        });
    });
}







module.exports = {
    index,
    show,
    storeReview,
};