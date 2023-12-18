import {
  ChapterInfoCard,
  IStyles,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SubjectChapterMiniInfo } from '@protos/content_management/content.common.apis_pb';

const styles: IStyles = {
  heading: {
    marginTop: { xs: pxToRem(15), md: pxTovW(0) },
    marginBottom: { xs: pxToRem(15), md: pxTovW(15) },
    display: { xs: 'block', md: 'none' },
  },
};

interface IProps {
  chapter?: SubjectChapterMiniInfo;
  onChapterCardClick?: (chapterId: number) => void;
}

const OngoingChapterCard = (props: IProps) => {
  const { chapter, onChapterCardClick } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (!chapter) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h2" sx={styles.heading}>
        Ongoing Chapter
      </Typography>

      <ChapterInfoCard
        variant="medium"
        tagName={isMobile ? undefined : 'Ongoing'}
        mainHeading={chapter.chapterNo + '. ' + chapter.chapterTitle}
        blueSubText={(chapter.noOfTopics || 0) + ' Topic'}
        image={getMediaBasePath(
          chapter.posterImagesUrl,
          'processedMediaBucket'
        )}
        withArrow
        rootStyle={{
          cursor: 'pointer',
        }}
        cardClickHandler={() => {
          if (onChapterCardClick) {
            onChapterCardClick(chapter.chapterId);
          }
        }}
      />
    </Box>
  );
};

export default OngoingChapterCard;
