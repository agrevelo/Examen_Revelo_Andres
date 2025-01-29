package org.espe.revelo_categorias.controllers;

import org.espe.revelo_categorias.models.Producto;
import org.espe.revelo_categorias.models.entities.Categoria;
import org.espe.revelo_categorias.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // Obtener todas las categorías
    @GetMapping
    public ResponseEntity<List<Categoria>> findAll() {
        List<Categoria> categorias = categoriaService.findAll();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }

    // Buscar una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> findById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        return categoria.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear una nueva categoría
    @PostMapping
    public ResponseEntity<Object> save(@RequestBody Categoria categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("Error", "El nombre de la categoría es obligatorio."));
        }
        Categoria nuevaCategoria = categoriaService.save(categoria);
        return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
    }

    // Actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Categoria categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("Error", "El nombre de la categoría es obligatorio."));
        }

        Optional<Categoria> categoriaExistente = categoriaService.findById(id);
        if (categoriaExistente.isPresent()) {
            categoria.setId(id);
            Categoria categoriaActualizada = categoriaService.save(categoria);
            return new ResponseEntity<>(categoriaActualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una categoría por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        Optional<Categoria> categoriaExistente = categoriaService.findById(id);
        if (categoriaExistente.isPresent()) {
            categoriaService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Agregar un producto a una categoría
    @PostMapping("/{id}/productos")
    public ResponseEntity<?> agregarProducto(@RequestBody Producto producto, @PathVariable Long id) {
        Optional<Producto> optional;
        try {
            optional = categoriaService.addProducto(producto, id);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("Error", "Producto o categoría no encontrada. " + ex.getMessage()));
        }
        return optional.map(value -> ResponseEntity.status(HttpStatus.CREATED).body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/productos")
    public ResponseEntity<List<Producto>> findProductosByCategoriaId(@PathVariable Long id) {
        List<Producto> productos = categoriaService.findProductosByCategoriaId(id);
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    // Eliminar un producto de una categoría
    @DeleteMapping("/{categoriaId}/productos/{productoId}")
    public ResponseEntity<String> removeProducto(@PathVariable Long categoriaId, @PathVariable Long productoId) {
        try {
            // Llamamos al servicio para eliminar la relación sin borrar el producto
            categoriaService.removeProductoFromCategoria(categoriaId, productoId);
            return ResponseEntity.ok("Producto eliminado de la categoría.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error al eliminar el producto de la categoría: " + ex.getMessage());
        }
    }
}
