import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {


    render() {
        const { processLogout } = this.props;
        console.log(this.props.userInfo)
        const userInfo = this.props.userInfo
        const Name =   this.props.userInfo.firstName + " "+this.props.userInfo.lastName
        const roleId = userInfo.roleID
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="" style={{display:"flex",justifyContent:"center", alignItems:"center", width:'255px', background:"#25343a", height:"100%"}} > 
                   
                    <h2 className='admin'>Myadmin</h2>
                    
                </div>
                <div className='left'>
                <div className='wellcome'>
                    <span>Well come {userInfo && Name ? Name: "" }</span>
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title="Logout">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                </div>
               
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
