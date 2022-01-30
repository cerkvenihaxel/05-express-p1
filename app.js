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

// const schema = Joi.object({
//     nombre: Joi.string()
//         .min(3)
//         .max(30)
//         .required()

// });


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


    res.send(users)


});

app.get('/api/users/:id', (req, res) => {

    let usuario = existeUsuario(req.params.id)

    if (!usuario) res.status(404).send('Disculpa capo el usuario no se encontró')
    res.send(`El usuario ${usuario.id} es ${usuario.nombre}`)

})


app.post('/api/users', (req, res) => {

    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .required()

    });

    const {
        error,
        value
    } = validarUsuario(req.body.nombre)
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

    let usuario = existeUsuario(req.params.id)
    if (!usuario) {
        res.status(404).send('Disculpa capo el usuario no se encontró')
        return
    }

        const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .required()

    });
    
    const {
        error,
        value
    } = validarUsuario(req.body.nombre);


    if (error) {
        const msj = error.details[0].message;
        res.status(400).send(msj)
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);


});


const port = process.env.PORT || 3000; //Creamos un a variable de entorno si existe el puerto, si no, en el puerto 3000



app.listen(port, () => {

    console.log(`Escuchando en el puerto ${port}...`);

})

function existeUsuario(id) {

    return (users.find(u => u.id === parseInt(id)));

}

function validarUsuario(nom) {

    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .required()

    });

    return (schema.validate({
        nombre: nom
    }))

}