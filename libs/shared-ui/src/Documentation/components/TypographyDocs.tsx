import { Box, Typography } from '@mui/material';

export const TypographyDocs = () => {
  const styles = {
    weightDescription: {
      borderBottom: '0.073vw solid black',
      display: 'flex',
      gap: '2vw',
      p: '0 2vw 1vw',
    },
    details: {
      borderBottom: '0.073vw solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: '0 2vw 1vw',
    },
  };

  return (
    <Box sx={{ width: '95%', m: 'auto' }}>
      <Typography variant="h3">
        # Typography variants in addition to MUI text variants ..... Screen
        width: 1920px ..... Mob: rem = px / base size{'(10px)'}
      </Typography>

      <Typography variant="bodyText" color="text.disabled" fontWeight="medium">
        {'<Typography variant="bodyText" fontWeight="medium">'}Example
        {'</Typography>'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" color="#FE5953">
          * Default fontWeight can be changed by passing prop (fontWeight:
          "light / regular / medium / bold")
        </Typography>
        <Box sx={styles.weightDescription}>
          <Typography variant="h5">fontWeight="light" : 400,</Typography>
          <Typography variant="h5">fontWeight="regular" : 500,</Typography>
          <Typography variant="h5">fontWeight="medium" : 600,</Typography>
          <Typography variant="h5">fontWeight="bold" : 700,</Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="g1">g1 - typography - Poppins</Typography>
          <Typography variant="h3">
            fontWeight: "600" fontSize: "2.396vw" //46px //Mob: 46px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="g2">g2 - typography - Poppins</Typography>
          <Typography variant="h3">
            fontWeight: "600" fontSize: "1.667vw" //32px //Mob: 32px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="h1">h1 - typography - Poppins</Typography>
          <Typography variant="h3">
            fontWeight: "600" fontSize: "2.188vw" //42px //Mob: 21px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="h2">h2 - typography - Poppins</Typography>
          <Typography variant="h3">
            fontWeight: "500", fontSize: "1.563vw", //30px //Mob: 18px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="h3">h3 - typography - Poppins</Typography>
          <Typography variant="h3">
            fontWeight: "500", fontSize: "1.094vw", //21px //Mob: 16px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="h4">h4 - typography - Lato</Typography>
          <Typography variant="h3">
            fontWeight: "500", fontSize: '0.938vw', //18px //Mob: 14px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="h5">h5 - typography - Lato</Typography>
          <Typography variant="h3">
            fontWeight: "500", fontSize: '0.833vw', //16px //Mob: N/A
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="cardText">
            cardText - typography - Lato
          </Typography>
          <Typography variant="h3">
            fontWeight: "600", fontSize: "0.938vw", //18px //Mob: 16px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="bodyText">
            bodyText - typography - Lato
          </Typography>
          <Typography variant="h3">
            fontWeight: "400", fontSize: "1.094vw", //21px //Mob: 16px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="linkText">
            linkText - typography - Lato - #0AA34F
          </Typography>
          <Typography variant="h3">
            fontWeight: "400", fontSize: "1.094vw", //21px //Mob: 16px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="smallText">
            smallText - typography - Lato
          </Typography>
          <Typography variant="h3">
            fontWeight: "700", fontSize: "0.729vw", //14px //Mob: 11px
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="subText">subText - typography - Lato</Typography>
          <Typography variant="h3">
            fontWeight: "400", fontSize: '0.625vw', //12px //Mob: N/A
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="smallestText">
            smallestText - typography - Lato
          </Typography>
          <Typography variant="h3">
            fontWeight: "400", fontSize: '0.625vw', //10px //Mob: N/A
          </Typography>
        </Box>

        <Box sx={styles.details}>
          <Typography variant="button">button - typography - Lato</Typography>
          <Typography variant="h3">
            fontWeight: 400, fontSize: '1.094vw', //21px //Mob: 14px
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// -----------------------------

/// Headings (Poppins) [width: 1920px]

// Heading H1 SemiBold - 21px
//  font-weight: 600;
//  line-height: 48px;

// Heading H2 Medium - 18px
//  font-weight: 500;
//  line-height: 36px;

// Heading H3 Medium - 16px
// font-weight: 500;
// line-height: 30px;

// Heading H3 Semibold - 16px
// font-weight: 600;
// line-height: 30px;

// -----------------------------

/// Body text (Lato)

// Card text Bold - 16px
// font-weight: 600;
// line-height: 21px;

// Body text Regular  - 16px
// font-weight: 400;
// line-height: 21px;

// Small Text bold - 11px
// font-weight: 700;
// line-height: 24px;
