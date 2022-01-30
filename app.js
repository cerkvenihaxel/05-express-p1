//Crear servidor web 

const express = require('express');
const {
    use
} = require('express/lib/application');
const req = require('express/lib/request');
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

//Validacion de datos 

const Joi = require('joi');

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()

});


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


    const {
        error,
        value
    } = schema.validate({
        nombre: req.body.nombre
    });
    if (!error) {
        const usuario = {

            id: users.length + 1,
            nombre: value.nombre
        }

        users.push(usuario);
        res.send(usuario);

    } else {
        const msj = error.details[0].message;
        res.status(400).send(msj)
    }


});

app.put('/api/users/:id', (req, res) => {
    //Validación para encontrar si es que existe el usuario a modificar  

    let usuario = users.find(u => u.id === parseInt(req.params.id))
    if (!usuario) res.status(404).send('Disculpa capo el usuario no se encontró')
    res.send(`El usuario ${usuario.id} es ${usuario.nombre}`)


    const {
        error,
        value
    } = schema.validate({
        nombre: req.body.nombre
    });
    if (!error) {
        const usuario = {

            id: users.length + 1,
            nombre: value.nombre
        }

        users.push(usuario);
        res.send(usuario);

    } else {
        const msj = error.details[0].message;
        res.status(400).send(msj)
    }

});


const port = process.env.PORT || 3000; //Creamos un a variable de entorno si existe el puerto, si no, en el puerto 3000


app.listen(port, () => {

    console.log(`Escuchando en el puerto ${port}...`);

})