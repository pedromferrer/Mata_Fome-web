// scriptlistar.js

// Função para carregar os produtos da API
function carregarProdutos() {
    fetch("/api/produtos")
        .then(response => response.json())
        .then(produtos => {
            const tbody = document.querySelector("#tabela-produtos tbody");
            tbody.innerHTML = ""; // limpa antes de preencher

            produtos.forEach(produto => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
                    <td>${produto.qtdEstoque}</td>
                `;

                // clique para selecionar a linha
                tr.addEventListener("click", () => {
                    const linhas = tbody.querySelectorAll("tr");
                    linhas.forEach(l => l.classList.remove("selected"));
                    tr.classList.add("selected");
                });

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

// Função para aplicar filtro dinâmico
function aplicarFiltro() {
    const filtro = document.getElementById("filtro").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabela-produtos tbody tr");

    linhas.forEach(linha => {
        const nome = linha.cells[1].innerText.toLowerCase(); // coluna Nome
        const id = linha.cells[0].innerText.toLowerCase();   // coluna Id
        const valor = linha.cells[2].innerText.toLowerCase(); // coluna Valor

        // se qualquer campo contiver o texto digitado, mantém visível
        if (nome.includes(filtro) || id.includes(filtro) || valor.includes(filtro)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}

// Botão excluir
document.getElementById("btn-excluir").addEventListener("click", () => {
    const selectedRow = document.querySelector("#tabela-produtos tbody tr.selected");

    if (!selectedRow) {
        alert("Selecione um produto para excluir!");
        return;
    }

    const id = selectedRow.cells[0].innerText;

    if (confirm(`Tem certeza que deseja excluir o produto ID ${id}?`)) {
        fetch(`/api/produtos/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Produto excluído com sucesso!");
                // remove a linha direto da tabela sem recarregar tudo
                selectedRow.remove();
            } else {
                alert("Erro ao excluir produto.");
            }
        })
        .catch(error => console.error("Erro:", error));
    }
});

// Botão editar
document.getElementById("btnEditar").addEventListener("click", () => {
    const selectedRow = document.querySelector("#tabela-produtos tbody tr.selected");

    if (!selectedRow) {
        alert("Selecione um produto para editar!");
        return;
    }

    const id = selectedRow.cells[0].innerText;

    // Redireciona para a página de edição com o ID na URL
    window.location.href = `editar.html?id=${id}`;
});

// Escuta o campo de filtro
document.getElementById("filtro").addEventListener("keyup", aplicarFiltro);

// Carregar produtos ao abrir a página
carregarProdutos();