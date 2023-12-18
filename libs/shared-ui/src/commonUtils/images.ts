import { getEnvConfig } from './config';

type MediaType = 'resourceContentBucket' | 'processedMediaBucket'

export const getMediaBasePath = (path?: string, type: MediaType = 'processedMediaBucket') => {
  if (!path) {
    return ''
  }
  if (path.startsWith('http')) {
    return path;
  }
  const config = getEnvConfig()
  const bucket = config[type];
  if (type === 'resourceContentBucket' && !path.startsWith('/Resources')) {
    return `https://storage.googleapis.com/${bucket}/Resources/${path}/Resource_files/${path}-content.json`
  }
  return `https://storage.googleapis.com/${bucket}${path.startsWith('/') ? path : `/${path}`}`
}

export const firstLetterImage = (name?: string) => {
  if (!name) {
    return ''
  }
  const firstLetter = name?.charAt(0);

  // Define color variables
  const textColor = '#fff';
  const backgroundColor = '#0AA34F';

  // Create an SVG representing the desired image
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect x="0" y="0" width="200" height="200" fill="${backgroundColor}" />
    <text x="100" y="100" text-anchor="middle" dy="0.35em" font-family="Arial" font-size="100" fill="${textColor}">${firstLetter}</text>
  </svg>`;

  // Convert the SVG to a data URL
  const imageUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
  return imageUrl;
}
