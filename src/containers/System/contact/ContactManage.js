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
            email:'',
            phanhoi:'',
            id:0,
            tieude:''
            
        }

    }

    componentDidMount() {
        this.CallapiContact();
    }

    CallapiContact = async() => {
        await axios.get(GET_ALL_CONTACT).then((res) => {
            console.log(res.data)
             if (res.errCode == 0) {
                  this.setState({
                    arrContact: res.data

                 });

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
             }else{
                toast.error("Gửi Thất Bại")
             }
         }).catch((error) => { console.log(error) });
    }
        render() {
        let arrContact = this.state.arrContact;
        console.log("logg>>>>>>>>>>>.", this.state.phanhoi, this.state.tieude);
        return (
            <div className="container category-container">   
            <div className='title text-center'> Read Category</div>
            <div className='mx-2'>
                <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewCategory()}> <i className='fas fa-plus px-2'></i>Add new category</button>
            </div>
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
                                <td>{item.email}</td>
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
                </tbody></table>
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
