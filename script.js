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
  const container = document.getElementById("projects");
  container.innerHTML = "";

  todosOsProjetos.slice(0, projetosExibidos).forEach((repo) => {
    // 1. Tenta pegar a imagem padrão do GitHub
    let imageUrl = `https://raw.githubusercontent.com/Uberdanalmeida/${repo.name}/main/thumbnail.png`;

    // 2. Se o projeto tiver um site (homepage), usamos um serviço de captura de tela automático como plano B
    const fallbackImage = repo.homepage 
      ? `https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&embed=screenshot.url`
      : `https://placehold.co/600x400/16161a/00f2ff?text=${repo.name.replace(/-/g, "+")}`;

    const card = `
        <a href="${repo.html_url}" target="_blank" class="projeto-item">
            <div class="projeto-img-container" style="background: #16161a; height: 200px; overflow: hidden;">
                <img src="${imageUrl}" 
                     onerror="this.onerror=null; this.src='${fallbackImage}'" 
                     class="projeto-imagem" 
                     alt="${repo.name}"
                     style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="projeto-info">
                <h3 style="color: var(--text); margin-bottom: 5px; text-transform: capitalize;">
                    ${repo.name.replace(/-/g, " ")}
                </h3>
                <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 10px; height: 40px; overflow: hidden;">
                    ${repo.description || "Projeto Front-End desenvolvido por Uberdan Almeida."}
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