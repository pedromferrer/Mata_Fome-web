package com.uc15.etapa009.service;

import java.math.BigDecimal;

public class VendaItem {

    private Integer produtoId;
    private Integer quantidade;
    private BigDecimal preco; // O preço do produto no momento da venda

    // Getters e Setters
    public Integer getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Integer produtoId) {
        this.produtoId = produtoId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
}
