document.addEventListener("DOMContentLoaded", () => {
    const inputBuscaValor = document.getElementById('nomeTimeInput')
    const formulario = document.querySelector('form')
    let p = document.createElement("p");

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        buscarTime(inputBuscaValor.value)
    })
})


async function buscarTime(input) {
    const endpoint = `https://api-football-v1.p.rapidapi.com/v3/teams?search=${input}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9488701202msh7699add9724bb43p1b1aabjsn330d6facbc9a',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    try {
        const busca = await fetch(endpoint, options);
        const result = await busca.json();
        console.log(result.response);
        criarLista(result.response);
    } catch (error) {
        console.error(error);
    }
}

function criarLista(arrayTimes) {
    const listaHtml = document.getElementById('listaTimes')
    if (arrayTimes.length == 0) {
        listaHtml.innerHTML =
            `<li class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 h6">Nada foi encontrado...</h5>
            </div>
        </li>`
    }
    else {
        listaHtml.innerHTML = criacaoLista(arrayTimes)
    }
}

function criacaoLista(array) {
    const lista = array.map((item) => {
        return (`<li class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-start align-items-center">
            <img src=${item.team.logo} alt="logo time" style="width: 60px; height: 60px;">
            <h5 class="mb-1 ms-3 h5">${item.team.name}</h5>
        </div>
        <p class="mb-1">País: ${item.team.country}</p>
        <small class="text-body-secondary">${item.team.code}</small>
        </li>`)
    })
    return lista.join("")
}

async function play() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9488701202msh7699add9724bb43p1b1aabjsn330d6facbc9a',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const ligas = result.response;
        // console.log(ligas[0].league);
        filtraBrasileiras(ligas)
    } catch (error) {
        console.error(error);
    } finally {
        console.log("fim")
    }
}

function filtraBrasileiras(ligas) {
    const ligas_filtradas = ligas.filter(liga => liga.league.name.includes("Serie A"))
    return console.log(ligas_filtradas);
}

// play()

