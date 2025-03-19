import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components'
import { Cell, CellGroup } from '@nutui/nutui-react'
import MusicPlayer from '../../components/MusicPlayer'
import './index.scss'
import Taro from '@tarojs/taro';

async function fetchMusicData() {
  try {
    const response = await Taro.request({
      url: 'https://api.luoxue.com/music', // Replace with the actual API endpoint
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        // Add any required headers, such as authentication tokens
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch music data:', error);
  }
}

// Define a type for the music items
type MusicItem = {
  id: string;
  title: string;
  artist: string;
  url: string;
};

export default function Music() {
  // Use the defined type for the musicList state
  const [musicList, setMusicList] = useState<MusicItem[]>([]);

  useEffect(() => {
    async function loadMusic() {
      const data = await fetchMusicData();
      setMusicList(data);
    }
    loadMusic();
  }, []);

  return (
    <View className='music-page'>
      <View className='header'>
        <Text className='title'>音乐空间</Text>
      </View>
      <CellGroup>
        {musicList.map(item => (
          <Cell
            key={item.id}
            title={item.title}
            description={item.artist}
            onClick={() => <MusicPlayer src={item.url} />}
          />
        ))}
      </CellGroup>
    </View>
  );
}
