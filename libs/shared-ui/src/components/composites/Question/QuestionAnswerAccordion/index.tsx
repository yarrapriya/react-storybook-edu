import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
const styles: IStyles = {
  accordion: {
    cursor: 'pointer',
    backgroundColor: '#F3F9FE',
    '&:before': {
      backgroundColor: '#F3F9FE',
    },
    boxShadow: 'none',
    '&.MuiPaper-root': {
      borderBottomLeftRadius: {
        xs: pxToRem(15),
        md: pxTovW(15),
      },
      borderBottomRightRadius: {
        xs: pxToRem(15),
        md: pxTovW(15),
      },
    },
    '&.Mui-expanded': {
      margin: 0
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '48px',
      margin: 0,
      borderBottom: '1px solid #E1E1E1'
    },
    '& .MuiAccordionSummary-root, .MuiAccordionDetails-root': {
      paddingX: {
        xs: pxToRem(13),
        md: pxTovW(18)
      },
    },
  },
  solutionText: {
    marginTop: {
      xs: pxToRem(4),
      md: pxTovW(8)
    },
    marginBottom: {
      xs: pxToRem(4),
      md: pxTovW(8)
    }
  }
};

interface IProps {
  accordionHeading?: JSX.Element,
  accordionBody?: JSX.Element
}

export const QuestionAnswerAccordion = (props: IProps) => {
  const { accordionBody, accordionHeading } = props;
  return (
    <Accordion sx={styles.accordion} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {accordionHeading}
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={styles.solutionText}>
          {accordionBody}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
