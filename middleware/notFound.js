const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Not foude' })

}

module.exports = notFound