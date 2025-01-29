package org.espe.revelo_categorias.services;

import org.espe.revelo_categorias.models.Producto;
import org.espe.revelo_categorias.models.entities.Categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {
    List<Categoria> findAll();
    Optional<Categoria> findById(Long id);
    Categoria save(Categoria categoria);
    void deleteById(Long id);
    Optional<Producto> addProducto(Producto producto, Long id);
    List<Producto> findProductosByCategoriaId(Long id);
    boolean removeProductoFromCategoria(Long categoriaId, Long productoId);
}
