package org.espe.revelo_categorias.clients;

import org.espe.revelo_categorias.models.Producto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "micro-productos", url = "localhost:8003/api/productos")
public interface ProductoClientRest {
    @GetMapping("/{id}")
    Producto findById(@PathVariable Long id);
    @GetMapping
    List<Producto> findAll();
    @PostMapping
    Producto save(Producto producto);
}
