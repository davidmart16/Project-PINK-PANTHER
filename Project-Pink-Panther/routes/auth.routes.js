const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

// Signup
    router.get('/registro', (req, res) => res.render('auth/auth-form'))
    router.post('/registro', (req, res) => {

    const { email, pwd } = req.body

    if (pwd.length === 0) { // Si la contraseña está vacía
    res.render('auth/auth-form', { errorMsg: 'La contraseña es obligatoria' })
    return
    }

    User
    .findOne({ email })
    .then(user => {

        if (user) { 
        res.render('auth/auth-form', { errorMsg: 'Usuario ya registrado' })
        return
        }

        const bcryptSalt = 10
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(pwd, salt) // Contraseña hasheada

        User
        .create({ email, password: hashPass })
        .then(()=> res.redirect('/'))
            .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
    })



    //EXPRESIONES REGULARES PARA LA CONTRASEÑA Y EL EMAIL

//     forms[2].onsubmit = e => {
//             e.preventDefault()
//             const inputValue = e.target[0].value
//             inputValue.match(/^\S+@\S+\.\S+$/) ? alert("Has cumplido la instrucción. Enviando datos.") : alert("Valor incorrecto, merluzo!")
//         }
//         // No dejar el campo vacío
//         forms[3].onsubmit = e => {
//             e.preventDefault()
//             const inputValue = e.target[0].value
//             !inputValue.match(/^\s+$/) && inputValue.length ? alert("Has cumplido la instrucción. Enviando datos.") : alert("Valor incorrecto, merluzo!")
//         }


// // Contraseña puñetera
//         forms[5].onsubmit = e => {
//             e.preventDefault()
//             const inputValue = e.target[0].value
//             inputValue.match(/[0-9]/) && inputValue.match(/[A-Z]/) && inputValue.match(/[a-z]/) && inputValue.match(/[!$*]/) && inputValue.length >= 6 ? alert("Has cumplido la instrucción. Enviando datos.") : alert("Valor incorrecto, merluzo!")
//         }