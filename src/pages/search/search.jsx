import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./search.scss";
import Header from "@/components/header/header";
import Footer from '@/components/footer/footer'
import PropTypes from "prop-types";
import {saveAttrInfo} from '@/store/action'
import { is, fromJS  } from 'immutable';  // 保证数据的不可变
import {imgUrl} from '../../config/envconfig'
import QueueAnim from 'rc-queue-anim'
import {getImgPath} from '@/utils/commons'
import API from "../../api/api";

class Search extends Component {
    static propTypes = {
        saveAttrInfo: PropTypes.func.isRequired,
    };
    state = {
        geohash: [],
        title:'搜索',
        vertifies: '',
        searchInput: '',
        searchbutton: '',
        restaurantList:[],
        isShowRestaurant:false,
        restaurant_name:''
    };

    cityGuess = async () => {
        let res = await API.cityGuess();
        this.setState({
            geohash: [res.latitude, res.longitude]
        });
        this.props.saveAttrInfo('geohash', [res.latitude, res.longitude])
    }

    componentDidMount () {
        this.cityGuess()
    }
    searchRestaurant = async (props) => {
        let obj = {
            "extras[]": "restaurant_activity",
            geohash: this.state.geohash,
            keyword: this.state.restaurant_name,
            type: "search"
        }
        const restaurantList = await API.searchRestaurant(obj);
        console.log(restaurantList)
        this.setState({
            restaurantList: restaurantList
        })
    }

    handleSearch = () =>{
        this.setState({
            isShowRestaurant: !this.state.isShowRestaurant,
        })
        this.searchRestaurant(this.state)
        console.log("handleSearch")
    };

    handleInput = (type, event) => {
        let value = event.target.value
        let newState = {}
        newState[type] = value
        switch (type){
        }
        this.setState(newState)
    }


    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        return refresh
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
                                <input type="text" placeholder="请输入商家或美食名称" className='search_input' value={this.state.restaurant_name} onChange={this.handleInput.bind(this,'restaurant_name')}/>
                            </div>
                        </QueueAnim>
                    </section>
                    <section className='searchbox'>
                        <button className='search_submit' onClick={this.handleSearch}>搜索</button>
                    </section>
                </form>
            </div>
                {this.state.isShowRestaurant&& <section>
                    <h4 className="title_restaurant">商家</h4>
                </section>}
                    <ul className="list_container">
                        {
                            this.state.restaurantList.map((item,index) =>{
                                return(
                                    <Link to={'/shop/'+item.id}  key={'1'+index} className="list_li">
                                        <section className="item_left">
                                            <img src={ imgUrl + item.image_path } alt={""} className="restaurant_img"/>
                                        </section>
                                        <section className="item_right">
                                            <div className="item_right_text">
                                            <p>
                                            <span>{item.name}</span>
                                            {/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14"*/}
                                                 {/*className="pay_icon">*/}
                                                {/*<polygon points="0,14 4,0 24,0 20,14"*/}
                                                         {/*style="fill:none;stroke:#FF6000;stroke-width:1"/>*/}
                                                {/*<line x1="1.5" y1="12" x2="20" y2="12"*/}
                                                      {/*style="stroke:#FF6000;stroke-width:1.5"/>*/}
                                                {/*<text x="3.5" y="9"*/}
                                                      {/*style="fill:#FF6000;font-size:9;font-weight:bold;">支付*/}
                                                {/*</text>*/}
                                            {/*</svg>*/}
                                            </p>
                                             <p>月售 {item.month_sales||item.recent_order_num} 单</p>
                                             <p>¥{item.float_minimum_order_amount}起送 / 距离{item.distance}</p>
                                            </div>
                                        </section>
                                    </Link>
                            )
                        })
                        }
                    </ul>


                <Footer/>
            </div>
        )}

}
const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
    }
}
export default connect(()=>({}), mapDispatchToProps)(Search)