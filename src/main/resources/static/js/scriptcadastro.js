document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const precoInput = document.getElementById("preco").value.trim();
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const mensagem = document.getElementById("mensagem");
    
    const preco = parseFloat(precoInput.replace(/,/g, "."));

    // Validações simples
    if (!nome) {
        mensagem.textContent = "❌ O nome do produto é obrigatório.";
        mensagem.style.color = "red";
        return;
    }
    if (isNaN(preco) || preco <= 0) {
        mensagem.textContent = "❌ Informe um preço válido.";
        mensagem.style.color = "red";
        return;
    }
    if (isNaN(quantidade) || quantidade < 0) {
        mensagem.textContent = "❌ Informe uma quantidade válida.";
        mensagem.style.color = "red";
        return;
    }

    // Objeto que será enviado para a API
    const produto = {
        nome: nome,
        preco: preco,
        qtdEstoque: quantidade
    };

    // Faz a requisição POST
    fetch("/api/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (response.ok) {
            mensagem.textContent = "✅ Produto cadastrado com sucesso!";
            mensagem.style.color = "green";
            document.getElementById("formCadastro").reset(); // limpa o form
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Erro ao cadastrar produto.");
            });
        }
    })
    .catch(error => {
        mensagem.textContent = "❌ " + error.message;
        mensagem.style.color = "red";
    });
});