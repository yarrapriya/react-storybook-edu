import { Box, Typography } from '@mui/material';
import { pxToRem } from '../../commonUtils/resizeUtils';
import { IStyles } from '../../commonUtils/styleUtils';
import { ScoreProgressBar } from '../../components/composites/ScoreProgressBar';
import FeatureIcon from '../../components/elements/FeatureIcon';
import HeaderIcon from '../../components/elements/HeaderIcon';
import ImageWrapper from '../../components/elements/ImageWrapper';
import { NoContentCard } from '../../components/composites/NoContent.tsx';

const styles: IStyles = {
  itemsWrapper: {
    display: 'flex',
    overflow: {
      xs: 'scroll',
      md: 'initial',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&>div:not(:last-child)': {
      marginRight: {
        xs: pxToRem(10),
        md: pxToRem(20),
      },
    },
  },
};

export const MiscellaneousDocs = () => {
  return (
    <>
      <Box sx={{ backgroundColor: 'lightgrey' }}>
        <Typography variant="h2">Image Wrapper</Typography>
        <ImageWrapper
          styles={{ width: '30vh' }}
          name="lesson-plan-sample"
          type="png"
          parentFolder="tempAssets"
        />
      </Box>
      <Box>
        <Typography variant="h2">Icons</Typography>
        <Box sx={styles.itemsWrapper}>
          <HeaderIcon fileName="teach" type="png" cardText="Teach" />
          <HeaderIcon fileName="new-hw" type="png" cardText="New Homework" />
          <HeaderIcon
            fileName="manage-hw"
            type="png"
            cardText="Manage Homework"
          />
          <HeaderIcon fileName="analytics" type="png" cardText="Analysis" />
        </Box>
      </Box>
      <Box>
        <Typography variant="h2">Feature Icons</Typography>
        <Box sx={styles.itemsWrapper}>
          <FeatureIcon
            fileName="book"
            type="png"
            cardText="Create Your First Homework in 2 Minutes"
            bgColor="#EEFFB3"
          />
          <FeatureIcon
            fileName="provision"
            type="png"
            cardText="Curriculum Aligned Teaching Resources"
            bgColor="#DAF5FF"
          />
          <FeatureIcon
            fileName="homework"
            type="png"
            cardText="Know Your Class (Pre-Assessment)"
            bgColor="#FFEEEE"
          />
          <FeatureIcon
            fileName="exam"
            type="png"
            cardText="Board exam question papers"
            bgColor="#EAF4FC"
          />
        </Box>
        <Box
          sx={{
            width: '20vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '2vw ',
          }}
        >
          <Typography variant="h1" fontWeight="bold">
            Adjust width according to parent container
          </Typography>
          <ScoreProgressBar score={80} variant="lg" />
          <ScoreProgressBar score={40} variant="md" />
          <ScoreProgressBar score={10} variant="small" />
        </Box>
        <NoContentCard
          variant="info"
          icon="cards"
          text="There is no cards available here"
        />
        <NoContentCard
          variant="error"
          icon="error"
          text="Lorem ipsum dolor sit amet consectetur"
        />
      </Box>
    </>
  );
};
