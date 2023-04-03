import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
class ThongKeManage extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
         dateThang = (today.getMonth() + 1),
        dateNgay = (today.getDay()); 
        this.state = {
            arrOrders: [],
            arrCarts:[],
            arrProducts:[],
            thang:dateThang,
            arrMembers:[],
            arrList : [],
            doanhThu:0,
            ngay:dateNgay,
            ngayThangNam: "",
            denNgayThangNam: "",
            arrThongKeProducts: [],
        }
    }
    async componentDidMount() {
        this.props.fetchOrderProducts()  
    }
    handleOnChageInput = (event) => {
        // console.log(event.target.value,id)
        
        
        this.setState({
           thang : event.target.value
        })
        
        
    }
    handleOnChageInputDenNgay=(event)=>{
        this.setState({
            denNgayThangNam : event.target.value
         })
    }
    handleOnChageInputNgay = (event)=>{
        this.setState({
            ngayThangNam : event.target.value
         })
    }
    formatDayMonYear = ()=>{
        let date = this.state.ngayThangNam.split("-")
      
        const year = date[0];
        const month = date[1];
        const day = date[2];
        console.log(`Ngày: ${day}, Tháng: ${month}, Năm: ${year}`);
    }
     arrOrdersThang = ()=>{
        let arr = []
        let tien = 0
        let thang = this.state.thang
        if(this.state.thang){
             this.state.arrOrders.map((item)=>{
                
            if(this.formatDate(item.updatedAt) === parseInt(thang)&&item.status===3){
                arr.push(item)
            }
            
        })
        }
        arr.map((item)=>{
            tien = tien+item.tongTien
        })
        
        return tien
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("MM");
        return parseInt(newFr)
    }
    formatDateNgay= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD");
        return parseInt(newFr)
    }
    formatDateNam= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("YYYY");
        return parseInt(newFr)
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
    clickHear = ()=>{
        let arr = []
        let tuNgay = this.state.ngayThangNam.split("-")
        const year1 = tuNgay[0];
        const month1 = tuNgay[1];
        const day1 = tuNgay[2];
        let denngay = this.state.denNgayThangNam.split("-")
        const year2 = denngay[0];
        const month2 = denngay[1];
        const day2 = denngay[2];
        this.state.arrOrders.map((item)=>{
               let thangOrder  = this.formatDate(item.updatedAt)
                let  dayOrder= this.formatDateNgay(item.updatedAt)
                let namOrder = this.formatDateNam(item.updatedAt)
                if(dayOrder==year1){
                    console.log("ok")
                }
        })
        console.log(arr)
    }
    render() {
        this.clickHear()
        let tongSoTien = this.state.doanhThu
        console.log(this.state.ngay)
        return (
            <div className="container category-container">
            <div className='title text-center'> Read Category</div>
            <div className='col-12 ' style={{display:"flex"}}> 
                <div className='col-3'>
                <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event)} value={this.state.thang}>
                        <option selected value="">----</option>
                        <option  value="01">tháng 1</option>
                        <option value="02">tháng 2</option>
                        <option value="03">tháng 3</option>
                        <option value="04">tháng 4</option>
                        <option value="05">tháng 5</option>
                        <option value="06">tháng 6</option>
                        <option value="07">tháng 7</option>
                        <option value="08">tháng 8</option>
                        <option value="09">tháng 9</option>
                        <option value="10">tháng 10</option>
                        <option value="11">tháng 11</option>
                        <option value="12">tháng 12</option>
                    </select>
                </div>
                    
                    <div className='col-3'>
                        <input type='date' className='form-control' onChange={(event)=>this.handleOnChageInputNgay(event)} value={this.state.ngayThangNam}/>
                    </div> 
                    <div className='col-3'>
                        <input type='date' className='form-control' onChange={(event)=>this.handleOnChageInputDenNgay(event)} value={this.state.denNgayThangNam}/>
                    </div>
                    <div className='col-3'>
                        <button onClick={()=>this.clickHear()} className='btn btn-success 'style={{width:"100px"}}>Click</button>
                    </div>
                   
            </div>
            
            <div className='category-table mt-4 mx-2'>
                <div>
                    tổng tiền: { this.arrOrdersThang()}
                </div>
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th>Ảnh Sản phẩm</th>
                        <th>Tên Loại sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Đã bán</th>
                        <th>doanh thu</th>
                    </tr>
                    
  
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
        fetchMembers: ()=> dispatch(actions.fetchMembers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeManage);
