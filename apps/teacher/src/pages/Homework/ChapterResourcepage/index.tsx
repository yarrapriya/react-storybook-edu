import {
  IStyles,
  ImageWrapper,
  PaginationButton,
  TableOne,
  pxToRem,
  pxTovW
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { ResourceHeading } from './components/ResourceHeading';

const styles: IStyles = {
  root: {
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    position: 'relative',
    boxSizing: 'border-box',
  },

  textContainer: {
    // p: { xs: `0 ${pxToRem(10)}`, md: `0 ${pxToRem(425)} 0 ${pxToRem(427)}` },
    // border: '1px solid red',
    width: { md: pxTovW(1074) },
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    margin: 'auto',
    mb: { xs: pxToRem(20), md: pxTovW(150) },
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(5), md: pxTovW(10) },
  },

  internalImage: {
    width: { xs: pxToRem(20), md: pxTovW(540) },
    height: { xs: pxToRem(20), md: pxTovW(346) },
    // m: { xs: pxToRem(20), md: pxTovW(20) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    boxShadow: `0px 0px ${pxTovW(11)} #E7E7E7D9`,
  },

  paginationButtonBox: {
    position: 'fixed',
    bottom: { md: pxTovW(30) },
    left: '40%',
  },
};

export const ChapterResourcePage = () => {
  return (
    <Box sx={styles.root}>
      <ResourceHeading />

      <Box sx={styles.textContainer}>
        <BorderHeading
          heading="Fluid Friction"
          label="Factors Affecting Fluid Friction"
          withoutBorder
        />

        <BorderHeading heading="OBJECTIVE" />

        <Box sx={styles.list}>
          {tempDataOne.map((elem, index) => (
            <Typography variant="bodyText" color="initial">
              {index + 1}. {elem}
            </Typography>
          ))}
        </Box>

        <ImageWrapper
          name="fluidFrictionItems"
          type="png"
          parentFolder="tempAssets"
        // styles={styles.internalImage}
        />

        <BorderHeading heading="PROCEDURE" />

        <ImageWrapper
          name="fluidFrictionImage"
          type="png"
          parentFolder="tempAssets"
          styles={{
            ...styles.internalImage,
            maxWidth: { xs: pxToRem(20), md: pxTovW(1073) },
            width: '100%',
            height: { xs: pxToRem(20), md: pxTovW(499) },
          }}
        />

        <Box sx={styles.list}>
          {tempDataTwo.map((elem, index) => (
            <Typography variant="bodyText">
              {index + 1}. {elem}
            </Typography>
          ))}
        </Box>

        <TableOne />
      </Box>

      <Box sx={styles.paginationButtonBox}>
        <PaginationButton currentPage={1} totalPages={4} />
      </Box>
    </Box>
  );
};
const tempDataOne = [
  'Three 100 ml beakers',
  'Water',
  'Vegetable oil',
  'Honey',
  'Three identical metal ball bearings',
  'Three identical small metal sheets (of approximate area 4 cm^2).',
];
const tempDataTwo = [
  'Place the three beakers on a flat surface.',
  'Pour the three liquids (water, vegetable oil, and honey) one by one in the three different beaker so that it is at least 70% filled.',
  'Below each beaker, label the liquid poured into it.',
  'Drop one ball bearing in each of the three beakers and animate it like falling through the liquid in a straight line and ending up at the bottom. Do it so that the ball moves fastest in water, medium fast in vegetable oil, and slow in honey.',
  'Drop one metal sheet in each of the three beakers animate it like falling through the liquid not moving in a straight line and ending up at the bottom. Do it so that the sheet moves fastest in water, medium fast in vegetable oil, and slow in honey. The speeds here should not be the same as in the case of metal ball, but must be slower in general.',
];

interface IBorderHeading {
  heading: string;
  label?: string;
  withoutBorder?: boolean;
  borderColor?: string;
}
const BorderHeading = ({
  heading,
  withoutBorder,
  label,
  borderColor,
}: IBorderHeading) => {
  return (
    <Box
      sx={{
        borderLeft: withoutBorder ? 'none' : `${pxTovW(8)} solid red`,
        borderColor: borderColor ? borderColor : 'warning.main',
        m: { xs: `${pxToRem(6)} 0`, md: `${pxToRem(15)} 0` },
        pl: { xs: pxToRem(6), md: pxTovW(6) },
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        {heading}
      </Typography>

      {label && (
        <Typography variant="bodyText">
          Factors Affecting Fluid Friction
        </Typography>
      )}
    </Box>
  );
};
