//* MUI imports
import { Box, Typography } from '@mui/material';

export const PaletteDocs = () => {
  const styles = {
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '2vw',
      mt: '2vw',
      p: '3vw 1vw',
      bgcolor: '#cbd5e0ff',
      borderRadius: '1vw',
    },
  };

  return (
    <Box sx={styles.root}>
      <PaletteBox text="common.black" colorCode="#1D1D1D" />
      <PaletteBox text="common.white" colorCode="#FFFFFF" />

      <PaletteBox text="primary.main" colorCode="#007CDC" />

      <PaletteBox text="secondary.main" colorCode="#0AA34F" />

      <PaletteBox text="error.main" colorCode="#d41f00" />
      <PaletteBox text="error.light" colorCode="#FAE9E6" />

      <PaletteBox text="warning.main" colorCode="#F8C807" />

      <PaletteBox text="success.main" colorCode="#0F8F10" />
      <PaletteBox text="success.light" colorCode="#E7F4E7" />

      <PaletteBox text="info.main" colorCode="#4B4DFD" />

      <PaletteBox text="neutral.lightGreen" colorCode="#F0FDE0" />
      <PaletteBox text="neutral.aqua" colorCode="#F2F3FE" />
      <PaletteBox text="neutral.lightPink" colorCode="#FFEEEE" />
      <PaletteBox text="neutral.lightOrange" colorCode="#FFF3E7" />
      <PaletteBox text="neutral.vistaWhite" colorCode="#F9F9F9" />
      <PaletteBox text="neutral.turquoise" colorCode="#C1F8DA" />
      <PaletteBox text="neutral.paleGrey" colorCode="#FDFBFB" />
      <PaletteBox text="neutral.grey" colorCode="#B8B8B8" />
      <PaletteBox text="neutral.lightBlue" colorCode="#DAF5FF" />
      <PaletteBox text="neutral.royalBlue" colorCode="#3F4D8F" />
      <PaletteBox text="neutral.gainsboro" colorCode="#E0DFDE" />
      <PaletteBox text="neutral.crimson" colorCode="#F54040" />
      <PaletteBox text="neutral.honeydew" colorCode="#ECFFF5" />
      <PaletteBox text="neutral.aliceBlue" colorCode="#F8FCFF" />
      <PaletteBox text="neutral.cornflowerBlue" colorCode="#61BAFF" />
      <PaletteBox text="neutral.lightMint" colorCode="#DDFAEA" />

      <PaletteBox text="text.primary" colorCode="#333333" />
      <PaletteBox text="text.secondary" colorCode="#1D1D1D" />
      <PaletteBox text="text.disabled" colorCode="#B8B8B8" />
    </Box>
  );
};

interface IPB {
  text: string;
  colorCode: string;
}
const PaletteBox = ({ text, colorCode }: IPB) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
      <Box sx={{ height: '4vw', width: '4vw', bgcolor: colorCode }}></Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.1vw' }}>
        <Typography variant="bodyText">{text}</Typography>
        <Typography variant="bodyText">{colorCode}</Typography>
      </Box>
    </Box>
  );
};
