package com.uc15.etapa009.controller;

import com.uc15.etapa009.data.ProdutoEntity;
import com.uc15.etapa009.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ProdutoEntity> adicionarProduto(@RequestBody ProdutoEntity produto) {
        ProdutoEntity novoProduto = produtoService.adicionarProduto(produto);
        return ResponseEntity.ok(novoProduto);
    }

    @PutMapping("/{id}/vender")
    public ResponseEntity<Void> venderProduto(@PathVariable int id, @RequestParam int quantidadeVendida) {
        produtoService.venderProduto(id, quantidadeVendida);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoEntity> atualizarProduto(@PathVariable Integer id, @RequestBody ProdutoEntity produtoRequest) {
        ProdutoEntity produtoAtualizado = produtoService.atualizarProduto(id, produtoRequest);
        return ResponseEntity.ok(produtoAtualizado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoEntity> getProdutoId(@PathVariable Integer id) {
        ProdutoEntity produto = produtoService.getProdutoId(id);
        return produto != null ? ResponseEntity.ok(produto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ProdutoEntity>> listarTodosProdutos() {
        List<ProdutoEntity> produtos = produtoService.listarTodosProdutos();
        return ResponseEntity.ok(produtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
        produtoService.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProdutoEntity>> buscarProdutoPorNome(@RequestParam String nome) {
        List<ProdutoEntity> produtos = produtoService.buscarProdutoPorNome(nome);
        return ResponseEntity.ok(produtos);
    }
}