import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './more.scss'

import eyePng from '../../assets/images/eye.png'
import starPng from '../../assets/images/star.png'
import draftPng from '../../assets/images/draft.png'
import recentPng from '../../assets/images/recent.png'
import bookPng from '../../assets/images/book.png'
import livePng from '../../assets/images/live.png'
import zhiPng from '../../assets/images/zhi.png'


export default class More extends Component{
  config = {
    navigationBarTitleText: '我的'
  }

  render () {
    return (
      <View className='more'>
        <View className='user flex-wrp'>
          <View className='avatar flex-item'>
            <Image className='userinfo-avatar' src='https://image.ibb.co/nKV5Cy/default_avatar.jpg' backgroundSize='cover'/>
          </View>
          <View className='user-info flex-item'>
            <Text className='userinfo-nickname'>阿集</Text>
            <Text className='edit'>查看或编辑个人主页</Text>
          </View>
        </View>
        <View className='my'>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={eyePng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的关注</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={starPng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的收藏</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={draftPng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的草稿</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={recentPng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>最近浏览</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={bookPng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的书架</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={livePng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的 Live</Text>
            </View>
          </View>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
              <Image class='myitem-img' src={zhiPng}/>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的值乎</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
