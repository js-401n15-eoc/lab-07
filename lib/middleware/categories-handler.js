module.exports = (req, res, next) => {
    app.get('/api/v1/categories', getAllCategories);
    app.get('/api/v1/categories/:id', getOneCategory);
    app.post('/api/v1/categories', createCategory);
    app.put('/api/v1/categories/:id', updateCategory);
    app.delete('/api/v1/categories/:id', deleteCategory);

    function getAllCategories(req, res) {
    categories.get()
        .then(results => {
        let output = {
            count: results.length,
            results
        };
        console.log('did we hit the 200 of getall?');
        res.status(200).json(output);
        })
        .catch(error => console.error(error));
    }

    function getOneCategory(req, res) {
    categories.get(req.body.id)
    .then(results => {
        let output = {
        count: results.length,
        results
        };
        res.status(200).json(output);
    })
    .catch(error => console.error(error));
    }

    function createCategory(req, res, next) {
    let record = req.body;
    categories.create(record)
        .then(createdRecord => {
        res.status(200).json(createdRecord);
        })
        .catch(error => next(error));
    }

    function updateCategory(req, res, next) {
    categories.update(req.params.id, req.body)
        .then(updatedRecord => {
        res.status(200).json(updatedRecord);
        })
        .catch(error => next(error));
    } 

    function deleteCategory(req, res) {
    categories.delete(req.params.id)
        .then(() => {
        res.status(204).send();
        })
        .catch(error => console.error(error));
    }
}