package org.espe.revelo_categorias.repositories;

import org.espe.revelo_categorias.models.entities.Categoria;
import org.springframework.data.repository.CrudRepository;

public interface CategoriaRepository extends CrudRepository<Categoria, Long>{
}
