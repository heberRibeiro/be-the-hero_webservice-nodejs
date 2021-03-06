const connection = require('../database/connection');

module.exports = {

    /** List all Incidents in a paginated way
     * @param {*} request http request
     * @param {*} response http response 
     */
    async index(request, response) {
        const { page = 1 } = request.query; // find a parameter called "page" (default value = 1)

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')   // join with table 'ongs' where 'id' in 'ongs' match with 'ong_id' in 'incidents'
        .limit(5)                                           // limited to 5 results 
        .offset((page -1) * 5)                              // shifting 5 results per page
        .select([
            'incidents.*',                                  // selects all columns in incident and ong, except for id in ong
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    /** Create an Incident
     * @param {*} request http request
     * @param {*} response http response 
     */
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        });

        return response.json({ id }); 
    },

    /** Delete an Incident
     * @param {*} request http request
     * @param {*} response http response 
     */
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id ) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(201).send();
    }
}