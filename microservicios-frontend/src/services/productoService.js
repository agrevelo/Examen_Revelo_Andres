import axios from 'axios';

const API_URL = 'http://localhost:8003/api/productos';

export const listarProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const crearProducto = async (producto) => {
    try {
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

export const actualizarProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};