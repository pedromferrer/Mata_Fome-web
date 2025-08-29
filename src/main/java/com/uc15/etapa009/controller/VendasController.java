package com.uc15.etapa009.controller;

import com.uc15.etapa009.service.VendaItem;
import com.uc15.etapa009.data.VendasEntity;
import com.uc15.etapa009.service.VendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendas")
public class VendasController {

    @Autowired
    private VendasService vendasService;

    @PostMapping
    public ResponseEntity<VendasEntity> realizarVenda(@RequestBody List<VendaItem> itensVenda) {
        VendasEntity venda = vendasService.realizarVenda(itensVenda);
        return ResponseEntity.ok(venda);
    }

    @GetMapping
    public ResponseEntity<List<VendasEntity>> listarVendas() {
        List<VendasEntity> vendas = vendasService.listarVendas(); // Supondo que você tenha um método para listar as vendas
        return ResponseEntity.ok(vendas); // Retorna um ResponseEntity contendo a lista de vendas
    }
}
