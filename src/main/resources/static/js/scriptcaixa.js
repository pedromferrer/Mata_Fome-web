// scriptcaixa.js

let carrinho = [];

// Função para buscar produtos
document.getElementById('btnSearch').addEventListener('click', function() {
    const nomeProduto = document.getElementById('search').value;

    fetch(`/api/produtos/buscar?nome=${nomeProduto}`)
        .then(response => response.json())
        .then(produtos => {
            const tbody = document.getElementById('table-produtos').querySelector('tbody');
            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos produtos

            produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.preco}</td> <!-- Trocar 'valor' para 'preco' -->
                    <td>${produto.qtdEstoque}</td>
                `;
                // Adicionando o evento de clique para selecionar a linha
                tr.addEventListener('click', function() {
                    // Remove a seleção de outras linhas
                    const rows = tbody.querySelectorAll('tr');
                    rows.forEach(r => r.classList.remove('selected'));
                    // Adiciona a classe 'selected' à linha clicada
                    tr.classList.add('selected');
                });
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
});

// Função para adicionar produto ao carrinho
document.getElementById('btnAdd').addEventListener('click', function() {
    const selectedRow = document.querySelector('#table-produtos tbody tr.selected');

    // Log para verificar se uma linha foi selecionada
    console.log('Linha selecionada:', selectedRow);

    if (!selectedRow) {
        alert('Selecione um produto para adicionar ao carrinho.');
        return;
    }

    const id = selectedRow.cells[0].innerText;
    const nome = selectedRow.cells[1].innerText;
    const preco = selectedRow.cells[2].innerText; // Trocar 'valor' para 'preco'

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade++; // Aumenta a quantidade se já estiver no carrinho
    } else {
        // Adiciona ao carrinho
        carrinho.push({ id, nome, preco: parseFloat(preco), quantidade: 1 });
    }

    atualizarCarrinho();
    atualizarValorTotal();
});

// Função para atualizar o carrinho na tabela
function atualizarCarrinho() {
    const tbody = document.getElementById('table-carrinho').querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos itens

    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.preco}</td>
            <td>${item.quantidade}</td>
        `;
        // Adicionando o evento de clique para selecionar a linha do carrinho
        tr.addEventListener('click', function() {
            // Remove a seleção de outras linhas
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(r => r.classList.remove('selected'));
            // Adiciona a classe 'selected' à linha clicada
            tr.classList.add('selected');
        });
        tbody.appendChild(tr);
    });
}

// Função para cancelar o carrinho
document.getElementById('btnCancel').addEventListener('click', function() {
    carrinho = [];
    atualizarCarrinho();
    atualizarValorTotal();
});

// Função para remover um item do carrinho
document.getElementById('btnRemove').addEventListener('click', function() {
    const selectedRows = document.querySelectorAll('#table-carrinho tbody tr.selected');
    selectedRows.forEach(row => {
        const id = row.cells[0].innerText;
        carrinho = carrinho.filter(item => item.id !== id);
    });
    atualizarCarrinho();
    atualizarValorTotal();
});

// Função para calcular total
function calcularTotal() {
    return carrinho.reduce((acc, item) => acc + (parseFloat(item.preco) * item.quantidade), 0);
}

// Função para atualizar o valor total exibido
function atualizarValorTotal() {
    const total = calcularTotal();
    document.getElementById('valorTotal').innerText = `R$ ${total.toFixed(2)}`; // Formata para duas casas decimais
}

// Função para finalizar a venda
document.getElementById('btnFinish').addEventListener('click', function() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione itens antes de finalizar a venda.');
        return;
    }

    // Construindo o objeto de venda com um array de VendaItem
    const venda = carrinho.map(item => ({
        produtoId: item.id,    // Supondo que `item.id` representa o ID do produto
        quantidade: item.quantidade // Supondo que `item.quantidade` representa a quantidade
    }));

    console.log(venda); // Para verificar a estrutura que está sendo enviada

    fetch('/api/vendas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venda) // Enviando um array de VendaItem
    })
    .then(response => {
        return response.json().then(data => {
            if (response.ok) {
                alert('Venda finalizada com sucesso!');
                carrinho = []; // Limpa o carrinho após finalizar
                atualizarCarrinho();
                atualizarValorTotal();
            } else {
                console.error('Erro:', data);
                alert('Erro ao finalizar a venda: ' + data.message); // Mensagem de erro da API
            }
        });
    })
    .catch(error => console.error('Erro ao finalizar a venda:', error));
});

atualizarValorTotal();