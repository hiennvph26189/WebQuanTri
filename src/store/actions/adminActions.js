import actionTypes from './actionTypes';
import { getAllProducts,createNewProductsService,uploadImage,deleteProductsService,editProductsService } from '../../services/productsService';
import { getAllMembers } from '../../services/membersService';
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