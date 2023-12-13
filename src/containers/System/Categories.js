import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { map } from 'lodash';
import axios from "../../axios";
import { toast } from 'react-toastify';
import ModalCategory from './ModalCategory';
import ModalEditCategory from './ModalEditCategory';
import { getAllUCategories,createNewCategories,deleteCategoriesService,editCategoriesService } from '../../services/categoriesService';
import {emitter} from '../../utils/emitter'
import { getAllProducts } from '../../services/productsService';
import { GET_CATEGORY } from '../../API';

class Categories extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrCategories: [],
            arrCategories2: [],
            isOpenModal: false,
            isOpenEditCategoryModal: false,
            categoryEdit: {},
            TongTrang: 0,
            page: 1,
        }
       }
    async componentDidMount() {
        this.CallapiCategory();
        
     }
     handleAddNewCategory = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    toggleCategoryModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditCategoryModal = ()=>{
        this.setState({
            isOpenEditCategoryModal: !this.state.isOpenEditCategoryModal
        })
    }
    //  getAllCategoryfromReact = async()=>{
    //     let response = await getAllUCategories();
       
       
    //      this.setState({
    //         arrCategories: response.data,
          
    //      }) 
        
        
    // }

    CallapiCategory = async () => {
        await axios.get(`${GET_CATEGORY}?page=${this.state.page}`).then((res) => {
            if (res.errCode == 0) {
                this.setState({
                    TongTrang : res.totalCount,
                    arrCategories: res.categories
                });

            }
        }).catch((error) => { console.log(error) });
    }

    CallPage = async (page) => {
        this.setState({
            page:page
        });
        await axios.get(`${GET_CATEGORY}?page=${page}`).then((res) => {
            if (res.errCode == 0) {
                this.setState({
                    TongTrang : res.totalCount,
                    arrCategories: res.categories
                });

            }
        }).catch((error) => { console.log(error) });
    }
   
    handleDeleteCategory = async(id)=>{
        try {
            let response = await deleteCategoriesService(id);
            if(response.errCode !== 0 && response){
                alert(response.errMessage)
            }else{
                await this.CallapiCategory()
            }
        } catch (error) {
            console.log(error)
        }
        

    }
    createNewCategories = async(data)=>{
        
        try {
           let response = await createNewCategories(data)
           console.log(response, "adfadfaf")
           
           if(response.errCode !== 0 && response){
            toast.error("Không kết nối được với server")
           }else{
            await this.CallapiCategory()
            this.setState({
                isOpenModal: false
            })
            toast.success("Thêm Thể Loại Thành Công")
            emitter.emit("EVENT_CLERA_MODAL_DATA")
           }
        } catch (error) {
            console.log(error)
        }
       
        
    }
    handleEditCategory = (category)=>{
        this.setState({
            isOpenEditCategoryModal: true,
            categoryEdit: category
        })
        
    }
    doEditCategory = async(category)=>{
        try {
            await editCategoriesService(category);
            let response = await editCategoriesService(category);
            if(response.errCode === 0 && response){
                this.setState({
                    isOpenEditCategoryModal: false,
                })
                await this.CallapiCategory()
            }else{
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
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
                onClick={() => {this.CallPage(i)
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
                onClick={() => {this.CallPage(i)
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
        let arrCategories  = this.state.arrCategories
        console.log(arrCategories)
        return (
            <div className="container category-container">
                <ModalCategory
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleCategoryModal}
                    createNewCategories = {this.createNewCategories}
                />
                {this.state.isOpenEditCategoryModal &&
                    <ModalEditCategory
                    isOpen = {this.state.isOpenEditCategoryModal}
                    toggleFromParent = {this.toggleEditCategoryModal}
                    currentCategory = {this.state.categoryEdit}
                     EditCategory = {this.doEditCategory}
                />
                    
                }
                 
                <div className='title text-center'> Read Category</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewCategory()}> <i className='fas fa-plus px-2'></i>Add new category</button>
                </div>
                <div className='category-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all">
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Tên Loại sản phẩm</th>
                            <th>Action</th>
                        </tr>
                        {
                        arrCategories && arrCategories.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    
                                    <td>{item.name}</td>
                                   
                                    <td className='action'>
                                    <button onClick={()=>this.handleEditCategory(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    {/* <button onClick={()=>this.handleDeleteCategory(item.id)} class="btn btn-danger  px-2">Delete</button> */}
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
                                 <button class="page-link"  onClick={() =>this.CallPage(this.state.page-1)} >Previous</button>
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
                             <button class="page-link" onClick={() => this.CallPage(this.state.page+1)}>Next</button>
                             </li>
                          }    
                        </ul>
                    </nav>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
