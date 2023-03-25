import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalMembers from './ModalMembers';
import ModalEditMembers from './ModalEditMembers';
import { getAllMembers } from '../../../services/membersService';
import * as actions from '../../../store/actions'
import CurrencyFormat from 'react-currency-format';
class Members extends Component {

    constructor(props) {
        super(props);
        this.state={
            arrMembers: [],
            isOpenModal: false,
            isOpenEditMembersModal: false,
            membersEdit:{}
        }
    }
    async componentDidMount() {
        this.props.fetchMembers()
       
       
    }
    toggleEditMembersModal = ()=>{
        this.setState({
            isOpenEditMembersModal: !this.state.isOpenEditMembersModal
        })
    }
    handleAddNewMembers = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    handleEditMembers=(product)=>{
        this.setState({
            isOpenEditMembersModal: true,
            membersEdit: product
        })
        
    }
    toggleMembersModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    componentDidUpdate(prevProps, prevState,snapshot) {
        // console.log(prevProps.membersRedux,"prevProps")
        setTimeout(() =>{
            if(prevProps.membersRedux !== this.props.membersRedux){
                console.log("OK")
                this.setState({
                    arrMembers: this.props.membersRedux
                })
                console.log(this.state.arrMembers,"arrr")
                
            }
        },1)    
       
       
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
        console.log(this.state.arrMembers,"arrr2")
        let arrMembers = [...this.state.arrMembers]
        
        return (
            <div className="container members-container">
            <ModalMembers
                isOpen = {this.state.isOpenModal}
                test = {'abc'}
                toggleFromParent = {this.toggleMembersModal}
                createNewMembers = {this.createNewMembers}
            />
            {this.state.isOpenEditMembersModal &&
                <ModalEditMembers
                isOpen = {this.state.isOpenEditMembersModal}
                toggleFromParent = {this.toggleEditMembersModal}
                currentMembers = {this.state.membersEdit}
                 
            />
                
            }
             
            <div className='title text-center'> Read Members</div>
            <div className='mx-2'>
                <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewMembers()}> <i className='fas fa-plus px-2'></i>Add new members</button>
            </div>
            <div className='members-table mt-4 mx-2'>
            <table id="customers" class="ws-table-all px-5">
                <tbody>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Tiền tài khoản</th>
                        <th>Trạng thái</th>
                        <th>Giới tính</th>
                        
                        <th>Action</th>
                    </tr>
                    {
                    arrMembers && arrMembers.map((item,index) =>{
                    return(
                        <>
                            <tr>
                                <td style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {item.anhDaiDien&&
                                    <img style={{maxWidth:'120px',}} src={item.anhDaiDien}/> 
                                }
                                
                                </td>
                                
                                <td>{item.tenThanhVien}</td>
                                
                                <td>{item.email}</td>
                                <td>{item.soDienThoai}</td>
                                <td>{item.diaChi}</td>
                                <td>{item.tienTk}</td>
                                {
                                    item.gioiTinh&&item.gioiTinh === 1 &&
                                    <td>Nam</td>
                                }
                                {
                                    item.gioiTinh&&item.gioiTinh === 2 &&
                                    <td>Nữ</td>
                                }
                                {
                                    item.gioiTinh&&item.gioiTinh === 3 &&
                                    <td>Khác</td>
                                }
                                
                                {item.status === 0 &&
                                    <td className='text-success'>
                                        Đang hoạt động
                                    </td>
                                }
                                {item.status === 2 &&
                                    <td className='text-danger'>
                                        Tài khoản đang bị khóa
                                    </td>
                                }
                                {item.status === 1 &&
                                    <td className='text-danger'>
                                        Đang chờ xác nhận nạp tiền
                                    </td>
                                }
                                

                                
                                <td className='action'>
                                <button onClick={()=>this.handleEditMembers(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                <button onClick={()=>this.handleDeleteMembers(item.id)} class="btn btn-danger  px-2">Delete</button>
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
        membersRedux: state.admin.members,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
        fetchMembers: ()=> dispatch(actions.fetchMembers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
