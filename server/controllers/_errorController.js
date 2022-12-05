exports.get404 = (req, res, next) => {
    res.status(404).send("Sorry, 404 Not Found :(");
}

exports.get500 = (req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, Code Is Wrong :(");
}