const express = require('express');

const routes = express.Router();

routes.post('/users', (request, response) => {
    const query = request.query;

    return response.json(query);
});

routes.get('/users/:id', (request, response) => {
     const par = request.params;
    
     return response.json(par);
});

module.exports = routes;