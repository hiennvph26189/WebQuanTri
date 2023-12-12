import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_HANGSX, POST_HANGSX, PUT_HANGSX } from '../../../API';
import axios from "../../../axios";
import { map } from 'lodash';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Hangsx extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrHangsx: [],
            isOpenModal: false,
            isOpenModal2: false,
            id: 0,
            name: '',
            status: 0,
        }
    }


    async componentDidMount() {
        this.CallapiHangsx();

    }
    CallapiHangsx = async () => {
        await axios.get(GET_HANGSX).then((res) => {
            console.log(res.data)
            if (res.errCode == 0) {
                this.setState({
                    arrHangsx: res.data
                });

            }
        }).catch((error) => { console.log(error) });
    }
    handleAddNewHangsx = () => {
        this.setState({
            isOpenModal: true,

        });

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
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    handlePostHangsx = async () => {
        let data = {
            id: this.state.id,
            name: this.state.name
        }
        await axios.post(POST_HANGSX, data).then((res) => {
            console.log(res)
            if (res.errCode == 0) {
                this.setState({
                    id: 0,
                    name: ''

                });
                this.toggle();
                toast.success("Thêm Hãng Thành Công")
                this.CallapiHangsx();
            } else {
                toast.error("Gửi Thất Bại")
            }
        }).catch((error) => { console.log(error) });
    }
    handleEditHangsx = (item) => {
        this.setState({
            isOpenModal2: true,
            id: item.id,
            name: item.name,
            status: item.status,
        });
    }

    handlePutHangsx = async () => {
        let data = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
        }
        console.log(data)
        await axios.put(PUT_HANGSX, data).then((res) => {
            console.log(res)
            if (res.errCode == 0) {
                this.setState({
                    id: 0,
                    status:0,
                    name: ''

                });
                this.toggle2();
                toast.success("Sửa Hãng Thành Công")
                this.CallapiHangsx();
            } else {
                toast.error("Gửi Thất Bại")
            }
        }).catch((error) => { console.log(error) });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(arrInput[i] + ' không được bỏ trống')
                break;
            }

        }
        return isValid
    }
    editStatus = (status) => {

        this.setState({
            status: status,
        });
    }


    render() {
        let arrHangsx = this.state.arrHangsx

        return (
            <div className="container category-container">
                <div className='title text-center'> Read Hang San Xuat</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={() => this.handleAddNewHangsx()}

                    > <i className='fas fa-plus px-2'> </i>Add new hãng sản xuất</button>
                </div>
                <div className='category-table mt-4 mx-2'>
                    <table id="customers" class="ws-table-all">
                        <tbody>
                            <tr>
                                <th>id</th>
                                <th>Tên hãng sản xuất </th>
                                <th>Trạng thái </th>
                                <th>Action</th>
                            </tr>
                            {
                                arrHangsx && arrHangsx.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td style={{color:item.status == 0 ? "green" : "red"}}>{item.status == 0 ? "Hoạt động" : "Không hoạt động"}</td>
                                                <td className='action'>
                                                    <button class="btn btn-success mx-1 px-2 " onClick={() => this.handleEditHangsx(item)}>Edit</button>

                                                </td>
                                            </tr>
                                        </>
                                    )

                                })}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={this.state.isOpenModal}
                    toggle={() => this.toggle()}
                    className={"modalConttailer"}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Create New hang san xuat</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className=''>
                                <div className='col-12 form-group mg-top'>
                                    <label>Tên hãng sản xuất</label>
                                    <input type="text" className="form-control" placeholder='Nhập tên hang san xuat' onChange={(event) => this.handleOnChageInput(event, 'name')} name="name" value={this.state.name} />
                                </div>

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" className='px-2' onClick={() => this.handlePostHangsx()} >
                            Add New hang san xuat
                        </Button>{' '}
                        <Button color="danger" className='px-2' onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal
                    isOpen={this.state.isOpenModal2}
                    toggle={() => this.toggle2()}
                    className={"modalConttailer"}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => this.toggle2()}>Edit hang san xuat</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className=''>
                                <div className='col-12 form-group mg-top'>
                                    <label>Tên hãng sản xuất</label>
                                    <input type="text" className="form-control" placeholder='Nhập tên hang san xuat' onChange={(event) => this.handleOnChageInput(event, 'name')} name="name" value={this.state.name} />
                                </div>

                                <div className='col-12 form-group mg-top'>
                                    <label>Trạng thái hoạt động </label>
                                    <div class="form-check">
                                        <input checked={this.state.status === 0}
                                            onChange={() => this.editStatus(0)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Hoạt động
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input checked={this.state.status === 1}
                                            onChange={() => this.editStatus(1)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Không hoạt động
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" className='px-2' onClick={() => this.handlePutHangsx()} >
                            Edit hang san xuat
                        </Button>{' '}
                        <Button color="danger" className='px-2' onClick={() => this.toggle2()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hangsx);