//Crear servidor web 

const express = require('express');
const app = express(); //Creamos una instancia de express  


// app.get(); //READ
// app.post(); //CREATE
// app.put(); //UPDATE
// app.delete(); //DELETE 

// Función callback 

app.get('/', (req, res) => {

res.send('Bienvenides chiques como están todo bien')

}) 

app.get('/api/users', (req, res) => {


res.send(['Axel', 'Agus', 'Pablo'])


});

app.listen(3000, () => {

console.log("Escuchando en el puerto 3000...")

})