import { FeatureIcon, FullWidthSectionList } from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';

export interface FeatureType {
  fileName: string
  type?: 'png' | 'jpg',
  cardText: string,
  bgColor: string,
  onClick: () => void
}
interface IProps {
  background?: string;
  feaureList?: FeatureType[]
}
export default function FeatureList({ background, feaureList }: IProps) {
  const items = feaureList ? feaureList.map(feature => (
    <FeatureIcon
      fileName={feature.fileName}
      type={feature.type}
      cardText={feature.cardText}
      bgColor={feature.bgColor}
      onClick={feature.onClick}
    />
  )) : []
  return (
    <Box>
      <FullWidthSectionList
        hideListCount
        sectionTitle="Features"
        background={background}
        items={items}
      />
    </Box>
  );
}
