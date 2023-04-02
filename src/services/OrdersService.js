import axios  from "../axios";
const getAllOrders = ()=>{
    return axios.get(`/api/get-all-orders-product`)
}
const huyOrdersSucces = (data)=>{
    return axios.put(`/api/huy-orders-success-product`,data)
}
const checkOrderService = (data)=>{
    return axios.put(`/api/check-orders`,data)
}
const GiaoDonService = (data)=>{
    return axios.put(`/api/giao-don-orders`,data)
}
const deleteOrderService = (id)=>{
    return axios.delete(`/api/delete-orders?id=${id}`)
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
    huyOrdersSucces,
    checkOrderService,
    GiaoDonService,
    deleteOrderService
    // createNewCategories,
    // deleteCategoriesService,
    // editCategoriesService
};