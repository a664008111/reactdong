import React from "react";
import { Switch , Icon , Badge , message } from 'antd';
import "../common/style/home.css";
import "../common/react-iconfont/iconfont.css";
import Swiper from "swiper/dist/js/swiper.min.js";
import "swiper/dist/css/swiper.min.css";
import Wode from "./wode.jsx";
import Yinyue from "./yinyue.jsx";
import Faxian from "./faxian.jsx";
import 'antd/dist/antd.css';
import store from '../store';
import {connect} from 'react-redux';
import IScroll from 'iscroll/build/iscroll-probe';
class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:["我的","音乐馆","发现"],
            mySwiper:null,
            show:false,
            transform:'translateX(-100%)',
            pageX:0,
            pageY:0,
            tage:null,
        }
    }
    componentDidMount(){ 
       let that=this
       let mySwiper = new Swiper(".swiper-container", {
            effect : 'coverflow',
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
              },
            on: {
                slideChangeTransitionStart: function(e){
                    let count =this.activeIndex
                    that.props.lists(count);
                }
              }
          }); 
           this.setState({
                mySwiper
           });
           mySwiper.slideTo(1,0,false)
    }  
    indexCD(){
        let { transform}=this.state
        transform="translateX(0%)"
        this.setState({
            transform
        })
    }
    onChange(checked) {
        console.log(`${checked}`);
      }
      goole(){
        let { transform }=this.state
        transform="translateX(-100%)"
        this.setState({
            transform
        })
      }
      onshow(checked){
        this.setState({
            show:!this.state.show
        })
      }
      onhide(){
        console.log("hide")
      }
      tou(event){
          let tage=this.state.tage
          tage=event.touches[0]
          this.setState({
            tage
          })
          console.log(tage.pageX)
      }
      mou(event){
          let thou=event.touches[0]
        let num=this.state.tage.pageX-thou.pageX
        console.log(num)
      }
    render(){
        let wode=this.props.wode
        let swiper = this.state.mySwiper;
        return <div className="index">
            <header>
                <div className="index-top">
                    <i className="icon iconfont icon-gengduo3" onClick={(e)=>{this.indexCD()}}></i>
                    <div className="index-centent">
                        {
                            this.state.list.map((item,index)=>{
                                return <span onClick={(e)=>{this.props.lists(index, swiper)}} key={index} className={index==wode?'action':null}>{item}</span>
                            })
                        }
                    </div>
                    <i className="icon iconfont icon-add1"></i>
                </div>
                <div className="index-bottom">
                    <div className="bottom">
                       <i className="icon iconfont icon-search_light"></i> 搜索 
                    </div>  
                </div>
            </header>
            <section ref="index">
                <div className="swiper-container sect">
                <div className="swiper-pagination"></div>
                    <div className="swiper-wrapper" ref='slides'>
                        <div className="swiper-slide"><Wode></Wode></div>
                        <div className="swiper-slide"><Yinyue></Yinyue></div>
                        <div className="swiper-slide"><Faxian></Faxian></div>
                    </div>
                </div>
            </section>
            <footer>
                <dl>
                    <dt><img src={require("../common/imgs/2.jpg")} alt=""/></dt>
                    <dd>
                        <b>散了吧(Live)</b>
                        <span>苏立生</span>
                    </dd>
                </dl>
                <li>
                    <i className="icon iconfont icon-video"></i>
                    <i className="icon iconfont icon-swticonyinle2"></i>
                </li>
            </footer>
            
            <div className="index-CD" style={this.state} onTouchStart={this.tou.bind(this)} onTouchMove={this.mou.bind(this)}>
                <div className="hi" onTouchStart={(e)=>{this.goole()}}></div>
                <div className="cd" style={this.state}  ref="cd">
                    <div className="cd-q"></div>
                    <div className="cd-aa">
                            <div className="cd-a">
                                <li>
                                    <b>个性装扮</b>
                                    <span>默认套装</span>
                                </li>
                                <li>
                                    <b>消息中心</b>
                                    <Badge count={4} style={{ backgroundColor: 'red', color: '#fff' }} />
                                </li>
                                <li>
                                    <b>免流量服务</b>
                                    <span>网卡听歌免流量</span>
                                </li>
                            </div>
                            <div className="cd-b">
                                <li>
                                    <b>定时关闭</b>
                                    <Switch defaultChecked onChange={(e)=>{this.onshow()}} defaultChecked={false} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} checked={this.state.show?true:false}/>
                                </li>
                                <li>
                                    <b>仅Wi-Fi联网</b>
                                    <Switch defaultChecked onChange={(e)=>{this.onhide()}} defaultChecked={false} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}/>
                                </li>
                                <li>
                                    <b>流量提醒</b>
                                    <Switch defaultChecked onChange={(e)=>{this.onChange()}} defaultChecked checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}/>
                                </li>
                                <p>听歌偏好</p>
                            </div>
                            <div className="cd-c">
                                <b>微云音乐网盘</b>
                                <b>导入外部歌单</b>
                                <b>清理空间</b>
                                <b>帮助与反馈</b>
                                <b>关于QQ音乐</b>
                            </div>
                            <div className="cd-d">
                                <b>精品应用推荐</b>
                                <ul>
                                    <li><a href="http://kg.qq.com/"> <b><img src={require("../common/imgs/K.png")} alt=""/></b><span>全民K歌</span></a></li>
                                    <li><a href="http://maoyan.com/"> <b><img src={require("../common/imgs/mao.png")} alt=""/></b><span>猫眼电影</span></a></li>
                                    <li><a href="https://qzone.qq.com/"><b><img src={require("../common/imgs/QQ.png")} alt=""/></b><span>QQ空间</span></a></li>
                                    <li><a href="http://www.duokan.com/"><b><img src={require("../common/imgs/duo.png")} alt=""/></b><span>多看阅读</span></a></li>
                                </ul>
                            </div>
                        </div>
                    <div className="cd-e">
                        <b><i className="icon iconfont icon-settings_light"></i> 设置</b>
                        <b><i className="icon iconfont icon-back_android"></i> 退出登录/关闭</b>
                    </div> 
                </div> 
            </div>
        </div>
    }
}
const mapStateToProps=(state)=>{
    return{
        wode:state.wode
    }
}
const hang=(dispatch)=>{
    return {
        lists:(index, swiper)=>{
            dispatch({type:'count',text:index});
           swiper && swiper.slideTo(index,0,false)
        }
    }
}
export default connect(mapStateToProps,hang )(App)