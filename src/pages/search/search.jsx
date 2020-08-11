import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./search.scss";
import Header from "@/components/header/header";
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
            </div>
            </div>
        )}

}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Search)