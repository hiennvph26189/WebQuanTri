import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalProducts from './ModalProducts';
import ModalEditProducts from './ModalEditProducts';
import { getAllProducts } from '../../../services/productsService';
import * as actions from '../../../store/actions'
import CurrencyFormat from 'react-currency-format';
class ProductManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrCategories: [],
            arrProducts: [],
            isOpenModal: false,
            isOpenEditProductsModal: false,
            productsEdit: {}
        }
       }

    async componentDidMount() {
        this.props.fetchProducts()
       
       
    }
    handleAddNewProducts = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    toggleProductsModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditProductsModal = ()=>{
        this.setState({
            isOpenEditProductsModal: !this.state.isOpenEditProductsModal
        })
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        //console.log(prevProps.productsRedux,'prevProps')
        if(prevProps.productsRedux !== this.props.productsRedux){
            this.setState({
                arrProducts: this.props.productsRedux
            })
        }
        if(prevProps.categoriesRedux !== this.props.categoriesRedux){
            this.setState({
                arrCategories: this.props.categoriesRedux
            })
        }
    }
    price =(price)=>{
            var x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;
    }
    handleDeleteProducts = (id)=>{
        if(id){
            console.log(id,"adflakf;akf;ahd;f")
            this.props.DeleteProducts(id)
        }
    }
    handleEditProducts=(product)=>{
        this.setState({
            isOpenEditProductsModal: true,
            productsEdit: product
        })
       
        
    }
    showImage = (image)=>{
        if(image){
           
            let list = JSON.parse(image)
           let url = ""
           for(let i = 0; i< list.length; i++){
                if(list[0]){
                    url = list[0]
                }
           }
           return url

        }
    }
    render() {
       
        this.showImage()
        let arrProducts = this.state.arrProducts;
        // arrProducts.forEach(item => {
        //     console.log(item.image,"dslaflk")
        // });
        let arrCategories = this.state.arrCategories;
        
        return (
            <div className="container products-container">
                <ModalProducts
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleProductsModal}
                    createNewProducts = {this.createNewProducts}
                />
                {this.state.isOpenEditProductsModal &&
                    <ModalEditProducts
                    isOpen = {this.state.isOpenEditProductsModal}
                    toggleFromParent = {this.toggleEditProductsModal}
                    currentProducts = {this.state.productsEdit}
                     
                />
                    
                }
                 
                <div className='title text-center'> Read Products</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewProducts()}> <i className='fas fa-plus px-2'></i>Add new products</button>
                </div>
                <div className='products-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all px-5">
                    <tbody>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh Mục</th>
                            <th>Hãng sx</th>
                            <th>Giá</th>
                            <th>soLuong</th>
                            <th>Sale</th>
                            <th>Hot</th>
                            <th>lượt xem</th>
                            <th>lượt mua</th>
                            <th>Action</th>
                        </tr>
                        {
                        arrProducts && arrProducts.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                    <td style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        {item.image&&
                                        <img style={{width:'150px', maxHeight: "250px"}} src={this.showImage(item.image)}/> 
                                    }
                                    
                                    </td>
                                    
                                    <td>{item.tenSp}</td>
                                    <td>
                                   { arrCategories && arrCategories.map((item2,index) =>{
                                        return(
                                            <>
                                                {item.idDanhSach&&item.idDanhSach === item2.id? item2.name :""}
                                            </>
                                            
                                        ) })}
                                    </td>
                                    <td>{item.hangSx}</td>
                                    <td>{this.price(item.giaSanPham)}</td>
                                    <td>{item.soLuong}</td>
                                    <td>{item.sale+ " %"}</td>
                                    <td>{item.hot === 1? <i class="fas fa-check"></i>: ''}</td>
                                    <td>{item.luotXem}</td>
                                    <td>{item.luotMua}</td>
                                    <td className='action'>
                                    <button onClick={()=>this.handleEditProducts(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    <button onClick={()=>this.handleDeleteProducts(item.id)} class="btn btn-danger  px-2">Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}
                    
                    
                  
                        
                        
                    </tbody></table>
                   
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state.admin.products,"sd;fka;df")
    return {
        productsRedux: state.admin.products,
        categoriesRedux: state.admin.categories,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
        fetchProducts: ()=> dispatch(actions.fetchProducts()),
        DeleteProducts: (id)=> dispatch(actions.DeleteProducts(id)),
        // getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart())
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
