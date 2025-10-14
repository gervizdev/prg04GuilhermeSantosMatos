function loadHeader() {
    // Detecta em qual pasta a página atual está
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    
    // Define o caminho base baseado na localização
    const basePath = isInPages ? '../' : '';
    const headerPath = isInPages ? '../components/header.html' : 'components/header.html';

    console.log('Tentando carregar:', headerPath);

    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('Header não encontrado');
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
            
            // Links do menu com caminhos dinâmicos
            const menuLinks = [
                { text: 'Início', href: `${basePath}index.html` },
                { text: 'Atividade 3', href: `${basePath}pages/atividade3.html` },
                { text: 'Atividade 4', href: `${basePath}pages/atividade4.html` },
                { text: 'Atividade 5', href: `${basePath}pages/atividade5.html` }
            ];
            
            // Cria os links dinamicamente
            const navContainer = document.getElementById('nav-links');
            menuLinks.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                li.appendChild(a);
                navContainer.appendChild(li);
            });
            
            // Funcionalidade do botão tema
            document.getElementById('temaBtn').addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('dark-theme', isDark);
            });
            
            // Carrega preferência salva do tema
            if (localStorage.getItem('dark-theme') === 'true') {
                document.body.classList.add('dark-theme');
            }
        })
        .catch(error => console.error('Erro ao carregar header:', error));
}

// Carrega quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadHeader);