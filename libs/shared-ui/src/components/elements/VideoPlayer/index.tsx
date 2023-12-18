import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { getMediaBasePath } from '../../../commonUtils/images';

import Player from 'video.js/dist/types/player';
import "video.js/dist/video-js.css";
import "videojs-youtube";

interface VideoPlayerProps {
  videoUrl: string
  options?: any
  onReady?: (player: Player) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoReference = useRef<HTMLDivElement>(null);
  const playerReference = useRef<Player>();
  const { options, onReady, videoUrl } = props;
  const videoType = videoUrl.includes('m3u8') ? 'application/x-mpegURL' : videoUrl.includes('youtube') ? 'video/youtube' : 'video/mp4';
  useEffect(() => {
    // Initializing video.js player
    if (!playerReference.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoReference.current?.appendChild(videoElement);
      const player = playerReference.current =
        videojs(videoElement, {
          sources: [
            {
              src: getMediaBasePath(videoUrl, 'processedMediaBucket'),
              type: videoType
            },
          ],
          controls: true,
          autoplay: false,
          preload: 'auto',
          aspectRatio: '16:9',
          ...options
        }, () => {
          videojs.log('Video player is ready');
          onReady && onReady(player);
        });
    } else {
      const player = playerReference.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoReference]);

  // Destroy video.js player on component unmount
  useEffect(() => {
    const player = playerReference.current;
    return () => {
      if (player) {
        player.dispose();
        playerReference.current = undefined;
      }
    };
  }, [playerReference]);
  // wrap player with data-vjs-player` attribute
  // so no additional wrapper are created in the DOM

  if (!videoUrl) {
    return null
  }

  return (
    <div data-vjs-player>
      <div ref={videoReference} />
    </div>
  );
};

export default VideoPlayer;

// https://videojs.com/guides/react/
