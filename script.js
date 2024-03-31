function MeusProjetos() {
    const GitHub = 'https://api.github.com/users/Uberdanalmeida/repos'
    let carregamento = document.getElementById('carregar')

    fetch(GitHub, {
        method: 'Get'
    }) 

    .then((response) => response.json())
    .then((response) => { 
        carregamento.style.display= 'none'
         Projetos(response)
    })

    .catch((e) => {
        console.log(e)
    })
}

function Projetos(data) {
    let mostrar = document.getElementById('projects');

    // Verifica se 'data' é um array
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            let a = document.createElement("a");
            a.href = data[i]['clone_url'];
            a.target = '_blank';
            let text = document.createTextNode(data[i]['name']);
            a.appendChild(text);
            mostrar.appendChild(a);
        }
    } else {
        console.log("Erro: os dados retornados não são um array.");
    }
}

MeusProjetos()