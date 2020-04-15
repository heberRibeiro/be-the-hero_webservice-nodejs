const connection = require('../database/connection');

module.exports = {

    /** List an Incident
     * @param {*} request http request
     * @param {*} response http response 
     */
    async index(request, response) {
        const ong_id = request.headers.authorization;
        
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents);
    }
}