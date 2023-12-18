import { Box, Grid, Typography } from '@mui/material';

import contentImage from '../../assets/tempAssets/lessonImage1.png';
import { IStyles } from '../../commonUtils/styleUtils';
import { ChapterInfoCard } from '../../components/composites/ChapterInfoCard';
import { ContentDetailCard } from '../../components/composites/ContentDetailCard';
import { HeadingCard } from '../../components/composites/HeadingCard';
import { InfoDisplayCard } from '../../components/composites/InfoDisplayCard';
import { InfoDisplayPanel } from '../../components/composites/InfoDisplayPanel';
import { StudentScoreCard } from '../../components/composites/StudentScoreCard';
import { ChapterCard } from '../../components/composites/chapterCard';
import { ContentCard } from '../../components/composites/contentCard';
import { SubjectCard } from '../../components/composites/subjectCard';
import { HomeworkCard } from '../../components/composites/teacherHomeworkCard';
import { TopicCard } from '../../components/composites/topicCard';
const styles: IStyles = {
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2vw',
  },

  root: { p: '0 2vw' },

  cardAndDetailsBox: {
    display: { md: 'flex' },
    // alignItems: 'center',
    justifyContent: { md: 'space-between' },
    borderBottom: '2px solid black',
    pb: '2vw',
    mb: '1vw',
  },

  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1vw',
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5vw',
    mt: { xs: '50px', md: '0' },
  },
};
export const CardDocs = () => {
  return (
    <Box sx={styles.root}>
      {/*//& 1 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={5} sx={styles.cardGrid}>
          <Typography variant="h2">Info Display Card</Typography>
          <InfoDisplayCard
            variant="small"
            homeworkItem={{
              subject: 'Science',
              chapter: 'Friction',
              hwName: 'My Homework',
              teacherName: 'Deepali',
              completed: '0',
            }}
            iconDetails={idcIconDetails}
          />

          <InfoDisplayCard
            variant="medium"
            currentTabValue="Ended"
            homeworkItem={{
              subject: 'Science',
              chapter: 'Friction',
              hwName: 'My Homework',
              teacherName: 'Deepali',
              completed: '0',
            }}
            iconDetails={idcIconDetails}
          />

          <InfoDisplayCard
            variant="large"
            homeworkItem={{
              subject: 'Science',
              chapter: 'Friction',
              hwName: 'My Homework',
              teacherName: 'Deepali',
              completed: '100',
            }}
            iconDetails={idcIconDetails}
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<InfoDisplayCard />'}</Typography>
          <Typography variant="h3">variant = small / medium / large</Typography>
          <Typography variant="h3">
            rootStyle - will override any style in root folder
          </Typography>
          <Typography variant="h3">
            currentTabValue - stores which tab is open (its default value is
            "Active")
          </Typography>
          <Typography variant="h3">
            iconDetails - stores array with icon name and its details
          </Typography>
          <Typography variant="h3">status?: ReactNode</Typography>
        </Grid>
      </Grid>

      {/*//& 2 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Info Display Panel</Typography>
          <InfoDisplayPanel
            defaultImage="lessonplan-v1"
            variant="small"
            blueSubText="8A- Science"
            mainHeading="Fast Fluid Friction"
            iconDetails={idpIconDetails}
          />

          <InfoDisplayPanel
            defaultImage="lessonplan-v1"
            variant="medium"
            blueSubText="8A- Science"
            mainHeading="Production and Propagation of sound"
            iconDetails={idpIconDetails}
          />

          <InfoDisplayPanel
            defaultImage="lessonplan-v1"
            variant="large"
            blueSubText="8A- Science"
            mainHeading="Characteristics of Sound"
            iconDetails={[
              ...idpIconDetails,
              {
                iconName: 'bar-graph',
                text: 'Medium',
              },
            ]}
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<InfoDisplayPanel />'}</Typography>
          <Typography variant="h3">variant = small / medium / large</Typography>
          <Typography variant="h3">
            rootStyle - will override any style in root folder
          </Typography>
          <Typography variant="h3">
            blueSubText,mainHeading - take 2 different headings
          </Typography>
          <Typography variant="h3">status?: ReactNode</Typography>
        </Grid>
      </Grid>

      {/*//& 3 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item xs={12} md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Content Detail Card</Typography>
          <ContentDetailCard
            variant="small"
            image={contentImage}
            heading="Fast Fluid Friction"
            iconDetails={cdcIconDetails}
          />

          <ContentDetailCard
            variant="medium"
            image={contentImage}
            tagName="Explanation"
            heading="Fast Fluid Friction"
            iconDetails={cdcIconDetails}
          />

          <ContentDetailCard
            variant="large"
            image={contentImage}
            tagName="Explanation"
            heading="Fluid Friction and Factors Affecting It"
            iconDetails={cdcIconDetails}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<ContentDetailCard />'}</Typography>
          <Typography variant="h3">variant = small / medium / large</Typography>
          <Typography variant="h3">
            tagName - (optional) will add a tag on top
          </Typography>
          <Typography variant="h3">heading</Typography>
          <Typography variant="h3">
            iconDetails - stores array with icon name and its details
          </Typography>
          <Typography variant="h3">
            rootStyle - will override any style in root folder
          </Typography>
          <Typography variant="h3">status?: ReactNode</Typography>
        </Grid>
      </Grid>

      {/*//& 4 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Heading Card</Typography>
          <Box width="400px">
            <HeadingCard
              variant="small"
              image={contentImage}
              heading="Science"
              secondaryHeading="Class 8A"
            />
          </Box>

          <Box width="400px">
            <HeadingCard
              variant="medium"
              image={contentImage}
              heading="Science"
              iconDetails={cdcIconDetails}
            />
          </Box>

          <Box width="600px">
            <HeadingCard
              variant="large"
              image={contentImage}
              heading="Fast Fluid Friction"
            />
          </Box>
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<HeadingCard />'}</Typography>
          <Typography variant="h3">
            variant = small / medium / large (it will define image size, width
            has to be defined in parent)
          </Typography>
          <Typography variant="h3">
            iconDetails - stores array with icon name and its details
          </Typography>
          <Typography variant="h3">status?: ReactNode</Typography>
          <Typography variant="h3">
            rootStyle - will override any style in root folder
          </Typography>
        </Grid>
      </Grid>

      {/*//& 5 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={5.5} sx={styles.cardGrid}>
          <Typography variant="h2">Chapter Info Card</Typography>
          <ChapterInfoCard
            variant="small"
            tagName="Ongoing"
            mainHeading="6. Friction"
            iconDetails={cdcIconDetails}
          />

          <ChapterInfoCard
            variant="medium"
            mainHeading="6. Friction"
            iconDetails={cdcIconDetails}
            withArrow
          />

          <ChapterInfoCard
            variant="large"
            tagName="Ongoing"
            mainHeading="6. Friction  "
            blueSubText="3 Topics"
            withArrow
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<ChapterInfoCard />'}</Typography>
          <Typography variant="h3">
            variant = small / medium / large (md: 2 functional, xs: 1
            functional)
          </Typography>
          <Typography variant="h3">
            image, tagName(only for desktop), mainHeading, blueSubText
          </Typography>
          <Typography variant="h3">
            iconDetails - stores array with icon name and its details
          </Typography>
          <Typography variant="h3">
            withArrow - boolean value to display the arrow
          </Typography>
          <Typography variant="h3">
            status?: ReactNode in place of iconDetails
          </Typography>
          <Typography variant="h3">
            rootStyle - will override any style in root folder
          </Typography>
        </Grid>
      </Grid>

      {/*//& 6 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Chapter Card</Typography>
          <ChapterCard
            defaultImage="lesson-plan-v1"
            variant="normal"
            mainHeading="mainHeading1"
          />
          <ChapterCard
            defaultImage="lesson-plan-v1"
            variant="ongoing"
            mainHeading="mainHeading2"
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<ChapterCard />'}</Typography>
          <Typography variant="h3">variant = normal / ongoing</Typography>
        </Grid>
      </Grid>

      {/*//& 7 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Subject Card</Typography>
          <SubjectCard title={'Science'} subTitle={'Class 8A'} />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<SubjectCard />'}</Typography>
        </Grid>
      </Grid>

      {/*//& 8 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Content Card</Typography>
          <ContentCard
            contentName="Chapter Summary"
            contentType="Reading"
            image={contentImage}
          />

          <ContentCard
            contentName="Chapter Summary"
            contentType="Reading"
            image={contentImage}
            withTag
            taskName="Explanation"
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<ContentCard />'}</Typography>
          <Typography variant="h3">**use ContentDetailCard instead</Typography>
        </Grid>
      </Grid>

      {/*//& 9 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Topic Card</Typography>
          <TopicCard
            title="12.1 Fluid Friction"
            lessonPlanCount={2}
            questionsCount={50}
            viewAllClickHandler={() => console.log('docs')}
          />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<TopicCard />'}</Typography>
          <Typography variant="h3">viewAllClickHandler</Typography>
        </Grid>
      </Grid>

      {/*//& 10 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Homework Card</Typography>
          <HomeworkCard custom={false} />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<HomeworkCard />'}</Typography>
          <Typography variant="h3">custom : boolean</Typography>
          <Typography variant="h3">userName, userImage</Typography>
        </Grid>
      </Grid>

      {/*//& 11 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Manage Homework Card</Typography>
          {/* <ManageHomeworkCard
            withScore
            chapterName="Friction"
            subjectName="8a Science"
            image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
            score={60}
          />

          <ManageHomeworkCard
            chapterName="Friction"
            subjectName="8a Science"
            image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
          /> */}
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<ManageHomeworkCard />'}</Typography>
          <Typography variant="h3">
            withScore - will show progress bar on image
          </Typography>
          <Typography variant="h3">score</Typography>
          <Typography variant="h3">chapterName, subjectName, image</Typography>
        </Grid>
      </Grid>

      {/*//& 12 */}
      <Grid container sx={styles.cardAndDetailsBox}>
        <Grid item md={4} sx={styles.cardGrid}>
          <Typography variant="h2">Student Score Card</Typography>
          <StudentScoreCard studentName="Jason Andrew" score={80} />
        </Grid>

        <Grid item md={6} sx={styles.infoBox}>
          <Typography variant="h3">{'<StudentScoreCard />'}</Typography>
          <Typography variant="h3">studentName</Typography>
        </Grid>
      </Grid>

      {/* ---------------------------- */}
    </Box>
  );
};

const idcIconDetails = [
  {
    iconName: 'questions',
    text: '20',
    label: 'Questions',
  },
  {
    iconName: 'clock',
    text: '10 hrs',
    label: 'Remaining',
  },
];

const idpIconDetails = [
  {
    iconName: 'clock',
    text: '10 Min',
  },
  {
    iconName: 'questions',
    text: '10 resources',
  },
];

const cdcIconDetails = [
  {
    iconName: 'clock',
    text: '15 Min',
  },
  {
    iconName: 'questions',
    text: 'video',
  },
];
