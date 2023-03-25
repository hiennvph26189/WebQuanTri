import axios  from "../axios";
const getAllProducts = ()=>{
    return axios.get(`/api/get-all-product`)
}
const createNewProductsService = (data)=>{
    return axios.post(`/api/add-product`,data)
}
const deleteProductsService = (id)=>{
    return axios.delete(`/api/delete-product`,{data:{id:id}})
}
const editProductsService = (dataImput)=>{
    return axios.put(`/api/edit-product`,{dataImput})
}
const uploadImage = (data)=>{
    
    return axios.post(`/api/post-image-product`,{data})
}
export{
    getAllProducts,
    createNewProductsService,
    deleteProductsService,
    editProductsService,
    uploadImage
};