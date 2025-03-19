import { View, Text } from '@tarojs/components'
import { Grid, GridItem } from '@nutui/nutui-react'
import './index.scss'

export default function Album() {
  const albums = [
    {
      icon: 'photograph',
      text: '我的相册'
    },
    {
      icon: 'camera',
      text: '拍照'
    },
    {
      icon: 'video',
      text: '视频'
    }
  ]

  return (
    <View className='album-page'>
      <View className='header'>
        <Text className='title'>相册空间</Text>
      </View>
      <Grid columns={3}>
        {albums.map(item => (
          <GridItem
            key={item.text}
            text={item.text}
          />
        ))}
      </Grid>
    </View>
  )
}
