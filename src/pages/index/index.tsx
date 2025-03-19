import { View, Text } from '@tarojs/components'
import { useDidShow, useDidHide } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const navItems = [
    {
      name: '叮当音乐',
      path: '/pages/music/index',
      icon: 'play-circle',
      color: '#FF6B6B'
    },
    {
      name: '叮当语录',
      path: '/pages/album/index',
      icon: 'photograph',
      color: '#4ECDC4'
    },
    {
      name: '叮当喜好',
      path: '/pages/favorites/index',
      icon: 'heart',
      color: '#FFB84D'
    }
  ]

  const handleNavClick = (path: string) => {
    Taro.navigateTo({
      url: path
    })
  }

  // 页面显示时执行
  useDidShow(() => {
    console.log('页面显示')
  })

  // 页面隐藏时执行
  useDidHide(() => {
    console.log('页面隐藏')
  })

  return (
    <View className='index'>
      <View className='header'>
        <Text className='title'>叮当的百宝箱</Text>
      </View>
      <View className='nav-grid'>
        {navItems.map(item => (
          <View
            key={item.name}
            className='nav-item'
            onClick={() => handleNavClick(item.path)}
          >
            <View className='nav-icon' style={{ backgroundColor: item.color }}>
            </View>
            <Text className='nav-text'>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
