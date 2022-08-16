const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6ZmFvZG9jZ2traW5lZmVxYWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwOTU0MDAsImV4cCI6MTk3NTY3MTQwMH0.9RbOy-vOsEC2IfOhiTbkt_mxBymiikcZ4Zy36qXMulk"

const url = "https://hzfaodocgkkinefeqafp.supabase.co"

const cliente = supabase.createClient(url, key)

const formCliente = document.querySelector('#form-cliente');

function ingresoLetras(letra) {
    //Validar si solo son letras
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(letra)) {
        return true;
    }
    return false;
}

function ingresoNumeros(numero){
    //Validar si solo son numeros
    const regex = /^[0-9]+$/;
    if (regex.test(numero)) {
        return true;
    }
    return false;
}

formCliente.addEventListener('submit', (e) => {
    e.preventDefault();

    const ci = document.querySelector('#numCedula-p').value
    const name = document.querySelector('#nombre-p').value
    const lastName = document.querySelector('#apellido-p').value
    const address = document.querySelector('#direccion-p').value
    const phone = document.querySelector('#telefono-p').value

    console.log(ci, name, lastName, address, phone)

    //validar campos vacios
    if(ci === '' || name === '' || lastName === '' || address === '' || phone === ''){
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-danger" role="alert">Campos vacios</div>`
    }
    else if (ci.length !== 10) {
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-danger" role="alert"> La cedula debe tener 10 digitos </div>`
    }
    //solo ingreso de numeros en ci
    else if (isNaN(ci)) {
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-danger" role="alert"> La cedula debe ser numerica </div>`
    }
    else if (!ingresoLetras(name) || !ingresoLetras(lastName)) {
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-danger" role="alert"> El nombre y apellido deben ser solo letras </div>`
    }
    else if (isNaN(phone)) {
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-danger" role="alert"> El telefono debe ser numerico </div>`
    }
    else {
        const insertClient = async (ci, name, lastName, address, phone) => {
            try {
                const { error, data } = await cliente.from('cliente').insert({
                    ci,
                    name,
                    lastName,
                    address,
                    phone
                })
                if (error) throw new Error(error)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        insertClient(ci, name, lastName, address, phone)

        //poner los campos en blanco
        document.querySelector('#numCedula-p').value = ''
        document.querySelector('#nombre-p').value = ''
        document.querySelector('#apellido-p').value = ''
        document.querySelector('#direccion-p').value = ''
        document.querySelector('#telefono-p').value = ''
        document.querySelector('#cli-error').innerHTML = `<div class="alert alert-success" role="alert"> Cliente registrado </div>`
    }

})

const formPet = document.querySelector('#form-pet');

formPet.addEventListener('submit', (e) => {
    e.preventDefault();

    const generarCodigoM = () => {
        const id = Math.random().toString(36).substr(2, 5)
        return id
    }

    const ciP = document.querySelector('#ci-p').value
    const nameM = document.querySelector('#name-m').value
    const typeM = document.querySelector('#tipo-m').value
    const firstDate = document.querySelector('#fechaN-m').value
    const gender = document.querySelector('#sexo-m').value
    const raza = document.querySelector('#raza-m').value
    const color = document.querySelector('#color-m').value
    const dateIn = document.querySelector('#fechaI-m').value
    const dateOut = document.querySelector('#fechaU-m').value

    if (ciP === '' || nameM === '' || typeM === '' || gender === '' || raza === '' || color === '') {
        document.querySelector('#pet-error').innerHTML = `<div class="alert alert-danger" role="alert"> Campos vacios </div>`
    }
    else if(isNaN(ciP)){
        document.querySelector('#pet-error').innerHTML = `<div class="alert alert-danger" role="alert"> La cedula debe ser numerica </div>`
    }
    else if(!ingresoLetras(nameM) || !ingresoLetras(raza) || !ingresoLetras(color)){
        document.querySelector('#pet-error').innerHTML = `<div class="alert alert-danger" role="alert"> Ingreso solo letras </div>`
    }
    else {
        let codigoM = generarCodigoM()

        const insertMascota = async (ciP, nameM, typeM, firstDate, gender, raza, color, dateIn, dateOut, codigoM) => {
            try {
                const { error, data } = await cliente.from('mascota').insert({
                    ciP,
                    nameM,
                    typeM,
                    firstDate,
                    gender,
                    raza,
                    color,
                    dateIn,
                    dateOut,
                    codigoM
                })
                if (error) throw new Error(error)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        insertMascota(ciP, nameM, typeM, firstDate, gender, raza, color, dateIn, dateOut, codigoM)

        document.querySelector('#codigoMascota').innerHTML = `El código de la mascota es: ${codigoM}`
        document.querySelector('#pet-error').innerHTML = `<div class="alert alert-success" role="alert"> Mascota registrada </div>`

        //poner los campos en blanco
        document.querySelector('#ci-p').value = ''
        document.querySelector('#name-m').value = ''
        document.querySelector('#tipo-m').value = ''
        document.querySelector('#fechaN-m').value = ''
        document.querySelector('#sexo-m').value = ''
        document.querySelector('#raza-m').value = ''
        document.querySelector('#color-m').value = ''
        document.querySelector('#fechaI-m').value = ''
        document.querySelector('#fechaU-m').value = ''
    }
})

const formMet1 = document.querySelector('#met-1');

formMet1.addEventListener('submit', (e) => {
    e.preventDefault();

    const ciP = document.querySelector('#metCi').value
    console.log(ciP)

    if (ciP === '') {
        document.querySelector('#error-2').innerHTML = `<div class="alert alert-danger" role="alert"> Campos vacios </div>`
    }
    else if(isNaN(ciP)){
        document.querySelector('#error-2').innerHTML = `<div class="alert alert-danger" role="alert"> La cedula debe ser numerica </div>`
    }
    else {
        const getMascotas = async (ciP) => {
            try {
                const { error, data } = await cliente.from('mascota').select('*').eq('ciP', ciP)
                if (error) throw new Error(error)
                console.log(data)
                document.querySelector('#contenidoPM').innerHTML =
                    `<table class="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Raza</th>
                            <th scope="col">Color</th>
                            <th scope="col">Fecha de Ingreso</th>
                            <th scope="col">Fecha de Salida</th>
                            <th scope="col">Código</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(mascota => `<tr>
                            <td>${mascota.nameM}</td>
                            <td>${mascota.typeM}</td>
                            <td>${mascota.firstDate}</td>
                            <td>${mascota.gender}</td>
                            <td>${mascota.raza}</td>
                            <td>${mascota.color}</td>
                            <td>${mascota.dateIn}</td>
                            <td>${mascota.dateOut}</td>
                            <td>${mascota.codigoM}</td>`)}
                    </tbody>`
            } catch (error) {
                console.log(error)
            }
        }
        getMascotas(ciP)
        document.querySelector('#error-2').innerHTML = `<div class="alert alert-success" role="alert"> Mascotas encontradas </div>`

        //poner los campos en blanco
        document.querySelector('#metCi').value = ''
    }
})

function macho() {
    const macho = 'm'

    const getGender = async (macho) => {
        try {
            const { error, data } = await cliente.from('mascota').select('*').eq('gender', macho)
            if (error) throw new Error(error)
            console.log(data)
            document.querySelector('#genero').innerHTML = `
            <table class="table table-striped table-light">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha de Nacimiento</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Color</th>
                        <th scope="col">Fecha de Ingreso</th>
                        <th scope="col">Fecha de Salida</th>
                        <th scope="col">Código</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(mascota => `
                    <tr>
                        <td>${mascota.nameM}</td>
                        <td>${mascota.typeM}</td>
                        <td>${mascota.firstDate}</td>
                        <td>${mascota.gender}</td>
                        <td>${mascota.raza}</td>
                        <td>${mascota.color}</td>
                        <td>${mascota.dateIn}</td>
                        <td>${mascota.dateOut}</td>
                        <td>${mascota.codigoM}</td>
                    </tr>`)}
                </tbody>
            `
        } catch (error) {
            console.log(error)
        }
    }
    getGender(macho)
}

function hembra() {
    const hembra = 'f'

    const getGender = async (hembra) => {
        try {
            const { error, data } = await cliente.from('mascota').select('*').eq('gender', hembra)
            if (error) throw new Error(error)
            console.log(data)
            document.querySelector('#genero').innerHTML = `
            <table class="table table-striped table-light">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha de Nacimiento</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Color</th>
                        <th scope="col">Fecha de Ingreso</th>
                        <th scope="col">Fecha de Salida</th>
                        <th scope="col">Código</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(mascota => `
                    <tr>
                        <td>${mascota.nameM}</td>
                        <td>${mascota.typeM}</td>
                        <td>${mascota.firstDate}</td>
                        <td>${mascota.gender}</td>
                        <td>${mascota.raza}</td>
                        <td>${mascota.color}</td>
                        <td>${mascota.dateIn}</td>
                        <td>${mascota.dateOut}</td>
                        <td>${mascota.codigoM}</td>
                    </tr>`)}
                </tbody>
            `
        } catch (error) {
            console.log(error)
        }
    }
    getGender(hembra)
}


const cli = document.querySelector('#cliente')

cli.addEventListener('submit', (e) => {
    e.preventDefault();

    const ciCli = document.querySelector('#ciCliente').value
    console.log(ciCli)

    if(isNaN(ciCli)){
        document.querySelector('#error-1').innerHTML = `<div class="alert alert-danger" role="alert">Solo se permiten números</div>`
    }
    else if(ciCli == ''){
        document.querySelector('#error-1').innerHTML = `<div class="alert alert-danger" role="alert">Campo vacío</div>`
    }
    else{
        const getClient = async (ciCli) => {
            try {
                const { error, data } = await cliente.from('cliente').select('*').eq('ci', ciCli)
                if (error) throw new Error(error)
                console.log(data)
                document.querySelector('#contenidoCL').innerHTML = `
                <table class="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope="col">Cedula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(cliente => `
                        <tr>
                            <td>${cliente.ci}</td>
                            <td>${cliente.name}</td>
                            <td>${cliente.lastName}</td>
                            <td>${cliente.address}</td>
                            <td>${cliente.phone}</td>
                        </tr>`)}
                    </tbody>
                </table>
                `
            } catch (error) {
                console.log(error)
            }
        }
        getClient(ciCli)
        document.querySelector('#error-1').innerHTML = `<div class="alert alert-success" role="alert">Cliente encontrado</div>`

        //poner en blanco los campos de la busqueda de cliente
        document.querySelector('#ciCliente').value = ''
    }
})

function getAllCli() {

    const getAllC = async () => {
        try {
            const { error, data } = await cliente.from('cliente').select('*')
            if (error) throw new Error(error)
            console.log(data)
            document.querySelector('#contenidoCL').innerHTML = `
            <table class="table table-striped table-light">
                <thead>
                    <tr>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(cliente => `
                    <tr>
                        <td>${cliente.ci}</td>
                        <td>${cliente.name}</td>
                        <td>${cliente.lastName}</td>
                        <td>${cliente.address}</td>
                        <td>${cliente.phone}</td>
                    </tr>`)}
                </tbody>
            </table>
            `
        } catch (error) {
            console.log(error)
        }
    }
    getAllC()
}

function total() {

    var costoTotal = 0
    var costoTotal1 = 0
    var costoTotal2 = 0

    function valor(costoTotal) {
        if (document.querySelector('#baño0').checked) {
            costoTotal += 25
        }
        if (document.querySelector('#baño1').checked) {
            costoTotal += 20
        }
        if (document.querySelector('#baño2').checked) {
            costoTotal += 15
        }
        return costoTotal
    }

    function valor1(costoTotal1) {
        if (document.querySelector('#vacuna0').checked) {
            costoTotal1 += 5
        }
        if (document.querySelector('#vacuna1').checked) {
            costoTotal1 += 8
        }
        if (document.querySelector('#vacuna2').checked) {
            costoTotal1 += 10
        }
        return costoTotal1
    }

    function valor2(costoTotal2) {
        if (document.querySelector('#corte0').checked) {
            costoTotal2 += 10
        }
        if (document.querySelector('#corte1').checked) {
            costoTotal2 += 15
        }
        if (document.querySelector('#corte2').checked) {
            costoTotal2 += 20
        }
        if (document.querySelector('#corte3').checked) {
            costoTotal2 += 25
        }
        if (document.querySelector('#corte4').checked) {
            costoTotal2 += 30
        }
        if (document.querySelector('#corte5').checked) {
            costoTotal2 += 35
        }
        return costoTotal2
    }

    var val0 = valor(costoTotal)
    var val1 = valor1(costoTotal1)
    var val2 = valor2(costoTotal2)
    var total = val0 + val1 + val2

    console.log(total)
    document.querySelector('#total').innerHTML = `El valor Total a pagar es: $${total}`
    document.querySelector('#correcto').innerHTML = `<div class="alert alert-success" role="alert">Servicio agendado correctamente</div>`
}