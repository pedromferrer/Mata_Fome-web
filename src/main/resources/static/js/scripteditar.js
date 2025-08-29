// Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Busca os dados do produto na API
fetch(`/api/produtos/${id}`)
    .then(response => response.json())
    .then(produto => {
        document.getElementById("id").value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("qtdEstoque").value = produto.qtdEstoque;
    })
    .catch(error => console.error("Erro ao buscar produto:", error));

// Submeter edição
document.getElementById("form-editar").addEventListener("submit", (e) => {
    e.preventDefault();

    const produtoAtualizado = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtdEstoque: parseInt(document.getElementById("qtdEstoque").value)
    };

    fetch(`/api/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(response => {
        if (response.ok) {
            alert("Produto atualizado com sucesso!");
            window.location.href = "listar-produtos.html"; // volta pra listagem
        } else {
            alert("Erro ao atualizar produto.");
        }
    })
    .catch(error => console.error("Erro:", error));
});
