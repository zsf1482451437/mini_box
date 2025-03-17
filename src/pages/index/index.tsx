import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='<%= pageName %>'>
        <Text>叮当的百宝箱</Text>

      </View>
    )
  }
}
