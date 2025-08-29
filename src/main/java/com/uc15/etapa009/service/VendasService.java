package com.uc15.etapa009.service;

import com.uc15.etapa009.data.ProdutoEntity;
import com.uc15.etapa009.data.VendasEntity;
import com.uc15.etapa009.data.VendasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class VendasService {

    @Autowired
    private VendasRepository vendasRepository;

    @Autowired
    private ProdutoService produtoService; // Para manipular o estoque

@Transactional
public VendasEntity realizarVenda(List<VendaItem> itensVenda) {
    VendasEntity venda = new VendasEntity();
    venda.setDataVenda(LocalDateTime.now());

    BigDecimal valorTotal = BigDecimal.ZERO;
    List<String> produtosVendidos = new ArrayList<>(); // Lista para armazenar os produtos
    int quantidadeTotalVendida = 0; // Contador para a quantidade total

    for (VendaItem item : itensVenda) {
        // Buscar o produto
        ProdutoEntity produto = produtoService.getProdutoId(item.getProdutoId());
        if (produto == null) {
            throw new RuntimeException("Produto não encontrado com ID: " + item.getProdutoId());
        }

        // Definir o preço no VendaItem
        item.setPreco(BigDecimal.valueOf(produto.getPreco())); // Converter Double para BigDecimal

        // Vender e atualizar o estoque
        produtoService.venderProduto(item.getProdutoId(), item.getQuantidade());

        // Calcular valor total
        valorTotal = valorTotal.add(item.getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())));

        // Adicionar o nome do produto à lista de produtos vendidos
        produtosVendidos.add(produto.getNome());
        // Somar a quantidade vendida
        quantidadeTotalVendida += item.getQuantidade();
    }

    venda.setValorTotal(valorTotal);
    venda.setProdutos(produtosVendidos); // Definir a lista de produtos
    venda.setQuantidadeVendida(quantidadeTotalVendida); // Definir a quantidade total vendida

    return vendasRepository.save(venda);
}

    public List<VendasEntity> listarVendas() {
        return vendasRepository.findAll(); // Busca todas as vendas do banco de dados
    }
}
