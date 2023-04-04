import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
           tieuDe: "",
           file:[]
        }
        
       

    }
    componentDidMount() {
        
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
        let arrInput = ['name']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleAddNewCategory = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            // gọi API create model
            this.props.createNewCategories(this.state)
          
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
    
    render() {
        let url = [...this.state.file]
        let lenghtImage = 0
        for(let i = 0; i<=url.length;i++){
            lenghtImage = url.length
        }
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Create New Category</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Tiêu đề bài viết</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'tieuDe')} name="tieuDe" value={this.state.tieuDe}/>
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
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleAddNewCategory()}>
                    Add New Category
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNews);




