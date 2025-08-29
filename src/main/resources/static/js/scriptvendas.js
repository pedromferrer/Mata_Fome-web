document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabela-vendas");

    // URL do endpoint de vendas
    const API_URL = "http://localhost:8080/api/vendas"; // ajuste se necessário

    // Função para formatar data
    function formatarData(isoString) {
        const data = new Date(isoString);
        return data.toLocaleString("pt-BR"); // dd/mm/yyyy hh:mm:ss
    }

    // Buscar vendas
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar vendas.");
            }
            return response.json();
        })
        .then(vendas => {
            tabela.innerHTML = ""; // limpa antes de preencher

            if (vendas.length === 0) {
                tabela.innerHTML = `<tr><td colspan="5">Nenhuma venda registrada.</td></tr>`;
                return;
            }

            vendas.forEach(venda => {
                const row = document.createElement("tr");

                // lista de produtos → transforma em string separada por vírgula
                const produtosLista = venda.produtos ? venda.produtos.join(", ") : "-";

                row.innerHTML = `
                    <td>${venda.id}</td>
                    <td>${formatarData(venda.dataVenda)}</td>
                    <td>${produtosLista}</td>
                    <td>${venda.quantidadeVendida}</td>
                    <td>R$ ${venda.valorTotal.toFixed(2)}</td>
                `;

                tabela.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            tabela.innerHTML = `<tr><td colspan="5">Erro ao carregar vendas.</td></tr>`;
        });
});
