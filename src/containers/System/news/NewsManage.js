import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalNews from './ModalNews';
import ModalEditNews from './ModalEditNews';
class NewsManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenEditNewsModal: false,
        }

    }

    handleAddNewNews = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    toggleNewsModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditNewsModal = ()=>{
        this.setState({
            isOpenEditNewsModal: !this.state.isOpenEditNewsModal
        })
    }

    render() {
        return (
            <div className="container News-container">
                <ModalNews
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleNewsModal}
                    createNewNews = {this.createNewNews}
                />
                {this.state.isOpenEditNewsModal &&
                    <ModalEditNews
                    isOpen = {this.state.isOpenEditNewsModal}
                    toggleFromParent = {this.toggleEditNewsModal}
                    currentNews = {this.state.NewsEdit}
                     EditNews = {this.doEditNews}
                />
                    
                }
            <div className='title text-center'> Read News</div>
            <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewNews()}> <i className='fas fa-plus px-2'></i>Add new News</button>
                </div>
            
            <div className='News-table mt-4 mx-2'>
               
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th style={{width:"250px"}}>Ảnh</th>
                        <th>Tiêu đề</th>
                        <th style={{width:"250px"}}>Ngày đăng</th>
                        <th style={{width:"170px"}}>Chỉnh sửa</th>
                    </tr>
                    
  
                </tbody></table>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsManage);
