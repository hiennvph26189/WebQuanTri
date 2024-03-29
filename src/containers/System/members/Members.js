import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalMembers from './ModalMembers';
import ModalEditMembers from './ModalEditMembers';
import ModalDanhSachNap from './ModalDanhSachNap';
import ModalDeleteMember from './ModalDeleteMember';
import { getAllMembers } from '../../../services/membersService';
import * as actions from '../../../store/actions'
import CurrencyFormat from 'react-currency-format';
import axios  from "../../../axios";
import  './product.scss';
import { SEACRH_MEMBERS } from '../../../API';

class Members extends Component {

    constructor(props) {
        super(props);
        this.state={
           
            arrMembers: [],
            isOpenModal: false,
            isOpenEditMembersModal: false,
            membersEdit:{},
            isOpenModalDanhSachNap: false,
            isOpenModalDeleteMember: false,
            idMember: {},
            id:'',
            page:1,
            totalCount:0,
            search:"",
            countPageSearch: 0,
            pageSearch:1,
        }
    }   
    async componentDidMount() {
      this.props.fetchMembers(this.state.page)
        this.getALLMember(1)
              
       
    }
    getALLMember = async(page)=>{
      let data = await  getAllMembers(page)
     
      this.setState({
        totalCount:data.totalCount,
        arrMembers: data.data
      })
    }
    clickPage = async(page)=>{
       
        let data = await  getAllMembers(page)
       
        this.setState({
          totalCount:data.totalCount,
          arrMembers: data.data
        })
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
    pagePev = async(page) => {
        let data = await  getAllMembers(page)
       
        this.setState({
          totalCount:data.totalCount,
          arrMembers: data.data
        })
        this.setState({
            page: page
        })
    }
    pageNext = async(page) => {
        let data = await  getAllMembers(page)
       
        this.setState({
          totalCount:data.totalCount,
          arrMembers: data.data
        })
        this.setState({
            page: page
        })
    }
    handleEditMembersNapTien=(item)=>{
        
        this.setState({
            isOpenModalDanhSachNap: true,
            idMember: item.id
        })
        
        console.log(this.state.idMember,"sale")
        
        
        
    }
    
    toggleMembersModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal,
           
        })
    }
    toggleMembersNapTienModal = ()=>{
        this.setState({
            isOpenModalDanhSachNap:!this.state.isOpenModalDanhSachNap
        })
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        // console.log(prevProps.membersRedux,"prevProps")
        
            if(prevProps.membersRedux !== this.props.membersRedux){
                console.log("OK")
                this.setState({
                    arrMembers: this.props.membersRedux
                })
                
                
            }
           
       
       
    }
    handleDeleteMembers = (id)=>{
        this.setState({
            isOpenModalDeleteMember: !this.state.isOpenModalDeleteMember,
            id: id,
        })
    }
    toggleMembersDlete = ()=>{
        this.setState({
            isOpenModalDeleteMember:!this.state.isOpenModalDeleteMember
        })
    }

    timKiemSanPham = async(event)=>{
        let key_search = event.target.value
        this.setState({
            search: event.target.value
        })
        if(key_search !=""){
            await axios.get(`${SEACRH_MEMBERS}?key_search=${key_search}&page=${this.state.pageSearch}`).then((res)=>{
               if(res.errCode == 0){
                    this.setState({
                        arrMembers : res.data,
                        countPageSearch: res.totalCount
                    })
               }else{
                    this.setState({
                        arrMembers : [],
                        countPageSearch: 0
                    })
               }
            }).catch((err)=>{console.log(err);})
        }else{
            this.setState({
                search:""
            })
            this.getALLMember(1);
        }
       
        
    }

    clickPatigationSearch = async(page)=>{
        let search = this.state.search
        await axios.get(`${SEACRH_MEMBERS}?key_search=${search}&page=${page}`).then((res)=>{
            if(res.errCode == 0){
                 this.setState({
                     arrMembers : res.data,
                     countPageSearch: res.totalCount
                 })
            }
         }).catch((err)=>{console.log(err);})
    }
    render() {
        let countPageSearch = this.state.countPageSearch

        let pageButtonsSearch = []

        let arrMembers = [...this.state.arrMembers]
        let arrPagetion = [];
        for ( let i = 1; i <= this.state.totalCount; i++){
            console.log(i)
            arrPagetion.push(
                <>
                {
                i === this.state.page?
                <li class="page-item disabled">
                <button class="page-link"
                key={i}
                onClick={() => {this.clickPage(i)
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
                onClick={() => {this.clickPage(i)
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

        for (let i = 1; i <= countPageSearch; i++) {
            pageButtonsSearch.push(
                <>{
                    i === this.state.page?
                    <li class="page-item disabled">
                    <button class="page-link"
                    key={i}
                    onClick={() => {this.clickPatigationSearch(i)
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
                    onClick={() => {this.clickPatigationSearch(i)
                        this.setState({
                            page: i
                        })
                    }  }
                
                >
                {i}
              </button></li>
                }
                 
                </>
               
              
            );
           
          }
        return (
            <div className="container members-container">
            <ModalMembers
                isOpen = {this.state.isOpenModal}
                test = {'abc'}
                toggleFromParent = {this.toggleMembersModal}
                createNewMembers = {this.createNewMembers}
            />
            {
                this.state.isOpenModalDanhSachNap&&
            
            <ModalDanhSachNap
                isOpen = {this.state.isOpenModalDanhSachNap}
                toggleFromParentNapTien = {this.toggleMembersNapTienModal}
                currentMembersNapTien = {this.state.idMember}
            />
        }

            {
                this.state.isOpenEditMembersModal&&
         
                <ModalEditMembers
                isOpen = {this.state.isOpenEditMembersModal}
                toggleFromParent = {this.toggleEditMembersModal}
                currentMembers = {this.state.membersEdit}
                getALLMember= {this.getALLMember}
                page = {this.state.page}
                 
            />
            }
             {
                this.state.isOpenModalDeleteMember&&
         
                <ModalDeleteMember
                isOpen = {this.state.isOpenModalDeleteMember}
                toggleFromParent = {this.toggleMembersDlete}
                currentMembersId = {this.state.id}

                
                 
            />
            }
            
             
            <div className='title text-center'> Read Members</div>
            <div style={{display:'flex'}} className='mx-2'>
                <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewMembers()}> <i className='fas fa-plus px-2'></i>Add new members</button>
                <div class="row mt-10 col-8">
                    <div class="col-md-5 mx-auto">
                        
                        <div class="input-group">
                            <input class="form-control  border" onChange={(event)=>this.timKiemSanPham(event)} type="search" value={this.state.search} placeholder='Tìm kiếm email người dùng' id="example-search-input"/>
                            <span class="input-group-append">
                                
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='members-table mt-4 mx-2'>
                
            <table id="customers" class="ws-table-all px-5">
                <tbody>
                    <tr>
                        <th >Ảnh</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th >Số điện thoại</th>
                        <th>Tiền tài khoản</th>
                        <th >Tiền nạp</th>
                        <th>Trạng thái</th>
                        
                        
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
                                
                                <td>{item.tienTk}</td>
                                <td>
                                    <button onClick={()=>this.handleEditMembersNapTien(item)} class="btn  mx-1 px-2 btn-warning">Nạp tiền</button>
                                </td>
                                
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
                                    <td  className='text-warning'>
                                        Đang chờ xác nhận nạp tiền
                                    </td>
                                }
                                 {item.status === 3 &&
                                    <td  className='text-danger'>
                                        Đang Khóa nạp tiền
                                    </td>
                                }


                                <td className='action'>
                                <button onClick={()=>this.handleEditMembers(item)} class="btn btn-success mx-1 px-2 ">Edit</button>

                                {/* N<button  onClick={()=>this.handleDeleteMembers(item.id)} class="btn btn-danger  px-2">Delete</button> */}
                                
                                </td>
                            </tr>
                        </>
                    )
                     
                })}
                
                
              
                    
                    
                </tbody>
                </table>
                {this.state.search !="" ? <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            
                            {pageButtonsSearch}
                            
                           
                           
                        </ul>
                    </nav>
                    :
                <nav aria-label="Page navigation example" style={{marginTop:'10px'}}>
                        <ul class="pagination">
                            {this.state.page === 1?
                                 <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Previous</button>
                                 </li>
                            :
                            <li class="page-item ">
                                 <button class="page-link"  onClick={() =>this.pagePev(this.state.page -1)} >Previous</button>
                                 </li>
                            }
                            {arrPagetion}
                          {
                            this.state.totalCount == this.state.page ?
                            <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Next</button>
                                 </li>
                                 :
                            <li class="page-item ">
                             <button class="page-link" onClick={() => this.pageNext(this.state.page +1)}>Next</button>
                             </li>
                          }    
                        </ul>
                    </nav>
                    }
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
       
        fetchMembers: (page)=> dispatch(actions.fetchMembers(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
