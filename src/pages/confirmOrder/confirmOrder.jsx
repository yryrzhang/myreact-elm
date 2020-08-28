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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                style={{position:'absolute',width:0,height:0}}>
                                <defs>
                                    <symbol viewBox="0 0 26 31" id="location">
                                        <path  fill="#FFF" fillRule="evenodd"
                                               d="M20.809 21.6L12.9 29.509h1.616l-7.992-7.992a13.003 13.003 0 0 1-.506-.478c-4.25-4.25-4.25-11.14 0-15.389s11.14-4.25 15.389 0c4.25 4.25 4.25 11.14 0 15.389a10.81 10.81 0 0 1-.543.508l-.056.052zm1.56 1.669c.225-.196.443-.401.656-.613 5.142-5.142 5.142-13.48 0-18.622s-13.48-5.142-18.622 0c-5.142 5.142-5.142 13.48 0 18.622.18.18.364.354.553.522l8.753 8.755 8.661-8.664z"
                                        >
                                        </path>
                                        <path fillRule="evenodd"
                                              d="M9.428 16.739a6.063 6.063 0 1 0 8.573-8.575 6.063 6.063 0 0 0-8.573 8.575zm1.616-1.616a3.776 3.776 0 1 1 5.34-5.341 3.776 3.776 0 0 1-5.34 5.341z"
                                              className="path2">
                                        </path>
                                    </symbol>

                                </defs>
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
                </section>
                <section className="delivery_model container_style">
                    <p className="deliver_text">送达时间</p>
                    <section className="deliver_time">
                        <p>尽快送达 | 预计 </p>
                        <p >蜂鸟专送</p>
                    </section>
                </section>
                <section className="pay_way container_style">
                    <header className="header_style">
                        <span>支付方式</span>
                        <div className="more_type">
                            <span>在线支付</span>
                        </div>
                    </header>
                    <section className="hongbo">
                        <span>红包</span>
                        <span>暂时只在饿了么 APP 中支持</span>
                    </section>
                </section>
                <section className="food_list">
                    <header v-if="checkoutData.cart.restaurant_info">
                        {/*<img src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">*/}
                        <span>餐厅名称</span>
                    </header>
                    <ul className="food_list_ul" >
                        <li  className="food_item_style">
                            <p className="food_name ellipsis">名字</p>
                            <div className="num_price">
                                <span>x 数量</span>
                                <span>¥ 价格</span>
                            </div>
                        </li>
                    </ul>
                    <div className="food_item_style" >
                        <p className="food_name ellipsis">名称</p>
                        <div className="num_price">
                            <span></span>
                            <span>¥ 价格</span>
                        </div>
                    </div>
                    <div className="food_item_style">
                        <p className="food_name ellipsis">配送费</p>
                        <div className="num_price">
                            <span></span>
                            <span>¥ 总价</span>
                        </div>
                    </div>
                    <div className="food_item_style total_price">
                        <p className="food_name ellipsis">订单 ¥ 总价</p>
                        <div className="num_price">
                            <span>待支付 ¥总价</span>
                        </div>
                    </div>
                </section>
                <section className="pay_way container_style">
                    <Link to='{path: "/confirmOrder/remark", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}' className="header_style">
                        <span>订单备注</span>
                        <div className="more_type">
                            <span className="ellipsis">'口味、偏好等'</span>
                            <svg className="address_empty_right">
                                {/*<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>*/}
                            </svg>
                        </div>
                    </Link>
                    <Link to="checkoutData.invoice.is_available? '/confirmOrder/invoice': ''" className="hongbo" >
                        <span>发票抬头</span>
                        <span>
                    状态
                            {/*<svg className="address_empty_right">*/}
                            {/*<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>*/}
                            {/*</svg>*/}
                </span>
                    </Link>
                </section>
                <section class="confrim_order">
                        <p>待支付 ¥100</p>
                        <p onclick="">确认下单</p>
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