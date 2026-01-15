const GITHUB_URL = 'https://api.github.com/users/Uberdanalmeida/repos';
let todosOsProjetos = [];
let projetosExibidos = 6;

async function fetchProjects() {
    const container = document.getElementById('projects');
    const loader = document.getElementById('loader');
    const section = document.getElementById('MeusProjetos');

    try {
        const response = await fetch(GITHUB_URL);
        todosOsProjetos = await response.json();
        
        loader.style.display = 'none';
        renderProjetos();

        // Se houver mais de 6 projetos, cria o botão
        if (todosOsProjetos.length > projetosExibidos) {
            const btnVerMais = document.createElement('button');
            btnVerMais.id = 'btn-ver-mais';
            btnVerMais.className = 'btn-secondary'; // Usa a classe de estilo que já criamos
            btnVerMais.style.display = 'block';
            btnVerMais.style.margin = '2rem auto';
            btnVerMais.textContent = 'Ver Todos os Projetos';
            
            btnVerMais.onclick = () => {
                projetosExibidos = todosOsProjetos.length; // Mostra tudo
                renderProjetos();
                btnVerMais.style.display = 'none'; // Esconde o botão após clicar
            };
            
            section.appendChild(btnVerMais);
        }
    } catch (error) {
        loader.textContent = "Erro ao carregar projetos.";
        console.error(error);
    }
}

function renderProjetos() {
    const container = document.getElementById('projects');
    container.innerHTML = ''; 

    todosOsProjetos.slice(0, projetosExibidos).forEach(repo => {
        const card = `
            <a href="${repo.html_url}" target="_blank" class="projeto-item">
                <img src="https://raw.githubusercontent.com/Uberdanalmeida/${repo.name}/main/thumbnail.png" 
                     onerror="this.src='https://via.placeholder.com/400x250/16161a/00f2ff?text=Projeto+Front-End'" 
                     class="projeto-imagem">
                <div class="projeto-info">
                    <h3 style="color: var(--text); margin-bottom: 5px;">${repo.name.replace(/-/g, ' ')}</h3>
                    <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 10px;">
                        ${repo.description || 'Projeto desenvolvido com foco em performance e UI.'}
                    </p>
                    <span class="projeto-link">Explorar Código →</span>
                </div>
            </a>
        `;
        container.innerHTML += card;
    });
}
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        header.style.background = 'rgba(10, 10, 12, 0.95)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(10, 10, 12, 0.85)';
    }
});

fetchProjects();