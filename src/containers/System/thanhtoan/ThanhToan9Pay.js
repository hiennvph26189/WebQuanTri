import axios  from "../../../axios";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { GET_THANH_TOAN } from '../../../API';
import Moment from 'moment';
import fr from "moment/locale/fr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

class ThanhToan9Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrThanhToan: [],
            isOpenModal: false,
            TongTrang: 0,
            page: 1,
            id:0,
            id_donhang : 0 , 
            payment_no: '', 
            card_name: '', 
            card_brand: '', 
            card_number: '', 
            description: '', 
            amount: 0, 
            created_at: ''
        }

    }

    componentDidMount() {
        this.CallapiThanhToan();
    }
    CallapiThanhToan = async() => {
        await axios.get(`${GET_THANH_TOAN}?page=${this.state.page}`).then((res) => {
            console.log(res.data)
             if (res.errCode == 0) {
                  this.setState({
                    TongTrang : res.totalCount,
                    arrThanhToan: res.thanhtoan

                 });

             }
         }).catch((error) => { console.log(error) });
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY HH:mm:ss");
        return newFr
    }
    pagePev = () => {
        this.CallapiThanhToan()
        this.setState({
            page: this.state.page -1
        })
    }
    pageNext = () => {
        this.CallapiThanhToan()
        this.setState({
            page: this.state.page +1
        })
    }
    showChiTiet = (item) => {
        this.setState({
            isOpenModal: true,
            id: item.id,
            id_donhang : item.id_donhang , 
            payment_no: item.payment_no, 
            card_name: item.card_name, 
            card_brand: item.card_brand, 
            card_number: item.card_number, 
            description: item.description, 
            amount: item.amount, 
            created_at: item.created_at

         });
    }
    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }


   

        render() {
            let arrPagetion = [];
            for ( let i = 1; i <= this.state.TongTrang; i++){
                console.log(i)
                arrPagetion.push(
                    <>
                    {
                    i === this.state.page?
                    <li class="page-item disabled">
                    <button class="page-link"
                    key={i}
                    onClick={() => {this.CallapiThanhToan()
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
                    onClick={() => {this.CallapiThanhToan()
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
            let arrThanhToan = this.state.arrThanhToan;
        return (
            
            <div className="container category-container">   
            <div className='title text-center'> Read Thanh Toan</div>
            <div className='category-table mt-4 mx-2'>
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>id Don Hang</th>
                        <th>Mã Thanh Toán</th>
                        <th>Chủ Thẻ</th>
                        <th >Loại Thẻ</th>
                        <th >Số Thẻ</th>
                        <th >Loại Sản Phẩm</th>
                        <th >Giá tiền</th>
                        <th style={{width:"100px"}}>Ngày Thanh Toán</th>
                    </tr>
                    {
                    arrThanhToan && arrThanhToan.map((item,index) =>{
                    return(
                        <>
                            <tr onClick={() => this.showChiTiet(item)}>
                                <td>{item.id}</td>
                                <td>{item.id_donhang}</td>
                                <td>{item.payment_no}</td>   
                                <td>{item.card_name}</td>    
                                <td>{item.card_brand}</td>
                                <td>{item.card_number}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{this.formatDate(item.created_at)}</td>
                                
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
                                 <button class="page-link"  onClick={() =>this.pagePev()} >Previous</button>
                                 </li>
                            }
                            {arrPagetion}
                          {
                            this.state.TongTrang == this.state.page ?
                            <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Next</button>
                                 </li>
                                 :
                            <li class="page-item ">
                             <button class="page-link" onClick={() => this.pageNext()}>Next</button>
                             </li>
                          }    
                        </ul>
                    </nav>
               
            </div>
            <Modal 
         isOpen={this.state.isOpenModal}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Chi Tiết Thanh Toan</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                        <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>ID</span> : {this.state.id}</h5>
                               </div>
                        <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>ID Đơn Hàng</span> : {this.state.id_donhang}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>MÃ Thanh Toán</span> : {this.state.payment_no}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Chủ Thẻ</span> : {this.state.card_name}</h5>
                               </div>

                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Loại Thẻ</span> : {this.state.card_brand}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Số Thẻ</span> : {this.state.card_number}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Loại Sản Phẩm</span> : {this.state.description}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Giá Tiền</span> : {this.state.amount}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>Ngày Thanh Toán</span> : {this.formatDate(this.state.created_at)}</h5>
                               </div>
                 
                           
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                
                <Button color="danger" className='px-2' onClick={()=>this.toggle()}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThanhToan9Pay);
