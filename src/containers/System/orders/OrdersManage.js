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
import { getAllOrders } from '../../../services/OrdersService';
import { GET_ADDRESS_ORDER_DETAIL ,PUT_MA_VAN_DON_ORDER} from '../../../API';
import axios  from "../../../axios";
class OrdersManage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrOrders: [],
            arrCarts: [],
            arrProducts:[],
            arrMembers:[],
            isOpenEditOrderModal: false,
            itemEditOrder: {},
            status: "0",
            page:1, 
            totalPage:0

        }
        
       }

   
    async componentDidMount() {
        this.props.fetchOrderProducts(this.state.status,this.state.page)
        this.props.fetchProducts()
        this.props.fetchMembers(1)
        this.loadData(this.state.status,this.state.page)
        
     }
    loadData = async(status,page)=>{
        let data = await getAllOrders(status,page)  
        this.setState({
            arrOrders: data.getAllOrder,
            totalPage: data.totalCount
        })
       
       
    }
    loadDataPanigate = async(status,page)=>{
        let data = await getAllOrders(status,page)  
        this.setState({
            arrOrders: data.getAllOrder,
            totalPage: data.totalCount
        })
    }
    pagePev =async (status,page)=>{
        let data = await getAllOrders(status,page)  
        this.setState({
            arrOrders: data.getAllOrder,
            totalPage: data.totalCount,
            page:page,
            status:status
        })
    }
    pageNext = async(status,page)=>{
        
        let data = await getAllOrders(status,page) 
        console.log(page, "Page"); 
        console.log(this.state.totalPage, "totalPage"); 
        this.setState({
            arrOrders: data.getAllOrder,
            totalPage: data.totalCount,
            page:page,
            status:status
        })
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
    // nameMembers = (id_address)=>{
    //     let name = ''
    //     if(id_address){
    //         axios.get(`${GET_ADDRESS_ORDER_DETAIL}?id_address=${id_address}`).then((res)=>{
    //            return  res.itemAddress.hoTen
              
    //         }).catch((err)=>{console.log(err);})
    //     }
       
       
       
    // }
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
    handleDeleteOrderCart=(id)=>{
        if(id){
            this.props.deleteOrderCart(id,this.state.status)
        }
    }
    handleOnChageInput = async(event) => {
        // console.log(event.target.value,id)
       
        this.setState({
           status: event.target.value,
           page:1
        })
        this.props.fetchOrderProducts(event.target.value,1)
        this.loadData(event.target.value,1)
    }
    render() {
       console.log(this.state.arrMembers,"Members")
       let arrOrders = this.state.arrOrders
       let status = this.state.status
       let arrPagetion = [];
       for ( let i = 1; i <= this.state.totalPage; i++){
           console.log(i)
           arrPagetion.push(
               <>
               {
               i === this.state.page?
               <li class="page-item disabled">
               <button class="page-link"
               key={i}
               onClick={() => {this.loadDataPanigate(status,i)
                   this.setState({
                       page: i
                   })
               }  }
           
           >
           {i}
         </button></li>
               :
               <li class="page-item ">
               <button class="page-link"
               key={i}
               onClick={() => {this.loadDataPanigate(status,i)
                   this.setState({
                       page: i
                   })
               }  }
           
           >
           {i}
         </button></li>
           }
               </>
           )
       }
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
                    status = {parseInt(this.state.status)}
                    page = {this.state.page}
                    loadData = {this.loadData}


                 
                />
            }
                    
               
                 
                <div className='title text-center'> Read Orders</div>
                <div className='col-3 form-group mg-top'>
             
                    <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event)} value={this.state.status}>
                    <option selected value="All">Xem tất cả </option>
                    <option  value="0">Chờ xét duyệt</option>
                    <option value="1">Đã Xác nhận đơn hàng</option>
                    <option value="2">Đang giao hàng</option>
                    <option value="3">Giao thành công </option>
                    <option value="4">Đơn chờ hủy</option>
                    <option value="5">Đơn đã hủy</option>
                    <option value="10">Đơn đang bị lỗi</option>
                    <option value="11">Đơn hàng đã hoàn</option>
                    </select>
                </div>
                <div className='category-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all">
                    <tbody>
                        <tr>
                            
                            <th style={{width:"200px"}}>Tên người nhận</th>
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
                                    <td>{item.hoTen}</td>
                                    <td>{item.soDienThoai}</td>
                                    <td style={{fontWeight:"600",color:"red"}}>{this.price(item.tongTien)}</td>
                                    <td style={{fontWeight:"600",color:item.status == 0 ? "#FF9900" : item.status == 1 ? "#0099FF" : item.status == 2 ? "#008B8B" : item.status == 3 ? "#006400" :item.status == 4?"#FF6347":item.status == 5?"#008B8B":item.status == 10?"#FF6347":item.status == 11?"#008B8B":"#fff"}}>
                                    {item.status == 0 ? "Đang chờ xử duyệt đơn" : item.status == 1 ? "Đã xác nhận đơn hàng"  : item.status == 2 ? "Đơn đang giao" : item.status == 3 ? "Giao thành công"  :item.status == 4?"Đang Chờ xác nhận hủy đơn":item.status == 5?"Đã hủy thành công":item.status == 10?"Đơn hàng đang bị lỗi":item.status == 11?"Đã hoàn tiền cho khách":""}</td>
                                    <td>{this.formatDate(item.createdAt)}</td>
                                    
                                    <td className='action' style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                                    <button onClick={()=>this.handleEditOrder(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}
                    
                    
                  
                        
                        
                    </tbody>
                    </table>
                    <nav aria-label="Page navigation example" style={{marginTop:'10px'}}>
                        <ul class="pagination">
                            {this.state.page === 1?
                                 <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Previous</button>
                                 </li>
                            :
                            <li class="page-item ">
                                 <button class="page-link"  onClick={() =>this.pagePev(status,this.state.page -1)} >Previous</button>
                                 </li>
                            }
                            {arrPagetion}
                          {
                            this.state.totalPage == this.state.page ?
                            <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Next</button>
                                 </li>
                                 :
                            <li class="page-item ">
                             <button class="page-link" onClick={() => this.pageNext(status,this.state.page +1)}>Next</button>
                             </li>
                          }    
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    
    return {
        ordersRedux: state.admin.orders,
        cartsRedux: state.admin.carts,
        productsRedux: state.admin.allProducts,
        members: state.admin.members,
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        fetchOrderProducts: (status,page)=> dispatch(actions.fetchOrderProducts(status,page)),
        fetchProducts: ()=> dispatch(actions.fetchAllProducts()),
        fetchMembers: (page)=> dispatch(actions.fetchMembers(page)),
        deleteOrderCart: (id,status)=> dispatch(actions.deleteOrderCart(id,status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersManage);
