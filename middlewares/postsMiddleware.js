const validateBody = (req, res, next) => {
    const { heading, text } = req.body;
    if (!heading || heading.length === 0) {
        res.status(400).send('Heading must contain something');
        return;
    }
    if (!text || text.length === 0) {
        res.status(400).send('Post must contain something');
        return;
    }
    next();
}

module.exports = { validateBody };