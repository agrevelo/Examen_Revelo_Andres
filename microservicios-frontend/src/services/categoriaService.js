import axios from 'axios';

const API_URL = 'http://localhost:8002/api/categorias';

export const listarCategorias = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
};

export const crearCategoria = async (categoria) => {
    try {
        const response = await axios.post(API_URL, categoria);
        return response.data;
    } catch (error) {
        console.error('Error al crear categoría:', error);
        throw error;
    }
};

export const asignarProductoACategoria = async (categoriaId, producto) => {
    try {
        const response = await axios.post(`${API_URL}/${categoriaId}/productos`, producto);
        return response.data;
    } catch (error) {
        console.error('Error al asignar producto:', error);
        throw error;
    }
};

export const eliminarProductoDeCategoria = async (categoriaId, productoId) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    
    if (!confirmacion) {
        return;
    }

    try {
        await axios.delete(`${API_URL}/${categoriaId}/productos/${productoId}`);
    } catch (error) {
        console.error('Error al eliminar producto de categoría:', error);
        throw error;
    }
};
