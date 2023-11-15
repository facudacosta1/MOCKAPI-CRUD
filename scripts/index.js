                                            //---------------------------------------//
//                                                              FUNCIONES
                                            //---------------------------------------//

// URL DE LA API Y SELECTOR DEL CONTENEDOR DEL RESULTADO
let URL_API = 'https://6554112c63cafc694fe61e6e.mockapi.io/users';
let results = document.getElementById('results');

//CREATE : POST ENVIA LOS DATOS AL SERVIDOR, PRIMERO TOMA LOS VALORES DE LOS INPUT Y LOS TRANSFORMA EN UN OBJETO
async function enviarData() {
    try {
        let nombre = document.getElementById('inputPostNombre').value;
        let apellido = document.getElementById('inputPostApellido').value;

        let data = {
            name: nombre,
            lastname: apellido
        };

        const response = await fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        mostrarData() //Llama a la función para mostrar los datos

    } catch (error) {
        console.log(error);
    }
}

//READ : GET OBTIENE TODOS LOS DATOS O UNO EN ESPECIFICO POR ID
async function mostrarData(id) {
    try {
        if (!id) {
            const response = await fetch(URL_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            results.innerHTML = '';
            data.forEach(element => {
                results.innerHTML += `
                    <p class="p-0 m-0">ID: ${element.id}</p>
                    <p class="p-0 m-0">NAME: ${element.name}</p>
                    <p class="p-0 m-0">LASTNAME: ${element.lastname}</p>
                `;
            });

            return data;
        } else {
            verifyIDandGetDataID(id) //VERIFICA SI EXISTE EL ID EN LA BASE DE DATOS
            .then (data => {
                if(data.id === undefined){
                    results.innerHTML = ''; //Si no existe borra contenedor results
                    return
                } else {                    //Si existe muestra los datos del id
                    results.innerHTML = '';
                    results.innerHTML += `
                        <p class="p-0 m-0">ID: ${data.id}</p>
                        <p class="p-0 m-0">NAME: ${data.name}</p>
                        <p class="p-0 m-0">LASTNAME: ${data.lastname}</p>
                    `
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
    
}

//FUNCION PARA VERIFICAR SI EXISTE UN ID EN LA BASE DE DATOS Y RETORNA LOS DATOS SI EXISTEN
async function verifyIDandGetDataID(id){
    try{
        const response = await fetch(URL_API + '/' + id);
        if(!response.ok){
            alert('No se encontró el ID');
            return false;
        }
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

//UPDATE : PUT EDITA LOS DATOS, PRIMERO TOMA LOS VALORES DE LOS INPUT Y LOS TRANSFORMA EN UN OBJETO, LUEGO MUESTRA LA DATA ACTUALIZADA
async function actualizarData() {
    let inputPutId = document.getElementById('inputPutId').value;
    let inputPutNombre = document.getElementById('inputPutNombre').value;
    let inputPutApellido = document.getElementById('inputPutApellido').value;

    let data = {
        name: inputPutNombre,
        lastname: inputPutApellido
    };

    const response = await fetch(URL_API + '/' + inputPutId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    mostrarData();
}

//DELETE : DELETE BORRA LOS DATOS
async function borrarData(id) {
    const response = await fetch(URL_API + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    mostrarData();
}

//Rellena los campos del modal con la data obtenida
function rellenarCampos(name, lastname) {
    let inputPutNombre = document.getElementById('inputPutNombre');
    let inputPutApellido = document.getElementById('inputPutApellido');
    inputPutNombre.value = name;
    inputPutApellido.value = lastname;
}

                                            //---------------------------------------//
//                                                              EVENTOS
                                            //---------------------------------------//

//A los botones

//ENVIAR DATOS                                                                 
let btnPost = document.getElementById('btnPost');

btnPost.addEventListener('click', function (e) {
    enviarData();
});

//BUSCAR DATOS
let btnGet1 = document.getElementById('btnGet1');

btnGet1.addEventListener('click', function (e) {
    let id = document.getElementById('inputGet1Id').value;
    mostrarData(id);
})

//ABRIR MODAL Y RELLENAR DATOS
let btnPut = document.getElementById('btnPut');
let btnSendChanges = document.getElementById('btnSendChanges');

btnPut.addEventListener('click', async function (e) {
    let inputPutId = document.getElementById('inputPutId').value;
    let data = await verifyIDandGetDataID(inputPutId);
    if (data !== false) {
        rellenarCampos(data.name, data.lastname);
        let dataModal = new bootstrap.Modal(document.getElementById('dataModal'));
        dataModal.show();
    } else {
        results.innerHTML = '';
    }
});

//ENVIAR MODIFICACIÓN: realiza fetch put
btnSendChanges.addEventListener('click', function (e) {
    let dataModal = bootstrap.Modal.getInstance(document.getElementById('dataModal'));
    dataModal.hide();
    actualizarData();
})

//BORRAR DATOS
let btnDelete = document.getElementById('btnDelete');

btnDelete.addEventListener('click', function (e) {
    let id = document.getElementById('inputDelete').value;
    verifyIDandGetDataID(id)
        .then(data => {
            if (data !== false) {
                borrarData(id);
                mostrarData();
            } else {
                results.innerHTML = '';
            }
        })
        .catch(error => {
            console.log(error);
        });
});

// EVENTO ACTIVAR BTN AGREGAR

let inputPostNombre = document.getElementById('inputPostNombre');
let inputPostApellido = document.getElementById('inputPostApellido');
let inputsPost = document.getElementsByClassName('inputPost');

Array.from(inputsPost).forEach(input => {
    input.addEventListener('input', () => {
        if (inputPostNombre.value !== '' && inputPostApellido.value !== '') {
            btnPost.disabled = false;
        } else {
            btnPost.disabled = true;
        }
    });
});

//EVENTO ACTIVAR BTN MODIFICAR

let inputPutId = document.getElementById('inputPutId');

inputPutId.addEventListener('input', () => {
    if (inputPutId.value !== '') {
        btnPut.disabled = false;
    } else {
        btnPut.disabled = true;
    }
})

let inputDelete = document.getElementById('inputDelete');

inputDelete.addEventListener('input', () => {
    if (inputDelete.value !== '') {
        btnDelete.disabled = false;
    } else {
        btnDelete.disabled = true;
    }
})