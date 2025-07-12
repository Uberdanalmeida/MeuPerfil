function MeusProjetos() {
    const GitHub = 'https://api.github.com/users/Uberdanalmeida/repos';
    const carregamento = document.getElementById('carregar');
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Limpa a mensagem de "Carregando Projetos" e qualquer conteúdo anterior

    fetch(GitHub, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        carregamento.style.display = 'none'; // Esconde a mensagem de carregamento

        if (Array.isArray(data)) {
            const allProjects = data; // Todos os projetos
            const initialProjectsToShow = 6;
            let projectsShown = 0; // Contador de projetos exibidos

            // Função para exibir os projetos
            const displayProjects = (projectsToDisplay) => {
                projectsToDisplay.forEach(repo => {
                    const link = document.createElement('a');
                    link.href = repo.html_url;
                    link.target = '_blank';
                    link.classList.add('projeto-item');

                    const imagem = document.createElement('img');
                    imagem.src = `imagens-projetos/${repo.name}.png`;
                    imagem.alt = `Imagem do projeto ${repo.name}`;
                    imagem.classList.add('projeto-imagem');

                    const nomeProjeto = document.createElement('h3');
                    nomeProjeto.textContent = repo.name;
                    nomeProjeto.classList.add('projeto-nome');

                    link.appendChild(imagem);
                    link.appendChild(nomeProjeto);

                    projectsContainer.appendChild(link);
                });
            };

            // Exibe os primeiros 6 projetos
            displayProjects(allProjects.slice(0, initialProjectsToShow));
            projectsShown = initialProjectsToShow;

            // Cria o botão "Mostrar Mais" se houver mais projetos
            if (allProjects.length > initialProjectsToShow) {
                const showMoreButton = document.createElement('button');
                showMoreButton.textContent = 'Mostrar Mais Projetos';
                showMoreButton.classList.add('show-more-btn');
                
                // Adiciona o botão ao final da seção de projetos (ou onde desejar)
                document.getElementById('MeusProjetos').appendChild(showMoreButton);

                showMoreButton.addEventListener('click', () => {
                    // Exibe o restante dos projetos
                    displayProjects(allProjects.slice(projectsShown));
                    showMoreButton.style.display = 'none'; // Esconde o botão após exibir todos
                });
            }

        } else {
            console.log("Erro: os dados retornados não são um array.");
            projectsContainer.textContent = "Erro ao carregar os projetos.";
        }
    })
    .catch((e) => {
        console.log(e);
        carregamento.style.display = 'none'; // Esconde a mensagem de carregamento em caso de erro
        projectsContainer.textContent = "Erro ao conectar com o GitHub.";
    });
}

MeusProjetos();