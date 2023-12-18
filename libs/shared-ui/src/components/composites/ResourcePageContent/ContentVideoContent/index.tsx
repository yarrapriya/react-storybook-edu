import { Box } from '@mui/material';
import { ContentVideoContentModel } from '@protos/content_management/content.db_pb';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import VideoPlayer from '../../../elements/VideoPlayer';
import ElementRenderer from '../../ElementRenderer';

const styles: IStyles = {
  videoWrapper: {
    gap: {
      xs: pxToRem(15),
      md: pxTovW(20)
    },
    display: 'flex',
    flexDirection: 'column',
  }
};

interface IProps {
  contentVideo: ContentVideoContentModel;
}
export const ContentVideoContent = (props: IProps) => {
  const { contentVideo } = props;
  const elements = contentVideo.elements;
  return <Box sx={styles.videoWrapper}>
    <Box>
      <VideoPlayer videoUrl={contentVideo.primaryVideoUrl} />
    </Box>
    <ElementRenderer elements={elements} />
  </Box>
};
