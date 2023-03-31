import axios  from "../axios";
const getAllOrders = ()=>{
    return axios.get(`/api/get-all-orders-product`)
}
// const createNewCategories = (data)=>{
//     return axios.post(`/api/add-categories`,data)
// }
// const deleteCategoriesService = (id)=>{
//     return axios.delete(`/api/delete-categories`,{data:{id:id}})
// }
// const editCategoriesService = (imputData)=>{
//     return axios.put(`/api/edit-categories`,imputData)
// }
export  {
    getAllOrders,
    // createNewCategories,
    // deleteCategoriesService,
    // editCategoriesService
};