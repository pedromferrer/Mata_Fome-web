package com.uc15.etapa009.service;

import com.uc15.etapa009.data.ProdutoEntity;
import com.uc15.etapa009.data.ProdutoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public ProdutoEntity adicionarProduto(ProdutoEntity prod) {
        prod.setId(null);
        produtoRepository.save(prod);
        return prod;
    }

    @Transactional
    public void venderProduto(int id, int quantidadeVendida) {
        if (quantidadeVendida <= 0) {
            throw new IllegalArgumentException("A quantidade vendida deve ser maior que zero.");
        }

        ProdutoEntity produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        int novaQuantidade = produto.getQtdEstoque() - quantidadeVendida;

        if (novaQuantidade < 0) {
            throw new RuntimeException("Estoque insuficiente.");
        }
        produto.setQtdEstoque(novaQuantidade);
        produtoRepository.save(produto);
    }

    public ProdutoEntity atualizarProduto(Integer prodId, ProdutoEntity produtoRequest) {
        ProdutoEntity func = getProdutoId(prodId);
        if (func != null) {
            func.setNome(produtoRequest.getNome());
            func.setPreco(produtoRequest.getPreco());
            func.setQtdEstoque(produtoRequest.getQtdEstoque());
            produtoRepository.save(func);
        }
        return func;
    }

    public ProdutoEntity getProdutoId(Integer prodId) {
        return produtoRepository.findById(prodId).orElse(null);
    }

    public List<ProdutoEntity> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    public void deletarProduto(Integer funcId) {
        ProdutoEntity func = getProdutoId(funcId);
        if (func != null) {
            produtoRepository.deleteById(func.getId());
        }
    }

    public List<ProdutoEntity> buscarProdutoPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }
}
