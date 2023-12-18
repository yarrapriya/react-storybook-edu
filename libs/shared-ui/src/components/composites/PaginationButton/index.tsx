import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem } from '../../../commonUtils/resizeUtils';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

export const PaginationButton = (props: IProps) => {
  const { currentPage, totalPages, onPreviousClick, onNextClick } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '4px',
        width: { xs: '100%', md: 'initial' },
        paddingLeft: { xs: pxToRem(10), md: 0 },
        paddingRight: { xs: pxToRem(10), md: 0 },
      }}
    >
      <PrevButton onPreviousClick={onPreviousClick} />
      <NumberButton currentPage={currentPage} totalPages={totalPages} />
      <NextButton onNextClick={onNextClick} />
    </Box>
  );
};

interface PrevButtonProps {
  onPreviousClick?: () => void;
}

const PrevButton = (props: PrevButtonProps) => {
  return (
    <Button
      sx={{
        width: { xs: '30%', md: pxToRem(110) }, //130
        height: { xs: '58px', md: pxToRem(40), lg: pxToRem(50) }, //60
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: { xs: '18px', md: pxToRem(21) },
        boxShadow: 'inset 0px 0px 8px #00602B,0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px 0px 0px 10px',
      }}
      variant="contained"
      color="secondary"
      onClick={props.onPreviousClick}
    >
      Prev
    </Button>
  );
};

interface NumberButtonProps {
  currentPage: number;
  totalPages: number;
}

const NumberButton = (props: NumberButtonProps) => {
  return (
    <Button
      sx={{
        width: { xs: '40%', md: pxToRem(110) },
        height: { xs: '58px', md: pxToRem(40), lg: pxToRem(50) },
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: { xs: '18px', md: '21px' },
        boxShadow: 'inset 0px 0px 8px #00602B,0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '0px 0px 0px 0px',
      }}
      variant="contained"
      color="secondary"
    >
      {props.currentPage}/{props.totalPages}
    </Button>
  );
};

interface NextButtonProps {
  onNextClick?: () => void;
}

const NextButton = (props: NextButtonProps) => {
  return (
    <Button
      sx={{
        width: { xs: '30%', md: pxToRem(110) },
        height: { xs: '58px', md: pxToRem(40), lg: pxToRem(50) },
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: { xs: '18px', md: '21px' },
        boxShadow: 'inset 0px 0px 8px #00602B,0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '0px 10px 10px 0px',
      }}
      variant="contained"
      color="secondary"
      onClick={props.onNextClick}
    >
      Next
    </Button>
  );
};
