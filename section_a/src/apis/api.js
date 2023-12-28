// api.js

import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Make seperate header for authorization
const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
    }    
}


export const testApi = () => Api.get('/test');
// http://localhost:5600/test

// create user api
export const createUserApi = (data) => Api.post('/api/user/create', data);

// login user api
export const loginUserApi = (data) => Api.post('/api/user/login', data);

//create product api
export const createProductApi = (data) => Api.post('/api/product/create_product',data, config)

//get all products
export const getAllProductsApi = () => Api.get('/api/product/get_products')

//get single product api
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`)

//update product api with id
export const updateProductApi = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config)

//delete product api with id
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config)