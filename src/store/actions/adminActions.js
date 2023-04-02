import actionTypes from './actionTypes';
import { getAllProducts,createNewProductsService,uploadImage,deleteProductsService,editProductsService, } from '../../services/productsService';
import { getAllMembers,getLichSuNap,editMembersPrices,editHuyPricesMembers } from '../../services/membersService';
import { getAllOrders ,huyOrdersSucces,checkOrderService,GiaoDonService,deleteOrderService} from '../../services/OrdersService';
import { toast } from 'react-toastify';
// export const fetchCategoriesStart = () => ({
//     type: actionTypes.FETCH_CATEGORIES_START,
// })
export const fetchCategoriesStart = () => {
    return async(dispatch,getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_CATEGORIES_START})
            let res = await getAllProducts()
            if(res && res.errCode === 0){
               
                dispatch(fetchCategoriesSuccess(res.categories))
            }else{
                dispatch(fetchCategoriesFailed())
            }
        } catch (error) {
            dispatch(fetchCategoriesFailed())
            console.log("fetchCategoriesStart ",error)
        }
    }
   
}
export const fetchCategoriesSuccess = (getCategories) => ({
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    data2: getCategories
})
export const fetchCategoriesFailed = () => ({
    type: actionTypes.FETCH_CATEGORIES_FAILED,
})


export const createNewProducts = (data) => {
    return async(dispatch,getState)=>{
        try {
            
            let res = await createNewProductsService(data)
            if(res && res.errCode === 0){
                toast.success("Thêm mới sản phẩm thành công")
                dispatch(createNewProductsSuccess())
                dispatch(fetchProducts())
            }else{
                dispatch( createNewProductsFailed())
            }
        } catch (error) {
            dispatch( createNewProductsFailed())
            console.log("fetchCategoriesStart ",error)
        }
    }

}
export const createNewProductsSuccess = () => ({
    
    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS,
   
})
export const createNewProductsFailed = () => ({
    
    type: actionTypes.CREATE_NEW_PRODUCT_FAIL,
  
})


export const fetchProducts = () => {
    return async(dispatch,getState)=>{
        try {
           
            let res = await getAllProducts()
            if(res && res.errCode === 0){
               
                // console.log(res.products)
                dispatch(fetchProductsSuccess(res.products.reverse()))
            }else{
                dispatch(fetchProductsFailed())
            }
        } catch (error) {
            dispatch(fetchProductsFailed())
            console.log("fetchProductsFailed ",error)
        }
    }
   
}
export const fetchProductsSuccess = (getProducts) => ({
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    data: getProducts
})
export const fetchProductsFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_FAILED,
})


export const DeleteProducts = (id) => {
    return async(dispatch,getState)=>{
        try {
            
            let res = await deleteProductsService(id)
            if(res && res.errCode === 0){
                toast.success("Xóa sản phẩm thành công")
                dispatch(deleteProductsSuccess())
                dispatch(fetchProducts())
            }else{
                dispatch( deleteNewProductsFailed())
            }
        } catch (error) {
            dispatch( deleteNewProductsFailed())
            console.log("deleteNewProductsFailed ",error)
        }
    }

}

export const deleteProductsSuccess = () => ({
    
    type: actionTypes.DELETE_PRODUCTS_SUCCESS,
 
})
export const deleteNewProductsFailed = () => ({
    
    type: actionTypes.DELETE_PRODUCTS_FAILED,
   
})

export const updateProducts = (data) => {
    return async(dispatch,getState)=>{
        try {
            console.log("dât Edit Product",data);
            let res = await editProductsService(data)
            if(res && res.errCode === 0){
                
                toast.success("Sửa sản phẩm thành công")
                dispatch(updateProductsSuccess())
                dispatch(fetchProducts())
            }else{
                dispatch( updateProductsFailed())
            }
        } catch (error) {
            dispatch( updateProductsFailed())
            console.log("updateProductsFailed ",error)
        }
    }

}

export const updateProductsSuccess = () => ({
    
    type: actionTypes.UPDATE_PRODUCTS_SUCCESS,
 
})
export const updateProductsFailed = () => ({
    
    type: actionTypes.UPDATE_PRODUCTS_FAILED,
   
})


export const createNewImage = (data) => {
    return async(dispatch,getState)=>{
        try {
            
             await uploadImage(data)
             console.log(uploadImage(data),"servide")
                // console.log(data)
           
                toast.success("Thêm mới sản phẩm thành công")
                dispatch(createNewImageSuccess())
           
        } catch (error) {
            dispatch( createNewImageFailed())
            console.log("createNewImageFailed ",error)
        }
    }

}
export const createNewImageSuccess = () => ({
    
    type: actionTypes.CREATE_NEW_IMAGE_SUCCESS,
   
})
export const createNewImageFailed = () => ({
    
    type: actionTypes.CREATE_NEW_IMAGE_FAIL,
  
})



export const fetchMembers = () => {
    return async(dispatch,getState)=>{
        try {
           
            let res = await getAllMembers()
            
            if(res && res.errCode === 0){
                
                // console.log(res.products)
                dispatch(fetchMembersSuccess(res.data.reverse()))
            }else{
                dispatch(fetchMembersFailed())
            }
        } catch (error) {
            dispatch(fetchMembersFailed())
            console.log("fetchProductsFailed ",error)
        }
    }
   
}
export const fetchMembersSuccess = (getMembers) => ({
    
    type: actionTypes.FETCH_MEMBERS_SUCCESS,
    data: getMembers
    
})
export const fetchMembersFailed = () => ({
    type: actionTypes.FETCH_MEMBERS_FAILED,
})


export const fetchMembersPrice = (id) => {
    return async(dispatch,getState)=>{
        console.log(id,"Loading Action")
        try {
           
            
            let res = await getLichSuNap(id)
              
            if(res && res.errCode === 0){
                dispatch(fetchMembersPriceSuccess(res.data.reverse()))
            }else{
                dispatch(fetchMembersPriceFailed())
            }
        } catch (error) {
            dispatch(fetchMembersPriceFailed())
            console.log("fetchMembersPriceFailed ",error)
        }
    }
   
}
export const fetchMembersPriceSuccess = (getMembers) => ({
    
    type: actionTypes.FETCH_MEMBERSPRICE_SUCCESS,
    data: getMembers
    
})
export const fetchMembersPriceFailed = () => ({
    type: actionTypes.FETCH_MEMBERSPRICE_FAILED,
})


export const updateMembersPrice = (data) => {
    return async(dispatch,getState)=>{
        
        try {
           
            
            let res = await editMembersPrices(data)
              
            if(res && res.errCode === 0){
                toast.success("Nạp tiền thành công")
                dispatch(updateMembersPriceSuccess())
                dispatch(fetchMembersPrice(data.idUser))
                dispatch(fetchMembers())
            }else{
                dispatch(updateMembersPriceFailed())
            }
        } catch (error) {
            dispatch(updateMembersPriceFailed())
            console.log("fetchMembersPriceFailed ",error)
        }
    }
   
}
export const updateMembersPriceSuccess = () => ({
    
    type: actionTypes.UPDATE_PRICES_SUCCESS,

    
})
export const updateMembersPriceFailed = () => ({
    type: actionTypes.UPDATE_PRICES_FAILED,
})

export const updateHuyMembersPrice = (data) => {
    return async(dispatch,getState)=>{
        console.log(data,"adsahdf")
        try {
           
            
            let res = await editHuyPricesMembers(data)
              
            if(res && res.errCode === 0){
                toast.success("Nạp tiền thành công")
                dispatch(updateHuyMembersPriceSuccess())
                dispatch(fetchMembersPrice(data.idUser))
                dispatch(fetchMembers())
            }else{
                dispatch(updateHuyMembersPriceFailed())
            }
        } catch (error) {
            dispatch(updateHuyMembersPriceFailed())
            console.log("fetchMembersPriceFailed ",error)
        }
    }
   
}
export const updateHuyMembersPriceSuccess = () => ({
    
    type: actionTypes.HUY_PRICES_SUCCESS,

    
})
export const updateHuyMembersPriceFailed = () => ({
    type: actionTypes.HUY_PRICES_FAILED,
})

export const fetchOrderProducts = () => {
    return async(dispatch,getState)=>{
       
        try {
            let res = await getAllOrders()
              
            if(res && res.errCode === 0){
                dispatch(fetchOrderProductsSuccess(res.getAllOrder,res.getCarts))
            }else{
                dispatch(fetchOrderProductsFailed())
            }
        } catch (error) {
            dispatch(fetchMembersPriceFailed())
            console.log("fetchOrderProductsFailed ",error)
        }
    }
   
}
export const fetchOrderProductsSuccess = (getAllOrder,getCarts) => ({
    
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    dataOrder:getAllOrder,
    dataCart:getCarts
    
})
export const fetchOrderProductsFailed = () => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
})


export const HuyOrderCart = (data) => {
    return async(dispatch,getState)=>{
        console.log(data,"Data Huy Order")
        try {

            let res = await huyOrdersSucces(data)
              
            if(res && res.errCode === 0){
                toast.success("Hủy thành công")
                // dispatch(updateHuyOrderSuccess())
                dispatch(HuyOrderSuccess())
                dispatch(fetchOrderProducts())
            }else{
                dispatch(HuyOrderFailed())
            }
        } catch (error) {
            dispatch(HuyOrderFailed())
            console.log("HuyOrderFailed ",error)
        }
    }
   
}
export const HuyOrderSuccess = () => ({
    
    type: actionTypes.HUY_ORDER_SUCCESS,

    
})
export const HuyOrderFailed = () => ({
    type: actionTypes.HUY_ORDERS_FAILED,
})

export const checkOrderCart = (data) => {
    return async(dispatch,getState)=>{
        console.log(data,"Data Huy Order")
        try {

            let res = await checkOrderService(data)
              
            if(res && res.errCode === 0){
                toast.success("Đã xác nhận đơn hàng")
                // dispatch(updateHuyOrderSuccess())
                dispatch(checkOrderSuccess())
                dispatch(fetchOrderProducts())
            }else{
                dispatch(checkOrderFailed())
            }
        } catch (error) {
            dispatch(checkOrderFailed())
            console.log("checkOrderFailed ",error)
        }
    }
   
}
export const checkOrderSuccess = () => ({
    
    type: actionTypes.CHECK_ORDER_SUCCESS,

    
})
export const checkOrderFailed = () => ({
    type: actionTypes.CHECK_ORDERS_FAILED,
})
export const giaoOrderCart = (data) => {
    return async(dispatch,getState)=>{
        console.log(data,"Data Huy Order")
        try {

            let res = await GiaoDonService(data)
              
            if(res && res.errCode === 0){
                toast.success("Đã giao đơn thành công")
                // dispatch(updateHuyOrderSuccess())
                dispatch(giaoOrderSuccess())
                dispatch(fetchOrderProducts())
            }else{
                dispatch(giaoOrderFailed())
            }
        } catch (error) {
            dispatch(giaoOrderFailed())
            console.log("giaoOrderFailed ",error)
        }
    }
   
}
export const giaoOrderSuccess = () => ({
    
    type: actionTypes.GIAO_ORDER_SUCCESS,

    
})
export const giaoOrderFailed = () => ({
    type: actionTypes.GIAO_ORDERS_FAILED,
})
export const deleteOrderCart = (id) => {
    return async(dispatch,getState)=>{
       
        try {

            let res = await deleteOrderService(id)
              
            if(res && res.errCode === 0){
                toast.success("Đã giao đơn thành công")
                // dispatch(updateHuyOrderSuccess())
                dispatch(deleteOrderSuccess())
                dispatch(fetchOrderProducts())
            }else{
                dispatch(deleteOrderFailed())
            }
        } catch (error) {
            dispatch(deleteOrderFailed())
            console.log("deleteOrderFailed ",error)
        }
    }
   
}
export const deleteOrderSuccess = () => ({
    
    type: actionTypes.DELETE_ORDER_SUCCESS,

    
})
export const deleteOrderFailed = () => ({
    type: actionTypes.DELETE_ORDERS_FAILED,
})