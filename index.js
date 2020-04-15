const express = require('express');

const app = express();


app.post('/users', (request, response) => {
    const query = request.query;

    return response.json(query);
});

app.get('/users/:id', (request, response) => {
     const par = request.params;
    
     return response.json(par);
});


app.listen(3333);