import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://localhost:3001'
})

const api = {
    loadAllCategories: () => ax.get(`/categories`),
    loadCategories: (id) => ax.get(`/categories?id=${id}`),
    loadProducts: (id) => ax.get(`/products?category=${id}`),
    insertCategory: (category) => ax.post(`/categories`, { category }),
    editCategory: (category) => ax.put(`/categories/${category.id}`, category),
    insertProduct: (name, category) => ax.post(`/Products`, { name, category }),
    deleteCategory: (id) => ax.delete(`/categories/${id}`),
    deleteProduct: (id) => ax.delete(`/products/${id}`)
}

export default api
