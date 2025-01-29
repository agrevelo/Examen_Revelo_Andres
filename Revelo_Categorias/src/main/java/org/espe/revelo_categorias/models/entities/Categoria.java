package org.espe.revelo_categorias.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.espe.revelo_categorias.models.Producto;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "El nombre de la categoría no puede estar vacío.")
    @Size(min = 3, max = 100, message = "El nombre de la categoría debe tener entre 3 y 100 caracteres.")
    @Column(nullable = false)
    private String nombre;

    @NotEmpty(message = "La descripción de la categoría no puede estar vacía.")
    @Size(min = 5, max = 255, message = "La descripción debe tener entre 5 y 255 caracteres.")
    @Column(nullable = false)
    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "categoria_id")
    private List<CategoriaProducto> categoriaProductos;

    @Transient
    @JsonIgnore
    private List<Producto> productos;

    public Categoria() {
        categoriaProductos = new ArrayList<>();
        productos = new ArrayList<>();
    }

    // Método para agregar productos a la categoría
    public void addProducto(Producto producto) {
        productos.add(producto);
        CategoriaProducto categoriaProducto = new CategoriaProducto();
        categoriaProducto.setProductoId(producto.getId()); // Solo se necesita el ID del producto
        categoriaProductos.add(categoriaProducto); // Agregamos la relación
    }

    // Método para eliminar productos de la categoría
    public void removeProducto(Producto producto) {
        this.productos.removeIf(p -> p.getId().equals(producto.getId()));
        this.categoriaProductos.removeIf(cp -> cp.getProductoId().equals(producto.getId()));
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }

    public List<CategoriaProducto> getCategoriaProductos() {
        return categoriaProductos;
    }

    public void setCategoriaProductos(List<CategoriaProducto> categoriaProductos) {
        this.categoriaProductos = categoriaProductos;
    }
}
