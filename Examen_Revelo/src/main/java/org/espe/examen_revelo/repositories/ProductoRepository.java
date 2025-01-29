package org.espe.examen_revelo.repositories;

import org.espe.examen_revelo.models.entities.Producto;
import org.springframework.data.repository.CrudRepository;

public interface ProductoRepository extends CrudRepository<Producto, Long> {
}
