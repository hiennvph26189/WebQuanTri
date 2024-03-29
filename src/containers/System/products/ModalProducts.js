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
import axios  from "../../../axios";
import { GET_ALL_HANGSX } from '../../../API';


class ModalProducts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           arrHangSx:[],
            arrCategories2: [],
           privewImageUrl: '',
           isOpenImage: false,
           checkedItemsSizes:[],
           checkedItemsSizesNumber: [],
           tenSp: '',
           hangSx: '',
           soLuong: 0,
           giaSanPham: '',
           idDanhSach: '',
           giaNhap: '',
           tenHang:"",
           hot: false,
           sale: 0,
           image: "",
           image2: "",
           sale: 0,
           mota: "",
           status: 0,
           sizeQuantities: {},
            file: [],
            file2: []

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
       this.getAllHangSX()
       console.log("LSK:SKDKSAK");
     
    }
    getAllHangSX = async()=>{
        
       await axios.get(GET_ALL_HANGSX).then((res)=>{
            console.log(res.hangsx,":SKAK");
            if(res.errCode == 0){
                
                this.setState({
                    arrHangSx:res.hangsx
                })
            }
        }).catch((err)=>{console.log(err);})
}
    toggle = () => {
        this.setState({
            file:[]
        })
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
        let arrInput = ['tenSp','hangSx','giaSanPham','idDanhSach','giaNhap','mota','soLuong']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleAddNewProducts = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            this.props.createNewProducts({
                tenSp: this.state.tenSp,
                hangSx: this.state.hangSx,
                giaSanPham: this.state.giaSanPham,
                idDanhSach: this.state.idDanhSach,
                hot: this.state.hot?1:0,
                sale: this.state.sale,
                soLuong: this.state.soLuong,
                giaNhap: this.state.giaNhap,
                mota: this.state.mota,
                sizes: this.state.idDanhSach==56?JSON.stringify(this.state.checkedItemsSizesNumber):(this.state.checkedItemsSizes),
                image:  JSON.stringify(this.state.file),
                listSizes: JSON.stringify(this.state.sizeQuantities)

            })
            this.setState({
                tenSp: '',
                hangSx: '',
                giaSanPham: '',
                idDanhSach: '',
                hot: false,
                sale: 0,
                privewImageUrl: '',
                checkedItemsSizesNumber:{},
                checkedItemsSizes:{},
                sale: 0,
                soLuong: 0,
                giaNhap: 0,
                mota: "",
                image: '',
                file:[],
                sizeQuantities: {},
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
           
           
        }
    }
    
    handleChangeSizes = (event) => {
        const { name } = event.target;
        this.setState((prevState) => ({
          checkedItemsSizes: {
            ...this.state.checkedItemsSizes,
            [name]: !this.state.checkedItemsSizes[name], // Đảo trạng thái checkbox khi thay đổi
          },
        }));
        
      };
    handleChangeSizesNumber = (event) => {
        const { name } = event.target;
        this.setState((prevState) => ({
          checkedItemsSizesNumber: {
            ...prevState.checkedItemsSizesNumber,
            [name]: !prevState.checkedItemsSizesNumber[name], // Đảo trạng thái checkbox khi thay đổi
          },
        }));
        
      };
      handleQuantityChange = (size, quantity) => {
        // Cập nhật state theo kích thước
        this.setState((prevState) => {
          const newSizeQuantities = {
            ...prevState.sizeQuantities,
            [size]: quantity,
          };
    
          // Tính toán tổng số
          const newTotalSize = Object.values(newSizeQuantities).reduce(
            (total, qty) => total + qty,
            0
          );
    
          return {
            sizeQuantities: newSizeQuantities,
            soLuong: newTotalSize,
          };
        });
      };
    render() {
        const {arrHangSx} = this.props  
        const { sizeQuantities } = this.state;
        console.log(sizeQuantities);
        let arrCategories = this.state.arrCategories2
        let isloading = this.props.isLoading
        let url = [...this.state.file]
       
        let lenghtImage = 0
        for(let i = 0; i<=url.length;i++){
            lenghtImage = url.length
        }
        
        
        let arrSize = ["S","M","L","XL","XXL"]
        let arrSizeNumber = ['39','40','41','42','43','44','45','46','47','48','49']

        // console.log(arrCategories,"sdaljfla")
        // console.log(this.props.isLoading)
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'xl'
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
                            <div className='col-4 form-group mg-top'>
                                <label>Hãng sản xuất</label>
                                <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'hangSx')} value={this.state.hangSx}>
                                    <option selected value="">---- Chọn hãng sản xuất -----</option>
                                    {arrHangSx&&arrHangSx.length > 0&&arrHangSx.map((item, i)=>{
                                        return(
                                            <>
                                                <option  value={item.name}>{item.name}</option>
                                            </>
                                        )
                                    })
                                
                                    }
                                    </select>
                               
                            </div>
                            <div className='col-6 form-group mg-top'>
                                <label>Giá nhập</label>
                                <input type="number" className="form-control" placeholder='Giá nhập vào' onChange={(event)=>this.handleOnChageInput(event,'giaNhap')} name="giaNhap" value={this.state.giaNhap}/>
                            </div>
                            
                            <div className=' col-12 flexNewEdit'>
                                <div className='col-sm-12 col-md-3 col-sm-6 form-group  mg-top'>
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
                                <div className='col-sm-12 col-md-3 form-group mg-top' style={{marginLeft:"10px"}}>
                                <label>Giá sản phẩm</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'giaSanPham')} name="giaSanPham" value={this.state.giaSanPham}/>
                                
                            </div>
                            <div className='col-sm-12 col-md-3 form-group mg-top ' style={{marginLeft:"10px"}}>
                                <label>Giảm giá (%)</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'sale')} name="name" value={this.state.sale}/>
                            </div>
                            <div className='col-sm-12 col-md-2 form-group mg-top' style={{marginLeft:"10px"}}>
                                <label>Số lương</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'soLuong')} name="name" value={this.state.soLuong} disabled/>
                            </div>
                            </div>
                            <div className='col-sm-12 col-md-12 form-group mg-top'>
                            <label>Size:</label>
                                <div className='row'>
                                {arrSize&&this.state.idDanhSach&&
                                   
                                   arrSize.map((size)=>{
                                       return <>
                                       <div className='col-sm-12 col-md-2 form-group mg-top'>
                                           <label htmlFor={`quantity-${size}`}>{size}:</label>
                                           
                                           <input
                                                 className='form-control'
                                                 style={{ width:"70px", marginRight:"35px"}}
                                                type="number"
                                                min={0}
                                                id={`quantity-${size}`}
                                                value={sizeQuantities[size]||0}
                                                onChange={(e) =>
                                                  this.handleQuantityChange(size, parseInt(e.target.value, 10))
                                                }
                                                 />
                                       </div>
                                       
                                         
                                          
                                       </>
                                   })
                             }
                                </div>
                               
                                
                            </div>
                            <div className=' col-sm-4 col-md-3 row'>
                                <div className=' form-group mg-top'>
                                    <label>Ảnh</label>
                                    <div className='upload-image'>
                                        
                                        <label htmlFor='taianh' className='text_image'>Tải ảnh <i class="fas fa-upload"></i></label>
                                        {lenghtImage <=10 ?<input id='taianh' hidden type="file" onChange={(e)=>this.handleImage2(e,"image")} multiple   />
                                        : null    
                                    }
                                        
                                       
                                    </div>
                                   
                                    
                                </div>
                             
                                
                               
                            </div>
                            <div className='flex  col-12 flexNewEdit ' >
                                {url && url.map((item,index) =>{
                                        return( 
                                    <>
                                        <div className='col-md-4 col-sm-12 ' key={item} style={{position:"relative",marginTop:'10px'}} >
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
                                   <input type="checkbox"  class="form-check-input" id="exampleCheck1"  onClick={()=>this.CheckInput()} ></input>
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
                <Button color="success" className='px-2' onClick={()=>this.handleAddNewProducts()}>
                    Add New Products
                </Button>
             
                 {' '}
                <Button color="danger" className='px-2' onClick={()=>this.toggle()}>
                    Cancel
                </Button>

            </ModalFooter>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    console.log(state.admin.categories,"ald;dskf")
    return {
        categoriesRedux: state.admin.categories,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
        createNewProducts: (data)=> dispatch(actions.createNewProducts(data)),
        fetchAllProducts: ()=> dispatch(actions.fetchAllProducts()),
        createNewImage: (data)=> dispatch(actions.createNewImage(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProducts);




