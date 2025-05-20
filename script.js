function MeusProjetos() {
    const GitHub = 'https://api.github.com/users/Uberdanalmeida/repos';
    let carregamento = document.getElementById('carregar');
    let mostrar = document.getElementById('projects');
    mostrar.innerHTML = ''; // Limpa a mensagem de "Carregando Projetos" e qualquer conteúdo anterior

    fetch(GitHub, {
        method: 'Get'
    })
    .then((response) => response.json())
    .then((data) => {
        carregamento.style.display = 'none';
        // Verifica se 'data' é um array
        if (Array.isArray(data)) {
            data.forEach(repo => {
                // Cria o link para o repositório
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.classList.add('projeto-item'); // Adiciona uma classe para estilização

                // Cria a imagem do projeto
                const imagem = document.createElement('img');
                imagem.src = `imagens-projetos/${repo.name}.png`; // Ajuste a extensão conforme necessário
                imagem.alt = `Imagem do projeto ${repo.name}`;
                imagem.classList.add('projeto-imagem');

                // Cria um elemento para o nome do projeto (opcional)
                const nomeProjeto = document.createElement('h3');
                nomeProjeto.textContent = repo.name;
                nomeProjeto.classList.add('projeto-nome');

                // Adiciona a imagem e o nome ao link
                link.appendChild(imagem);
                link.appendChild(nomeProjeto);

                // Adiciona o link ao container de projetos
                mostrar.appendChild(link);
            });
        } else {
            console.log("Erro: os dados retornados não são um array.");
            mostrar.textContent = "Erro ao carregar os projetos.";
        }
    })
    .catch((e) => {
        console.log(e);
        mostrar.textContent = "Erro ao conectar com o GitHub.";
    });
}

MeusProjetos();