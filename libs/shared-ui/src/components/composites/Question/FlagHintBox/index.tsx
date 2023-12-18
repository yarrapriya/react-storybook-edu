import { Box } from '@mui/material';

import { IStyles, ImageWrapper, pxToRem, pxTovW } from '@geneo2-web/shared-ui';

const styles: IStyles = {
  ideaFlagBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: {
      xs: `${pxToRem(40)} ${pxToRem(21)}`,
      md: `${pxTovW(40)} 0 0 0`,
    },
  },

  icons: {
    width: { xs: pxToRem(41), md: pxTovW(41) },
    height: { xs: pxToRem(41), md: pxTovW(41) },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  flag: {
    width: { xs: pxToRem(25), md: pxTovW(25) },
    height: { xs: pxToRem(25), md: pxTovW(25) },
  },
};

interface IProps {
  hintClickHandler: () => void;
  // flagClickHandler: () => void;
}
export const FlagHintBox = ({
  hintClickHandler,
  // flagClickHandler,
}: IProps) => {
  return (
    <Box sx={styles.ideaFlagBox}>
      <ImageWrapper
        name="light-bulb-yellow"
        type="png"
        parentFolder="icons"
        styles={styles.icons}
        onClick={hintClickHandler}
      />

      {/* <Box
        sx={{
          ...styles.icons,
          border: { xs: `${pxToRem(1)} solid #C4E5FF` },
          borderRadius: '50%',
        }}
      >
        <ImageWrapper
          name="flag-lightBlue"
          type="png"
          parentFolder="icons"
          onClick={flagClickHandler}
          styles={styles.flag}
        />
      </Box> */}
    </Box>
  );
};
