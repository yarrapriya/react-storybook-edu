import { Box, SxProps } from '@mui/system';
import { useEffect, useState } from 'react';

interface ImageProps {
  name: string;
  type?: 'png' | 'jpg';
  path?: string;
  styles?: SxProps;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets' | 'memes';
  onClick?: () => void;
}

function getImageUrl(imageProps: ImageProps) {
  const { name, type, parentFolder } = imageProps;
  return `/assets/shared-ui/${parentFolder || 'images'}/${name}${type ? '.' + type : ''
    }`;
}

export const isGifMp4 = (src: string): boolean => src.includes("/img/") && src.endsWith('mp4');

export function ImageWrapper(props: ImageProps) {
  const { name, styles, onClick } = props;
  let path = props.path;
  if (path?.includes('google.com')) {
    const extractedId = extractGoogleDriveID(path);
    if (extractedId) {
      path = 'https://drive.google.com/uc?export=view&id=' + extractedId;
    }
  }
  const [url, setUrl] = useState(path);
  useEffect(() => setUrl(path), [path]);
  const handleImageError = () => {
    setUrl(getImageUrl(props));
  };
  if (path && isGifMp4(path)) {
    return <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        key={name + '-image'}
        src={url ? url.replace('mp4', 'jpg') : getImageUrl(props)}
        onError={handleImageError}
        sx={{
          ...styles
        }}
        alt={name}
        onClick={onClick}
      />
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0 }}>
        <video
          key={url}
          loop
          style={{ width: '100%', height: '100%' }}
          title='video'
          poster={url ? url.replace('mp4', 'jpg') : getImageUrl(props)}
          playsInline={true}
          controlsList="nodownload noremoteplayback"
          controls={false}
          autoPlay={true}>
          <source src={url} type="video/mp4" />
        </video>
      </Box>
    </Box>
  }
  return (
    <Box
      component="img"
      key={name + '-image'}
      src={url ? url : getImageUrl(props)}
      onError={handleImageError}
      sx={styles}
      alt={name}
      onClick={onClick}
    />
  );
}

export default ImageWrapper;

function extractGoogleDriveID(url: string): string | null {
  const match = url.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\//);
  return match ? match[1] : null;
}

// const pxToVw = (pxSize: number | string, viewPort: number) => {
//   const vwUnits = (Number(pxSize) * 100) / viewPort;
//   return vwUnits.toFixed(3);
// };
