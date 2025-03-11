let amigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();
    
    // Confirmar que el nombre tenga solo letras, espacios y acentos
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!soloLetras.test(nombre)) {
        alert('Por favor, ingresa solo letras (puedes usar espacios y acentos)');
        return;
    }
    
    // Confirmar que el nombre no esté vacío y no se repita
    if (nombre === '') {
        alert('Por favor, escribe un nombre válido');
        return;
    }
    
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista');
        return;
    }
    
    
    amigos.push(nombre);
    actualizarListaAmigos();
    
    input.value = '';
}


function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar la lista actual
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Botón para eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            amigos.splice(index, 1);
            actualizarListaAmigos();
        };
        
        li.appendChild(deleteBtn);
        lista.appendChild(li);
    });
}

// Función para mezclar el array (algoritmo de ordenamiento)
function mezclarArray(array) {
    let nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}

// Función para realizar sorteo y mostrando un resultado
function sortearAmigo() {
    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = ''; // Para limpiar resultados
    
   
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para el sorteo');
        return;
    }
    
    // Mezclar amigos
    let asignaciones = mezclarArray(amigos);
    while (asignaciones.some((persona, index) => persona === amigos[index])) {
        asignaciones = mezclarArray(amigos);
    }
    
    
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = asignaciones[indiceAleatorio];
    
    // Mostrar un resultado
    const li = document.createElement('li');
    li.textContent = `Tu amigo secreto es: ${amigoSecreto}`;
    resultadoLista.appendChild(li);
    
    
    document.getElementById('button-restart').style.display = 'inline-block';
    document.querySelector('.button-draw').style.display = 'none';
}


function reiniciar() {
    
    amigos = [];
    
    // Limpiar las listas
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    
    
    document.querySelector('.button-draw').style.display = 'flex';
    document.getElementById('button-restart').style.display = 'none';
    
    document.getElementById('amigo').value = '';
}

// Agregar amigos con la tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});