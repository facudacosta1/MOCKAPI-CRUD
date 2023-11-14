let URL_API = 'https://6552b7045449cfda0f2dc259.mockapi.io/users';

document.addEventListener('DOMContentLoaded', function (e) {
    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            console.log('data lista');
        })
        .catch(error => {
            console.error('Error al obtener todos los registros:', error);
        });

})


let btnGet1 = document.getElementById('btnGet1');
let results = document.getElementById('results');

btnGet1.addEventListener('click', function (e) {
    let id = document.getElementById('inputGet1Id').value;
    mostrarData(id);
})


//Muestra la data obtenida del fetch si se agrego el id o si no existe el id
function mostrarData(id){
    if(!id){
        fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                results.innerHTML += `
                    <p class="p-0 m-0">ID: ${element.id}</p>
                    <p class="p-0 m-0">NAME: ${element.name}</p>
                    <p class="p-0 m-0">LASTNAME: ${element.lastname}</p>
                `
            });            
        })

    } else {
        fetch(URL_API + '/' + id)
        .then(response => response.json())
        .then(data => {
            results.innerHTML = `
                <p class="p-0 m-0">ID: ${data.id}</p>
                <p class="p-0 m-0">NAME: ${data.name}</p>
                <p class="p-0 m-0">LASTNAME: ${data.lastname}</p>
            `
        })
    }
    
}