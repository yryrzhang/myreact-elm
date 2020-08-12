import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./confirmOrder.scss";
import Header from "@/components/header/header";
import Footer from '@/components/footer/footer'
import PropTypes from "prop-types";
import {saveAttrInfo} from '@/store/action'
import { is, fromJS  } from 'immutable';  // 保证数据的不可变
import {imgUrl} from '../../config/envconfig'
import QueueAnim from 'rc-queue-anim'
import {getImgPath} from '@/utils/commons'
import API from "../../api/api";

class ConfirmOrder extends Component {
    static propTypes = {

    };

    static ={

    };

    render() {
        return(
            <div className="confirmOrderCotainer">ConfirmOrder</div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
    }
}
export default connect(()=>({}), mapDispatchToProps)(ConfirmOrder)