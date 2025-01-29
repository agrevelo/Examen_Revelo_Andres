package org.espe.revelo_categorias.services;

import jakarta.transaction.Transactional;
import org.espe.revelo_categorias.clients.ProductoClientRest;
import org.espe.revelo_categorias.models.Producto;
import org.espe.revelo_categorias.models.entities.Categoria;
import org.espe.revelo_categorias.models.entities.CategoriaProducto;
import org.espe.revelo_categorias.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    @Autowired
    private ProductoClientRest clientRest;

    @Override
    public List<Categoria> findAll() {
        return (List<Categoria>) repository.findAll();
    }

    @Override
    public Optional<Categoria> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Categoria save(Categoria categoria) {
        return repository.save(categoria);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Producto> addProducto(Producto producto, Long id) {
        // Primero, obtener el producto usando el cliente REST
        Producto productoRecuperado = clientRest.findById(producto.getId());

        // Verificar si el producto existe
        if (productoRecuperado != null) {
            Optional<Categoria> optionalCategoria = repository.findById(id);

            // Si la categoría existe, agregar el producto a la categoría
            if (optionalCategoria.isPresent()) {
                Categoria categoria = optionalCategoria.get();
                categoria.addProducto(productoRecuperado); // Agrega el producto a la categoría

                // Guarda la categoría con el nuevo producto
                repository.save(categoria);

                return Optional.of(productoRecuperado); // Devuelve el producto agregado
            }
        }
        return Optional.empty(); // Si no se encuentra el producto o la categoría
    }

    @Override
    public List<Producto> findProductosByCategoriaId(Long id) {
        Optional<Categoria> optionalCategoria = repository.findById(id);
        if (optionalCategoria.isPresent()) {
            Categoria categoria = optionalCategoria.get();
            if (categoria.getCategoriaProductos() != null) {
                List<Producto> productos = new ArrayList<>();
                for (CategoriaProducto categoriaProducto : categoria.getCategoriaProductos()) {
                    Producto producto = clientRest.findById(categoriaProducto.getProductoId());
                    if (producto != null) {
                        productos.add(producto);
                    }
                }
                categoria.setProductos(productos);
                return productos;
            }
        }
        return List.of(); // Si no se encuentra la categoría
    }

    @Transactional
    @Override
    public boolean removeProductoFromCategoria(Long categoriaId, Long productoId) {
        Optional<Categoria> categoriaOptional = repository.findById(categoriaId);

        if (categoriaOptional.isPresent()) {
            Categoria categoria = categoriaOptional.get();

            // Eliminar la relación CategoriaProducto
            boolean removed = categoria.getCategoriaProductos().removeIf(cp -> cp.getProductoId().equals(productoId));

            if (removed) {
                // Actualizar la lista de productos en memoria
                categoria.setProductos(categoria.getProductos().stream()
                        .filter(p -> !p.getId().equals(productoId))
                        .collect(Collectors.toList()));

                // Guardar la categoría actualizada
                repository.save(categoria);
                return true;
            }
        }
        return false;
    }
}
