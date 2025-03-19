import { View, Text } from '@tarojs/components'
import { Tag } from '@nutui/nutui-react'
import './index.scss'

export default function Favorites() {
  const tags = [
    { name: '美食', active: true },
    { name: '旅行', active: true },
    { name: '电影', active: true },
    { name: '音乐', active: true },
    { name: '阅读', active: true },
    { name: '运动', active: true }
  ]

  return (
    <View className='favorites-page'>
      <View className='header'>
        <Text className='title'>我的喜好</Text>
      </View>
      <View className='tags-container'>
        {tags.map(tag => (
          <Tag
            key={tag.name}
            type="primary"
            className='tag-item'
          >
            {tag.name}
          </Tag>
        ))}
      </View>
    </View>
  )
}
