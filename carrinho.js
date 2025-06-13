document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');
    const finalizarCompra = document.getElementById('finalizar-compra');

    // Carregar carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        carrinhoItens.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const precoNum = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
            total += precoNum;

            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <h3>${item.nome}</h3>
                <p>${item.preco}</p>
                <button onclick="removerItem('${item.nome}')" class="btn-danger">Remover</button>
            `;
            carrinhoItens.appendChild(itemElement);
        });

        // Atualizar total
        const totalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(total);

        carrinhoTotal.textContent = totalFormatado;
    }

    // Função para remover item
    function removerItem(nome) {
        carrinho = carrinho.filter(item => item.nome !== nome);
        salvarCarrinho();
        atualizarCarrinho();
        mostrarNotificacao(`Item ${nome} removido do carrinho!`, 'success');
    }

    // Salvar carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Atualizar contador de itens no header
    function atualizarContador() {
        const itemCounter = document.querySelector('.item-count');
        itemCounter.textContent = carrinho.length;
    }

    // Inicializar carrinho
    atualizarCarrinho();
    atualizarContador();

    // Evento para finalizar compra
    finalizarCompra.addEventListener('click', () => {
        if (carrinho.length === 0) {
            mostrarNotificacao('Seu carrinho está vazio!', 'error');
            return;
        }

        // Aqui você pode adicionar a lógica para processar o pagamento
        mostrarNotificacao('Compra finalizada com sucesso!', 'success');
        carrinho = [];
        salvarCarrinho();
        atualizarCarrinho();
        atualizarContador();
    });
});
