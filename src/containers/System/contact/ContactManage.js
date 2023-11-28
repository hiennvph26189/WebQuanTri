import axios  from "../../../axios";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { GET_ALL_CONTACT,PUT_PHANHOI_LIENHE } from '../../../API';
import Moment from 'moment';
import fr from "moment/locale/fr";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

class ContactManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrContact: [],
            isOpenModal: false,
            isOpenModal2: false,
            email:'',
            phanhoi:'',
            id:0,
            tieude:'',
            TongTrang: 0,
            page: 1,
            comment: '',
            name:'',
            phanhoi_admin:'',
            createdAt:'',
            updatedAt:'',
            
        }

    }

    componentDidMount() {
        this.CallapiContact();
    }

    CallapiContact = async() => {
        await axios.get(`${GET_ALL_CONTACT}?page=${this.state.page}`).then((res) => {
            console.log(res)
             if (res.errCode == 0) {
                  this.setState({
                    TongTrang : res.totalCount,
                    arrContact: res.lienhe

                 });
                 console.log(res);
             }
         }).catch((error) => { console.log(error) });
    }
    handlePhanHoi = (item) => {
        this.setState({
            isOpenModal: true,
            email: item.email,
            id: item.id,

         });
         console.log(item);
      
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY HH:mm:ss");
        return newFr
    }
    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggle2 = () => {
        this.setState({
            isOpenModal2: !this.state.isOpenModal2
        })
    }
    handleOnChageInput = (event, id) => {
        // console.log(event.target.value,id)
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        
    }
    handlePostPhanHoi = async() => {
        let data = {
            id: this.state.id,
            email: this.state.email,
            phanhoi: this.state.phanhoi,
            tieude: this.state.tieude,
        }
        await axios.put(PUT_PHANHOI_LIENHE,data).then((res) => {
            console.log(res)
             if (res.errCode == 0) {
                  this.setState({
                   email: '',
                   id:0,
                   phanhoi:'',
                   tieude:''
                 });
                 this.toggle();
                 toast.success("Gửi Thành công")
                 this.CallapiContact();
             }else{
                toast.error("Gửi Thất Bại")
             }
         }).catch((error) => { console.log(error) });
    }
    pagePev = () => {
        this.CallapiContact()
        this.setState({
            page: this.state.page -1
        })
    }
    pageNext = () => {
        this.CallapiContact()
        this.setState({
            page: this.state.page +1
        })
    }
    showChiTiet = (item) => {
        this.setState({
            isOpenModal2: true,
            email: item.email,
            id: item.id,
            comment: item.comment,
            name: item.name,
            phanhoi_admin: item.phanhoi_admin,
            createdAt: item.createdAt,
            updatedAt:item.updatedAt,

         });
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
                    onClick={() => {this.CallapiContact()
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
                    onClick={() => {this.CallapiContact()
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
        let arrContact = this.state.arrContact;
        console.log("logg>>>>>>>>>>>.", this.state.phanhoi, this.state.tieude);
        return (
            <div className="container category-container">   
            <div className='title text-center'> Read Category</div>
            <div className='category-table mt-4 mx-2'>
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th>id</th>
                        <th style={{width:'150px'}} >Tên</th>
                        <th >Email</th>
                        <th style={{width:"300px"}}>Comment</th>
                        <th style={{width:"300px"}}>Phản Hồi</th>
                        <th style={{width:"100px"}}>Ngày Gửi</th>
                        <th>Ngày Phản Hồi</th>
                        <th>Action</th>

                    </tr>
                    {
                    arrContact && arrContact.map((item,index) =>{
                    return(
                        <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td onClick={() => this.showChiTiet(item)} style={{cursor:"pointer"}}>{item.email}</td>
                                <td>{item.comment}</td>
                                <td>{item.phanhoi_admin}</td>
                                <td>{this.formatDate(item.createdAt)}</td>
                                <td>{this.formatDate(item.updatedAt)}</td>
                                <td className='action'>
                                <button onClick={()=>this.handlePhanHoi(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
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
            <ModalHeader toggle={()=>this.toggle()}>Trả Lời Phản Hồi</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                        <div className='col-12 form-group mg-top'>
                            <h5>Email : {this.state.email}</h5>
                               </div>
                        <div className='col-12 form-group mg-top'>
                                <input type="text" className="form-control" placeholder='Tiêu Đề' onChange={(event)=>this.handleOnChageInput(event,'tieude')} name="tieude" value={this.state.tieude}/>
                            </div>
                            <div className='col-12 form-group mg-top'>
                                <textarea style={{height:'300px'}} type="text" className="form-control" placeholder='Trà Lời Phản Hồi' onChange={(event)=>this.handleOnChageInput(event,'phanhoi')} name="phanhoi" value={this.state.phanhoi}/>
                            </div>
                           
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handlePostPhanHoi()}>
                    Trả Lời Phản Hồi
                </Button>{' '}
                <Button color="danger" className='px-2' onClick={()=>this.toggle()}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

       


        <Modal 
         isOpen={this.state.isOpenModal2}
         toggle={()=>this.toggle2()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle2()}>Chi Tiết Comment</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                        <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>Tên Khách Hàng</span> : {this.state.name}</h5>
                               </div>
                        <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>Email</span> : {this.state.email}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Comment</span> : {this.state.comment}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{color:'red',fontWeight:'600'}}>Phản Hồi</span> : {this.state.phanhoi_admin}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>Ngày Gửi</span> : {this.formatDate(this.state.createdAt)}</h5>
                               </div>
                               <div className='col-12 form-group mg-top'>
                            <h5><span style={{fontWeight:'600'}}>Ngày Trả Lời</span> : {this.formatDate(this.state.updatedAt)}</h5>
                               </div>
                           
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                
                <Button color="danger" className='px-2' onClick={()=>this.toggle2()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactManage);
