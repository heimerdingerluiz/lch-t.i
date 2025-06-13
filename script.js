// Variáveis globais
let carrinho = [];
let itemCounter = document.querySelector('.item-count');

// Carregar carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar ao carrinho
document.querySelectorAll('.add-carrinho').forEach(button => {
    button.addEventListener('click', function () {
        const produto = this.parentElement;
        const nome = produto.querySelector('h3').textContent;
        const preco = produto.querySelector('p').textContent;
        
        carrinho.push({
            nome: nome,
            preco: preco
        });
        
        // Salvar carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        atualizarCarrinho();
        mostrarNotificacao(`Produto ${nome} adicionado ao carrinho!`, 'success');
    });
});

// Função para atualizar o carrinho
function atualizarCarrinho() {
    itemCounter.textContent = carrinho.length;
    
    // Atualizar total do carrinho
    const total = carrinho.reduce((acc, item) => {
        const precoNum = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
        return acc + precoNum;
    }, 0);
    
    const totalFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(total);
    
    document.querySelector('.carrinho-total').textContent = totalFormatado;
}

// Notificações
function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Menu Hamburguer
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu quando clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Formulário de agendamento
document.getElementById('agenda-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    mostrarNotificacao('Serviço agendado com sucesso! Entraremos em contato em breve.', 'success');
    e.target.reset();
});

// Animações de rolagem
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos que devem ser animados
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Efeito de fade-in para os produtos
window.addEventListener('load', function() {
    const produtos = document.querySelectorAll('.produto-card');
    produtos.forEach(produto => {
        produto.style.opacity = '0';
        produto.style.transition = 'opacity 0.5s ease-in';
        setTimeout(() => {
            produto.style.opacity = '1';
        }, 200);
    });
});

// Efeito de parallax no hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = `${window.scrollY / 2}px`;
});

// Animação de carregamento
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});;
