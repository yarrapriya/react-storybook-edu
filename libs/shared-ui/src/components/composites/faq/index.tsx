import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: {
      xs: `${pxToRem(15)} ${pxToRem(20)}`,
    },
    margin: '0 auto',
    maxWidth: {
      xs: 'unset',
      md: pxTovW(900),
    },
  },
  header: {
    marginBottom: {
      xs: pxToRem(26),
      md: pxTovW(30),
    },
  },
  accordion: {
    cursor: 'pointer',
    backgroundColor: 'common.white',
    '&:before': {
      backgroundColor: 'common.white',
    },
    boxShadow: '0 0 10px #00000029',
    '&.MuiPaper-root': {
      borderRadius: {
        xs: pxToRem(15),
        md: pxTovW(15),
      },
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '48px',
      margin: 0,
      borderBottom: '1px solid #E1E1E1',
    },
    '& .MuiAccordionSummary-root, .MuiAccordionDetails-root': {
      paddingX: {
        xs: pxToRem(13),
        md: pxTovW(18),
      },
    },
  },
  faqText: {
    marginTop: {
      xs: pxToRem(4),
      md: pxTovW(8),
    },
    marginBottom: {
      xs: pxToRem(4),
      md: pxTovW(8),
    },
  },
};

interface AccordionElementProps {
  ques: string;
  ans: string;
  defaultExpanded?: boolean;
}

const AccordionElement = (props: AccordionElementProps) => {
  const [expanded, setExpanded] = useState(props.defaultExpanded || false);
  return (
    <Accordion
      sx={styles.accordion}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h3">{props.ques}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={styles.faqText}>
          <Typography variant="bodyText">{props.ans}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

interface IProps {
  role: ProfileRolesEnum;
}

export const FAQElement = (props: IProps) => {
  const { role } = props;
  const items =
    role === ProfileRolesEnum.PROFILE_ROLE_STUDENT
      ? faqStudent
      : role === ProfileRolesEnum.PROFILE_ROLE_TEACHER
      ? faqTeacher
      : [];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">FAQs</Typography>
      </Box>
      {items.map((item, index) => {
        return (
          <Box
            key={'accordion_' + index}
            sx={{
              marginBottom: {
                xs: pxToRem(20),
                md: pxTovW(25),
              },
            }}
          >
            <AccordionElement
              ques={item.ques}
              ans={item.ans}
              defaultExpanded={index === 0}
            />
          </Box>
        );
      })}
      {/* <Button
        variant="contained"
        color="secondary"
        sx={{ width: 'fit-content', margin: '0 auto', borderRadius: '20px' }}
      >
        Load More
      </Button> */}
    </Box>
  );
};

const faqTeacher = [
  {
    ques: 'Q1. How do I create and assign homework?',
    ans: "To create a custom homework, you can either use Geneo recommended questions or search for specific questions from Geneo Bank to include. Once you've crafted the Homework, simply assign it to your students. Students will be notified, and you can monitor their submissions.",
  },
  {
    ques: 'Q2. Can I customize lesson plans using Other available Geneo resources?',
    ans: "Absolutely! You can either Edit the existing lesson plans provided or create your own using Lesson plan using resources from various categories of the topics resources. This flexibility allows you to tailor lessons to your class's needs.",
  },
  {
    ques: "Q3. How can I track my students' progress?",
    ans: 'Our Analysis feature enables you to monitor class-level, subject-level, and even individual student progress based on homework submissions. This gives you insights into areas where students might need more support.',
  },
  {
    ques: 'Q4. What if I need help with the platform or encounter technical issues?',
    ans: "If you encounter any difficulties or have questions about using the platform, there is support contact information provided. Feel free to ask for assistance, and we'll ensure a prompt response. Also, you may reach out to School admin for any login related issues.",
  },
];

const faqStudent = [
  {
    ques: 'Q1. How do I submit my homework?',
    ans: 'When Teacher assigns a Homework It will be available under active HomeWorks, you can complete the homework directly through the platform by submitting each question of the Homework.',
  },
  {
    ques: 'Q2. Can I review completed homework assignments?',
    ans: 'Yes, you can access a record of your completed homework from ended Homework section in Homework Module. This allows you to revisit your work and track your progress over time.',
  },
  {
    ques: 'Q3. How can I view available resources for my subjects?',
    ans: 'Resources are accessible for each subject. You can navigate through chapters and topics to view the resources. You can go through the chapter level resource and topic level resource and better prepare for upcoming lessons.',
  },
  {
    ques: "Q4. Will I know how I'm doing in my studies?",
    ans: "Definitely! The Performance feature lets you view your progress on a subject-by-subject basis, as well as detailed insights into your performance on specific chapters and topics. This helps you identify areas where you're excelling and areas where you might need more practice.",
  },
  {
    ques: 'Q5. What if I need technical assistance or have questions about the platform?',
    ans: "If you encounter any difficulties or have questions about using the platform, there is support contact information provided. Feel free to ask for assistance, and we'll ensure a prompt response. Also, you may reach out to School admin for any login related issues.",
  },
];
