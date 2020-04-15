const crypto = require('crypto');   // encryption package that comes with the node
const connection = require('../database/connection');

module.exports = {

    /** Lista all ONGs
     * @param {*} request http request
     * @param {*} response http response 
     */
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    /** Create an ONG
     * @param {*} request http request
     * @param {*} response http response 
     */
    async create(request, response) {

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

    }

};