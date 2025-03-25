import { useState } from 'react';
import { View, Text } from '@tarojs/components'
import { Cell, CellGroup } from '@nutui/nutui-react'
import MusicPlayer from '../../components/MusicPlayer'
import musicData from '../../assets/data/musicList.json'
import './index.scss'

type MusicItem = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  lyrics: string;
  url: string;
};

export default function Music() {
  const [musicList] = useState<MusicItem[]>(musicData.musicList);
  const [currentTrack, setCurrentTrack] = useState<MusicItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTrackSelect = (track: MusicItem, index: number) => {
    if (currentTrack?.id === track.id) return;
    setCurrentTrack(track);
    setCurrentIndex(index);
  };

  const handlePrevTrack = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : musicList.length - 1;
    setCurrentIndex(newIndex);
    setCurrentTrack(musicList[newIndex]);
  };

  const handleNextTrack = () => {
    const newIndex = currentIndex < musicList.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentTrack(musicList[newIndex]);
  };

  return (
    <View className='music-page'>
      <View className='header'>
        <Text className='title'>音乐空间</Text>
      </View>
      <CellGroup>
        {musicList.map((item, index) => (
          <Cell
            key={item.id}
            title={item.title}
            description={item.artist}
            onClick={() => handleTrackSelect(item, index)}
            className='music-cell'
          />
        ))}
      </CellGroup>
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          onPrev={handlePrevTrack}
          onNext={handleNextTrack}
        />
      )}
    </View>
  );
}