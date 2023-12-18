import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    display: 'flex',
    width: { xs: '90vw', md: 'max-content', lg: 'max-content' },
    height: { xs: pxToRem(56), md: pxTovW(70), lg: pxTovW(70) },
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: { xs: pxToRem(16), md: '21px' },
    boxShadow: '0px -11px 32px #0AA34F',
    backgroundColor: '#0AA34F',
    borderRadius: '10px',
    padding: { xs: pxToRem(5), md: pxTovW(15) },
    paddingRight: { md: pxTovW(38.4) },
    paddingLeft: { md: pxTovW(38.4) },
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // width: { xs: '15vw', md: 'max-content' },
    width: 'max-content',
    height: '70%',
    borderRight: '1px dashed white',
    // backgroundColor: 'red',
    paddingRight: { xs: pxToRem(10), md: pxTovW(38.4) },
    boxSizing: 'border-box',
    alignItems: 'center',
    '&:last-child': {
      border: 'none',
    },
  },
};
interface IProps {
  buttonTitle?: string;
  // TotalQuestions: number;
  // Time: string;
  // Marks: number;
  tabs?: ITabs[];
  clickHandler?: () => void;
}
interface ITabs {
  quantity: string;
  title: string;
}
export const HwProceedButton = (props: IProps) => {
  const { buttonTitle, tabs, clickHandler } = props;

  const buttonClickHandler = () => {
    if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          height: { xs: pxToRem(56), md: pxTovW(70) },
          gap: { xs: pxToRem(18), md: pxTovW(38.4) },
          alignItems: 'center',
        }}
      >
        {tabs?.map((singleTab, index) => (
          <Box key={index} sx={styles.infoBox}>
            <Typography variant="h3" fontWeight="bold" color="white">
              {singleTab.quantity}
            </Typography>
            <Typography variant="h3" color="white">
              {singleTab.title}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          border: '1px solid #39FC91',
          backgroundColor: '#00B954',
          padding: { xs: pxToRem(5) },
          cursor: 'pointer',
          borderRadius: { xs: pxToRem(5), md: pxTovW(5) },
        }}
      >
        <Button onClick={buttonClickHandler}>
          <Typography variant="h3" color="white" fontWeight="bold">
            {buttonTitle ? buttonTitle : 'Proceed'}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
