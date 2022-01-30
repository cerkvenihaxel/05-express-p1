//Crear servidor web 

const express = require('express');
const app = express(); //Creamos una instancia de express  
const users = [

    {
        id: 1,
        nombre: 'Axel'
    },
    {
        id: 2,
        nombre: 'Agus'
    },
    {
        id: 3,
        nombre: 'Anita'
    }

] // Arreglo de usuarios 

app.use(express.json());

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

app.get('/api/users/:id', (req, res) => {

    let usuario = users.find(u => u.id === parseInt(req.params.id))

    if (!usuario) res.status(404).send('Disculpa capo el usuario no se encontró')
    res.send(`El usuario ${usuario.id} es ${usuario.nombre}`)

})


app.post('/api/users', (req, res) => {

    if(!req.body.nombre || req.body.nombre.length <= 2) {
        res.status(400).send('Debe ingresar un nombre con mas de 3 letras'); //400 Bad Request - respuesta al cliente
        return;
    }
    const usuario = {

        id: users.length + 1,
        nombre: req.body.nombre

    };

    users.push(usuario);
    res.send(usuario);
});


const port = process.env.PORT || 3000; //Creamos un a variable de entorno si existe el puerto, si no, en el puerto 3000


app.listen(port, () => {

    console.log(`Escuchando en el puerto ${port}...`);

})