document.addEventListener('DOMContentLoaded', () => {
    console.log('Script do carrinho iniciado');
    
    try {
        // Carregar carrinho do localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Atualizar total
        let total = carrinho.reduce((acc, item) => {
            const precoNum = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
            return acc + precoNum;
        }, 0);
        
        const totalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(total);
        
        // Atualizar elementos do DOM
        document.getElementById('carrinho-total').textContent = totalFormatado;
        
        // Atualizar itens do carrinho
        const carrinhoItens = document.getElementById('carrinho-itens');
        carrinhoItens.innerHTML = '';
        
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <h3>${item.nome}</h3>
                <p>${item.preco}</p>
                <button onclick="removerItem('${item.nome}')" class="btn-danger">Remover</button>
            `;
            carrinhoItens.appendChild(itemElement);
        });
        
        console.log('Carrinho atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
});

// Função para remover item
function removerItem(nome) {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(item => item.nome !== nome);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        window.location.reload();
    } catch (error) {
        console.error('Erro ao remover item:', error);
    }
}

// Função para finalizar compra
function finalizarCompra() {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        localStorage.removeItem('carrinho');
        alert('Compra finalizada com sucesso!');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
    }
}
