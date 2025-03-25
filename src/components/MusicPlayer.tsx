import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './MusicPlayer.scss';

interface MusicPlayerProps {
  track: {
    title: string;
    artist: string;
    duration: string;
    lyrics: string;
    url: string;
  };
  onPrev: () => void;
  onNext: () => void;
}

export default function MusicPlayer({ track, onPrev, onNext }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const [audioContext] = useState(() => Taro.createInnerAudioContext());

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');

    try {
      audioContext.stop();
      audioContext.src = track.url;
      
      audioContext.onCanplay(() => {
        setIsLoading(false);
        audioContext.play();
      });

      audioContext.onTimeUpdate(() => {
        const current = audioContext.currentTime;
        const duration = audioContext.duration;
        setProgress((current / duration) * 100);
        setCurrentTime(formatTime(current));
      });

      audioContext.onError((res) => {
        console.error('播放错误:', res);
        setError('音频加载失败');
        setIsLoading(false);
        onNext();
      });

      audioContext.onPlay(() => setIsPlaying(true));
      audioContext.onPause(() => setIsPlaying(false));
      audioContext.onStop(() => setIsPlaying(false));

    } catch (err) {
      console.error('初始化错误:', err);
      setError('初始化失败');
      setIsLoading(false);
    }

    return () => {
      audioContext.stop();
    };
  }, [track.url]);

  const handlePlay = () => {
    if (isLoading) return;
    try {
      if (isPlaying) {
        audioContext.pause();
      } else {
        audioContext.play();
      }
    } catch (err) {
      setError('播放失败');
    }
  };

  const handleProgressClick = (e: any) => {
    if (isLoading || !audioContext.duration) return;
    
    try {
      // 获取进度条元素
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.detail.x - rect.left;
      
      // 确保点击位置在有效范围内
      const boundedX = Math.max(0, Math.min(clickX, rect.width));
      const percentage = (boundedX / rect.width) * 100;
      
      // 确保时间值有效
      const duration = audioContext.duration || 0;
      const seekTime = Math.min((percentage / 100) * duration, duration);
      
      if (isFinite(seekTime) && seekTime >= 0) {
        audioContext.seek(seekTime);
        setProgress(percentage);
        setCurrentTime(formatTime(seekTime));
      }
    } catch (err) {
      console.error('设置进度失败:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className='music-player'>
      <View className='player-header'>
        <Text className='title'>{track.title}</Text>
        <Text className='artist'>{track.artist}</Text>
      </View>

      <View className='player-controls'>
        <View 
          className='progress-bar'
          onClick={handleProgressClick}
        >
          <View className='progress' style={{ width: `${progress}%` }} />
        </View>
        <View className='time-info'>
          <Text className='current-time'>{currentTime}</Text>
          <Text className='duration'>{track.duration}</Text>
        </View>
        
        <View className='control-buttons'>
          <View className='prev-button' onClick={onPrev} />
          <View 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlay}
          />
          <View className='next-button' onClick={onNext} />
        </View>
      </View>

      <View className='lyrics-container'>
        <Text className='lyrics'>{track.lyrics}</Text>
      </View>

      {error && <View className='error-message'>{error}</View>}
    </View>
  );
}