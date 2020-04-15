const express = require('express');
const crypto = require('crypto');   // encryption package that comes with the node

const routes = express.Router();

routes.post('/users', (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');   // crypto method that creates random characters

    return response.json();
});

module.exports = routes;