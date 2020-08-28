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
            <div className="confirmOrderContainer">
                <section>
                    <Header title="确认订单" signUp={true} goHome={this.goHome}/>
                    <Link to={'/confirmOrder/chooseAddress'}  className="address_container">
                        <div className="address_empty_left">
                            <svg className="location_icon" xmlns="http://www.w3.org/1999/xlink">

                            </svg>
                            <div className="add_address">
                                请添加一个收货地址
                            </div>
                            <div className="address_detail_container">
                                <header>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </header>
                                <div className="address_detail">
                                    <span></span>
                                    <p></p>
                                </div>
                            </div>
                            <svg className="address_empty_right">
                                {/*<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>*/}
                            </svg>
                        </div>
                    </Link>
                    <div className="confirmOrderCotainer">ConfirmOrder</div>
                </section>

            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
    }
}
export default connect(()=>({}), mapDispatchToProps)(ConfirmOrder)