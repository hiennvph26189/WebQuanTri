import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../../utils/emitter';
import {CommonUtils} from '../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllMembers } from '../../../services/membersService';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import  './product.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';
import axios  from "../../../axios";
class ModalEditMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCategories2: [],
           isOpenImage: false,
           tenThanhVien: '',
           email: '',
           soDienThoai: '',
           gioiTinh: '',
           hot: false,
           diaChi: "",
           soLuong: 0,
           privewImageUrl: '',
          
           mota: "",
            image: [],
            file:[]

        }
        

    }
    
    getAllCategoryfromReact = async()=>{
        // let response = await getAllMembers();

        //  this.setState({
        //     arrCategories: response.categories
        //  }) 
        
        
    }
    async componentDidMount () {
      
    //    this.props.getCategoriesStart()
    //    const arr = []
    //    let members = this.props.currentMembers
    //     if(members && !_.isEmpty(members)){
    //         if(members.image){
    //             let list = JSON.parse(members.image)
    //             this.setState({
    //                 file: list
    //             })
                
    //         }
    //         this.setState ( {
    //             tenThanhVien: members.tenThanhVien,
    //             email: members.email,
    //             soDienThoai: members.soDienThoai,
    //             gioiTinh: members.gioiTinh,
    //             hot: members.hot === 1?true:false,
    //             diaChi: members.diaChi,
    //             soLuong: members.soLuong,
    //             mota: members.mota,
    //             id: members.id,
               
                
    //         })
    //     }
        
    }
    toggle = () => {
        
        this.props.toggleFromParent()
    }
    handleOnChageInput = (event, id) => {
        // console.log(event.target.value,id)
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        
    }
    checkValidateInput = ()=>{
        let isValid = true;
        let arrInput = ['tenThanhVien','email','soDienThoai','gioiTinh','mota']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
     handleEditMembers = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            this.props.updateMembers({
                tenThanhVien: this.state.tenThanhVien,
                email: this.state.email,
                soDienThoai: this.state.soDienThoai,
                gioiTinh: this.state.gioiTinh,
                hot: this.state.hot?1:0,
                diaChi: this.state.diaChi,
                mota: this.state.mota,
                soLuong: this.state.soLuong,
                id: this.state.id,
                image: JSON.stringify(this.state.file)

            })
            this.setState({
                tenThanhVien: '',
                email: '',
                soDienThoai: '',
                soLuong: 0,
                gioiTinh: '',
                hot: false,
                diaChi: 0,
                privewImageUrl: '',
                diaChi: 0,
                mota: "",
                id: '',
                file:[],
                isCreateMembers: true,
            })
           
            
            this.props.toggleFromParent()
        }
       
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if(prevProps.categoriesRedux !== this.props.categoriesRedux){
            this.setState({
                arrCategories2: this.props.categoriesRedux
            })
        }
    }
    handleImage = async(evenr)=>{
        let data = evenr.target.files;
    
        let file = data[0];
        
        
        if(file){
            let base64 = await CommonUtils.getBase64(file)
            let objUrl = URL.createObjectURL(file);
            this.setState({
                privewImageUrl:objUrl,
                file: base64
            })
            
        }
        
    }
    handleImage2 =async (even)=>{
    //     const COUND_NAME = 'djh5ubzth'
    //     const PRESET_NAME = 'b6oxas4h'
    //     const FOLDER_NAME = 'UploadFile'
    //     const url = []
    //     const data = even.target.files;
    //     const api = `https://api.cloudinary.com/v1_1/${COUND_NAME}/image/upload`
    //     const fromData = new FormData();
        
    //      const checkfile = 0   
        
    //    if(data){
    //     for(let i = 0; i < data.length; i++){
    //        if(data.length <=10 ){
    //             fromData.append('upload_preset',PRESET_NAME)
    //             fromData.append("folder",FOLDER_NAME)
    //             fromData.append('file',data[i])
            
    //             await axios.post(api,fromData,{
    //                 headers:{
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             }).then((res) =>{
    //                 url.push(res.secure_url)  
                
    //         })

    //        }else{
    //         alert("Không được quá 10 ảnh")
    //         break;
        
    //     }
    //     }
    //     if(this.state.file){
    //         this.setState({
    //             file: [...this.state.file, ...url]
    //         })
    //     }else{
    //         this.setState({
    //             file: [ ...url]
    //         })
    //     }
       
    //    }
        
    }
    openImage = () => {
        if (this.state.privewImageUrl){
            this.setState({
                isOpenImage: true
            })
           
        }
       
    }
    CheckInput = ()=>{
        this.setState({
            hot: !this.state.hot
        })
    }
    DeleteImage=(image)=>{
        if(image){
           let arr = [...this.state.file]
           this.setState({
                file: arr.filter(item => item !== image)
           })
           
            console.log(this.state.file,"adhfahd")
        }
    }
    render() {  
        
        // let isloading = this.props.isLoading
        // let url = this.state.file
        
        // for(let i = 0; i<=url.length;i++){
        //     lenghtImage = url.length
        // }
        // console.log(this.state.file,'arrray')
        // console.log(arrCategories,"sdaljfla")
        // console.log(this.props.isLoading)
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Create New Members</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div></div>
                        <div className=''>
                            <div className='col-12 row mg-top'>
                                <div className='col-6 form-group'>
                                    <label>Họ và tên</label>
                                    <input type="text" className="form-control" placeholder='Nhập tên' onChange={(event)=>this.handleOnChageInput(event,'tenThanhVien')} name="tenThanhVien" value={this.state.tenThanhVien}/>
                                </div>
                                <div className='col-6 form-group '>
                                    <label>Email</label>
                                    <input disabled type="text" className="form-control" placeholder='Nhập email' onChange={(event)=>this.handleOnChageInput(event,'email')} name="email" value={this.state.email}/>
                                </div>
                            </div> 
                            
                            
                            <div className=' col-12 row'>
                                <div className='col-3 form-group  mg-top'>
                                <label for="inputState">Giới tính</label>
                                   

                                    {this.state.gioiTinh&&this.state.gioiTinh === 1 &&
                                         <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'gioiTinh')} value={this.state.gioiTinh}>
                                            <option   value="0">---- Chọn giới tính -----</option>
                                            <option selected value="1">Nam</option>
                                            <option  value="2">Nữ</option>
                                            <option  value="3">Khác</option>
                                         </select>
                                    }
                                    {this.state.gioiTinh&&this.state.gioiTinh === 2 &&
                                         <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'gioiTinh')} value={this.state.gioiTinh}>
                                            <option   value="0">---- Chọn giới tính -----</option>
                                            <option  value="1">Nam</option>
                                            <option selected  value="2">Nữ</option>
                                            <option  value="3">Khác</option>
                                         </select>
                                    }
                                    {this.state.gioiTinh&&this.state.gioiTinh === 3 &&
                                         <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'gioiTinh')} value={this.state.gioiTinh}>
                                            <option   value="0">---- Chọn giới tính -----</option>
                                            <option  value="1">Nam</option>
                                            <option  value="2">Nữ</option>
                                            <option selected value="3">Khác</option>
                                         </select>
                                    }
                                    {this.state.gioiTinh&&this.state.gioiTinh === 0 &&
                                         <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'gioiTinh')} value={this.state.gioiTinh}>
                                            <option selected  value="0">---- Chọn giới tính -----</option>
                                            <option  value="1">Nam</option>
                                            <option  value="2">Nữ</option>
                                            <option  value="3">Khác</option>
                                         </select>
                                    }
                                    
                                    
                                </div>
                                <div className='col-3 form-group mg-top'>
                                <label>Số điện thoại</label>
                                <input type="text" className="form-control" placeholder='Nhập số điện thoại' onChange={(event)=>this.handleOnChageInput(event,'soDienThoai')} name="soDienThoai" value={this.state.soDienThoai}/>
                                
                            </div>
                            <div className='col-6 form-group mg-top'>
                                <label>Địa chỉ</label>
                                <input type="text" className="form-control" placeholder='Nhập địa chỉ' onChange={(event)=>this.handleOnChageInput(event,'diaChi')} name="name" value={this.state.diaChi}/>
                            </div>
                           
                            </div>
                            <div className='col-12'>
                                    <div className='col-6'>

                                    </div>
                            </div>
                            <div className=' col-12 row'>
                                <div className='col-3 form-group mg-top'>
                                    <label>Ảnh Avarta</label>
                                    <div className='upload-image'>
                                        <label htmlFor='taianh' className='text_image'>Tải ảnh <i class="fas fa-upload"></i></label>
                                        <input id='taianh' hidden type="file" onChange={(e)=>this.handleImage2(e,"image")} multiple />
                                    </div>
                                    
                                </div>
                             
                                
                               
                            </div>
                            <div className='flex  col-12 row ' >
                               
                                        {/* <div className='col-4 ' key={item} style={{position:"relative",marginTop:'10px'}} >
                                            <img   style={{ maxWidth:'230px'}} onClick={()=>this.openImage()} src={item.anhDaiDien}/>
                                            <span onClick={()=>this.DeleteImage(item)} className='p-2 cursor-pointer hover:bg-gray-400' style={{   
                                                position: 'absolute',
                                                cursor: "pointer",
                                                right:'0%',
                                                top: '-7%',
                                                color: 'red',
                                                borderRadius: '50%',
                                                background: '#ccc',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                
                                            }}
                                                >
                                                    <i className="fas fa-trash"></i></span>
                                        </div> */}
                                 
                                </div>
                            <div class="form-group form-check col-3 mg-top">
                                   
                                   <label class="form-check-label" for="exampleCheck1">Sản phẩm Hot</label>
                                   {this.state.hot === true?
                                        <input type="checkbox"  class="form-check-input" id="exampleCheck1"  onClick={()=>this.CheckInput()}  checked />
                                        :
                                        <input type="checkbox"  class="form-check-input" id="exampleCheck1"  onClick={()=>this.CheckInput()}/>
                                    }
                                   
                               </div>
                           
                        </div>
                        
                    </div>
                    {this.state.isOpenImage === true && <Lightbox
                        mainSrc={this.state.privewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                       
                    />}
                    
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleEditMembers()}>
                    Edit Members
                </Button>{' '}
                <Button color="danger" className='px-2' onClick={()=>this.toggle()}>
                    Cancel
                </Button>

            </ModalFooter>
        </Modal>
        )
    }
}


const mapStateToProps = state => {
    return {
        // categoriesRedux: state.admin.categories,
        // isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
        // updateMembers: (data)=> dispatch(actions.updateMembers(data)),
        // fetchMembers: ()=> dispatch(actions.fetchMembers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMembers);




