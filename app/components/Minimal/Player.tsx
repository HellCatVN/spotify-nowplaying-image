import React from 'react';
import ComponentImage from '../ComponentImage';
import Text from './Text';
import PlayerStyles from './PlayerStyles';

export interface Props {
  cover?: string;
  track: string;
  artist: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
}

export const Player: React.FC<Props> = ({
  cover,
  track,
  artist,
  progress,
  duration,
  isPlaying,
}) => {
  return (
    <ComponentImage width="256" height="64">
      <PlayerStyles duration={duration} progress={progress} />
      <div
        className={isPlaying ? 'disabled' : ''}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 8,
          paddingLeft: 4,
        }}
      >
        <img id="cover" src={cover ?? null} width="48" height="48" />
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            marginTop: -4,
            marginLeft: 8,
          }}
        >
          <Text id="track" weight="bold">
            {`${track ?? ''} `.trim()}
          </Text>
          <Text id="artist" color={!track ? 'gray' : undefined}>
            {artist || 'Nothing playing...'}
          </Text>
          {track && (
            <div className="progress-bar">
              <div id="progress" className={!isPlaying ? 'paused' : ''} />
            </div>
          )}
        </div>
      </div>
    </ComponentImage>
  );
};
