import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { map } from 'lodash';
import * as actions from '../../../store/actions'
import DOMParser from 'dom-parser';
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
// import ModalOrders from './ModalOrders';
import ModalEditOrder from './ModalEditOrder';
// import { getAllUOrdersManage,createNewOrdersManage,deleteOrdersManageService,editOrdersManageService } from '../../services/OrdersManageService';


class OrdersManage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrOrders: [],
            arrCarts: [],
            arrProducts:[],
            arrMembers:[],
            isOpenEditOrderModal: false,
            itemEditOrder: {}

        }
        
       }

   
    async componentDidMount() {
        this.props.fetchOrderProducts()
        this.props.fetchProducts()
        this.props.fetchMembers()
        
     }
   
    componentDidUpdate(prevProps, prevState,snapshot) {
       
       
        if(prevProps.ordersRedux !== this.props.ordersRedux){
            this.setState({
                arrOrders: this.props.ordersRedux
            })
        }
        if(prevProps.cartsRedux !== this.props.cartsRedux){
            this.setState({
                arrCarts: this.props.cartsRedux
            })
        }
        if(prevProps.productsRedux !== this.props.productsRedux){
            this.setState({
                arrProducts: this.props.productsRedux
            })
        }
        if(prevProps.members !== this.props.members){
            this.setState({
                arrMembers: this.props.members
            })
        }
        
    }
    nameMembers = (idUser)=>{
        let name = ""
        this.state.arrMembers.map((item)=>{
            if(idUser===item.id){
                name = item.tenThanhVien
            }
        })
        
        return name
    }
    phoneMembers = (idUser)=>{
        let phone = ""
        this.state.arrMembers.map((item)=>{
            if(idUser===item.id){
                phone = item.	soDienThoai
            }
        })
        
        return phone
    }
    listNamePhroducts = (idCarts) =>{
        let arrIdCart = JSON.parse(idCarts)
    
       let  IdSP =[]
       let tenSP = []
      
       
        arrIdCart.map((item)=>{
            this.state.arrCarts.map((item2)=>{
                if(item === item2.id){
                    IdSP.push(item2.ipSanPham)
                }
            }) 
        })
        IdSP.map((itemIDSP)=>{
            this.state.arrProducts.map((product)=>{
                if(itemIDSP===product.id){
                    tenSP.push(product.tenSp)
                }
            })
        })
        return tenSP.map((item)=>{
            return (
                <p>{item}</p>
            )
        })
        
    }
    price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY HH:mm:ss");
        return newFr
    }
    formatTime= (time)=>{
        const newFr = Moment(time).locale("vi", fr).format("HH:mm:ss");
        return newFr
    }
    toggleEditOrderModal = ()=>{
        this.setState({
            isOpenEditOrderModal: !this.state.isOpenEditOrderModal
        })
    }
    handleEditOrder=(order)=>{
        this.setState({
            isOpenEditOrderModal: true,
            itemEditOrder: order
            
        })
        
    } 
    render() {
       console.log(this.state.arrMembers,"Members")
       let arrOrders = this.state.arrOrders
        return (
            <div className="container category-container">
                
               {this.state.isOpenEditOrderModal&&
                    <ModalEditOrder
                    isOpen = {this.state.isOpenEditOrderModal}
                    toggleFromParent = {this.toggleEditOrderModal}
                    itemEditOrder = {this.state.itemEditOrder}
                    arrMembers = {this.state.arrMembers}
                    arrProducts = {this.state.arrProducts}
                    arrCarts = {this.state.arrCarts}
                   

                 
                />
            }
                    
               
                 
                <div className='title text-center'> Read Orders</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewOrder()}> <i className='fas fa-plus px-2'></i>Add new category</button>
                </div>
                <div className='category-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all">
                    <tbody>
                        <tr>
                            
                            <th style={{width:"200px"}}>Tên người mua</th>
                            <th>Số điện thoại</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày đặt</th>
                           
                            <th>Chỉnh sửa</th>

                        </tr>
                        {
                        arrOrders && arrOrders.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                    <td>{this.nameMembers(item.idUser)}</td>
                                    <td>{this.phoneMembers(item.idUser)}</td>
                                    <td style={{fontWeight:"600",color:"red"}}>{this.price(item.tongTien)}</td>
                                    <td style={{fontWeight:"600",color:item.status == 0 ? "#FF9900" : item.status == 1 ? "#0099FF" : item.status == 2 ? "#008B8B" : item.status == 3 ? "#006400" :item.status == 4?"#FF6347":"#8B0000"}}>
                                    {item.status == 0 ? "Đang chờ xử duyệt đơn" : item.status == 1 ? "Đã xác nhận đơn hàng"  : item.status == 2 ? "Đơn đang giao" : item.status == 3 ? "Giao thành công"  :item.status == 4?"Đang Chờ xác nhận hủy đơn":"Đã hủy thành công"}</td>
                                    <td>{this.formatDate(item.createdAt)}</td>
                                    
                                    <td className='action' style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                                    <button onClick={()=>this.handleEditOrder(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    <button onClick={()=>this.handleDeleteCategory(item.id)} class="btn btn-danger  px-2">Delete</button>
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
    
    return {
        ordersRedux: state.admin.orders,
        cartsRedux: state.admin.carts,
        productsRedux: state.admin.products,
        members: state.admin.members,
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        fetchOrderProducts: ()=> dispatch(actions.fetchOrderProducts()),
        fetchProducts: ()=> dispatch(actions.fetchProducts()),
        fetchMembers: ()=> dispatch(actions.fetchMembers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersManage);
