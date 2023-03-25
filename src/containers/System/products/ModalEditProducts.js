import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../../utils/emitter';
import {CommonUtils} from '../../../utils/';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllProducts } from '../../../services/productsService';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import  './product.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';
import axios  from "../../../axios";
class ModalEditProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCategories2: [],
           isOpenImage: false,
           tenSp: '',
           hangSx: '',
           giaSanPham: '',
           idDanhSach: '',
           hot: false,
           sale: 0,
           soLuong: 0,
           privewImageUrl: '',
           sale: 0,
           mota: "",
            image: [],
            file:[]

        }
        

    }
    
    getAllCategoryfromReact = async()=>{
        let response = await getAllProducts();

         this.setState({
            arrCategories: response.categories
         }) 
        
        
    }
    async componentDidMount () {
      
       this.props.getCategoriesStart()
       const arr = []
       let products = this.props.currentProducts
        if(products && !_.isEmpty(products)){
            if(products.image){
                let list = JSON.parse(products.image)
                this.setState({
                    file: list
                })
                
            }
            this.setState ( {
                tenSp: products.tenSp,
                hangSx: products.hangSx,
                giaSanPham: products.giaSanPham,
                idDanhSach: products.idDanhSach,
                hot: products.hot === 1?true:false,
                sale: products.sale,
                soLuong: products.soLuong,
                mota: products.mota,
                id: products.id,
               
                
            })
        }
        
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
        let arrInput = ['tenSp','hangSx','giaSanPham','idDanhSach','mota']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
     handleEditProducts = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            this.props.updateProducts({
                tenSp: this.state.tenSp,
                hangSx: this.state.hangSx,
                giaSanPham: this.state.giaSanPham,
                idDanhSach: this.state.idDanhSach,
                hot: this.state.hot?1:0,
                sale: this.state.sale,
                mota: this.state.mota,
                soLuong: this.state.soLuong,
                id: this.state.id,
                image: JSON.stringify(this.state.file)

            })
            this.setState({
                tenSp: '',
                hangSx: '',
                giaSanPham: '',
                soLuong: 0,
                idDanhSach: '',
                hot: false,
                sale: 0,
                privewImageUrl: '',
                sale: 0,
                mota: "",
                id: '',
                file:[],
                isCreateProducts: true,
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
        const COUND_NAME = 'djh5ubzth'
        const PRESET_NAME = 'b6oxas4h'
        const FOLDER_NAME = 'UploadFile'
        const url = []
        const data = even.target.files;
        const api = `https://api.cloudinary.com/v1_1/${COUND_NAME}/image/upload`
        const fromData = new FormData();
        
         const checkfile = 0   
        
       if(data){
        for(let i = 0; i < data.length; i++){
           if(data.length <=10 ){
                fromData.append('upload_preset',PRESET_NAME)
                fromData.append("folder",FOLDER_NAME)
                fromData.append('file',data[i])
            
                await axios.post(api,fromData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) =>{
                    url.push(res.secure_url)  
                
            })

           }else{
            alert("Không được quá 10 ảnh")
            break;
        
        }
        }
        if(this.state.file){
            this.setState({
                file: [...this.state.file, ...url]
            })
        }else{
            this.setState({
                file: [ ...url]
            })
        }
       
       }
        
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
        let arrCategories = this.state.arrCategories2
        let isloading = this.props.isLoading
        let url = this.state.file
        // let lenghtImage = 0
        // for(let i = 0; i<=url.length;i++){
        //     lenghtImage = url.length
        // }
        console.log(this.state.file,'arrray')
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
            <ModalHeader toggle={()=>this.toggle()}>Create New Products</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div>{isloading === true? 'loadding':''}</div>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Tên sản phẩm</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'tenSp')} name="tenSp" value={this.state.tenSp}/>
                            </div> 
                            <div className='col-12 form-group mg-top'>
                                <label>Hãng sản xuất</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'hangSx')} name="hangSx" value={this.state.hangSx}/>
                            </div>
                            
                            <div className=' col-12 row'>
                                <div className='col-3 form-group  mg-top'>
                                <label for="inputState">Danh Mục</label>
                                    <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'idDanhSach')} value={this.state.idDanhSach}>
                                    <option selected value="">---- Chọn danh mục -----</option>
                                    {arrCategories && arrCategories.map((item,index) =>{
                                        return( 

                                            <>
                                                <option  value={item.id}>{item.name}</option>
                                            </> 
                                            
                                        )})}
                                   
                                    </select>
                                    
                                </div>
                                <div className='col-3 form-group mg-top'>
                                <label>Giá sản phẩm</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'giaSanPham')} name="giaSanPham" value={this.state.giaSanPham}/>
                                
                            </div>
                            <div className='col-3 form-group mg-top'>
                                <label>Giảm giá (%)</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'sale')} name="name" value={this.state.sale}/>
                            </div>
                            <div className='col-3 form-group mg-top'>
                                <label>soLuong</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'soLuong')} name="name" value={this.state.soLuong}/>
                            </div>
                            </div>
                            <div className=' col-12 row'>
                                <div className='col-3 form-group mg-top'>
                                    <label>Ảnh</label>
                                    <div className='upload-image'>
                                        <label htmlFor='taianh' className='text_image'>Tải ảnh <i class="fas fa-upload"></i></label>
                                        <input id='taianh' hidden type="file" onChange={(e)=>this.handleImage2(e,"image")} multiple />
                                    </div>
                                    
                                </div>
                             
                                
                               
                            </div>
                            <div className='flex  col-12 row ' >
                                {url && url.map((item,index) =>{
                                        return( 
                                    <>
                                        <div className='col-4 ' key={item} style={{position:"relative",marginTop:'10px'}} >
                                            <img   style={{ maxWidth:'230px'}} onClick={()=>this.openImage()} src={item}/>
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
                                        </div>
                                    </>   
                                )})}
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
                        <div className='col-12 form-group mg-top'>
                                <label >Mô tả</label>
                                <CKEditor
                                editor = {ClassicEditor}
                                data={this.state.mota}
                                        
                                onChange={( event, editor ) => {
                                    const data = editor.getData();
                                    this.setState({
                                        mota: data
                                    })
                                }}
                />
                              
                            </div>
                    </div>
                    {this.state.isOpenImage === true && <Lightbox
                        mainSrc={this.state.privewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                       
                    />}
                    
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleEditProducts()}>
                    Edit Products
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
        categoriesRedux: state.admin.categories,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
        updateProducts: (data)=> dispatch(actions.updateProducts(data)),
        fetchProducts: ()=> dispatch(actions.fetchProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProducts);




