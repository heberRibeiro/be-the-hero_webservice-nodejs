const express = require('express');
const crypto = require('crypto');   // encryption package that comes with the node

const connection = require('./database/connection')

const routes = express.Router();

routes.get('/users', async (request, response) => {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
})

routes.post('/users', async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');   // crypto method that creates random characters

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({ id });
});

module.exports = routes;