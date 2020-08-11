import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./search.scss";
import Header from "@/components/header/header";
import Footer from '@/components/footer/footer'
import PropTypes from "prop-types";
import { is, fromJS  } from 'immutable';  // 保证数据的不可变
import {imgUrl} from "@/config/envconfig";
import QueueAnim from 'rc-queue-anim'
import {getImgPath} from '@/utils/commons'

class Search extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        geohash: PropTypes.array.isRequired
    };
    state = {
        title:'搜索',
        vertifies: '',
        searchInput: '',
        searchbutton: '',
        restaurantList:[],
        show:false,
    };
    handleSearch = () =>{
        console.log("handleSearch")
    };
    handleInput = (type, e) =>{
        let newState = {}
        let value = e.target.value
        newState[type] = value
        switch (type) {
            case 'searchInput':
                this.messageVali(value)
                break
            case 'mesthree':
                this.mesthreeVali(value)
                break
            case 'telenum':
                this.teleVali(value)
                break
            case 'standbytelenum':
                this.standbyVali(value)
                break
            default:
                break
        }
        this.setState({
            ...newState
        })
    }

    // 校验
    messageVali = (value) => {
        this.setState({
            verify: value?false:true
        })
        this.bindThing()
    }

    bindThing = () => {
        if (this.state.message && this.state.mesthree && !this.verifyfour) {
            this.setState({
                butopacity: 'butopacity'
            })
        } else {
            this.setState({
                butopacity: ''
            })
        }
    }
    render() {
        return (
            <div className='search_page'>
            <Header title={this.state.title} signUp={true} goHome={this.goHome}/>
            <div className='search-container'>
                <form className='search_form'>
                    <section className='searchbox'>
                        <QueueAnim >
                            <div>
                                <input type="text" placeholder="请输入商家或美食名称" className='search_input' value={this.state.searchInput} onChange={this.handleInput.bind(this, 'searchInput')}/>
                            </div>
                        </QueueAnim>
                    </section>
                    <section className='searchbox'>
                        <button className='search_submit' onClick={this.handleSearch}>搜索</button>
                    </section>
                </form>
                {this.state.show&& <section>
                    <h4 className="title_restaurant">商家</h4>
                    <ul className="list_container">
                        {
                            this.state.restaurantList.map((item,index) =>{
                                return(
                                    <Link to={'/shop'+item.id} className='shop_item' key={'1'+index}>
                                        <img src={imgUrl + item.image_path } alt={""}/>
                                        <div className='shop-content'>
                                            <div className='shop-content-title'>
                                                <div className='title-left'>
                                                    <span>品牌</span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className='title-right'>保准票</div>
                                            </div>
                                            <div className='shop-content-title'>
                                                <div className='title-left'>
                                                    <div className='star-num'>
                                                        {this.starCount(item.rating)}
                                                    </div>
                                                    <div className='star-rating'>
                                                        {item.rating}
                                                    </div>
                                                    <div className='order-num'>
                                                        月售{item.recent_order_num}单
                                                    </div>
                                                </div>
                                                <div className='title-right order-badge'>
                                                    <span>蜂鸟专送</span>
                                                    <span>准时达</span>
                                                </div>
                                            </div>
                                            <div className='shop-content-title'>
                                                <div className='fee-left'>
                                                    <span className='fee-text'>¥{item.float_minimum_order_amount}起送</span>
                                                    <span className='segmentation'>/</span>
                                                    <span className='fee-text'>{item.piecewise_agent_fee.tips}</span>
                                                </div>
                                                <div className='fee-right'>
                                                    <span>{item.distance}</span>
                                                    <span>/</span>
                                                    <span>{item.order_lead_time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                            )
                        })
                        }

                    </ul>
                </section>}
            </div>
                <Footer/>
            </div>
        )}

}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Search)