import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
  },

  root: {
    backgroundColor: 'common.white',
    overflowY: 'auto',
    margin: { md: 'auto' },
    width: { xs: '100%', md: pxTovW(650) },
    height: { xs: pxToRem(407), md: 'max-content' },
    maxHeight: { xs: pxToRem(407), md: '25.156vw' },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    paddingY: pxToRem(22),
    paddingX: { md: pxToRem(22) },
    mt: { md: '30vh' },
  },

  headingBox: {
    // border: '1px solid green',
    display: 'flex',
    justifyContent: 'space-between',
    paddingX: { xs: pxToRem(22), md: 0 },
    paddingBottom: { xs: pxToRem(10), md: 0 },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    width: { xs: pxToRem(13) },
    height: { xs: pxToRem(13) },
    alignItems: 'center',
    cursor: 'pointer',
  },

  displayDataMapper: {
    // display: { md: 'flex' },
    // flexWrap: { md: 'wrap' },
    // gap: { md: '0.521vw' }, //10px
    mt: { md: '1.042vw' }, //20px
    display: { md: 'grid' },
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: { xs: pxToRem(12), md: pxTovW(12) },
  },
  classAndSubjectBox: {
    // border: '1px solid red',
    borderWidth: { md: '0.052vw' }, //10px
    borderStyle: { md: 'solid' },
    borderColor: { md: 'neutral.gainsboro' },
    borderRadius: { md: '0.521vw' }, //10px
    boxShadow: '0px 0px 0.573vw rgba(231, 231, 231, 0.85)',
    '&:hover': {
      boxShadow: '0px 0px 0.573vw grey',
    },

    width: { md: pxTovW(180) }, //153px
    height: { md: pxTovW(160) }, //117px
    display: { md: 'flex' },
    flexDirection: { md: 'column' },
    justifyContent: { md: 'center' },
    alignItems: 'center',
    cursor: 'pointer',
    pl: { xs: pxToRem(20), md: '0' },
  },
  subjectBox: {
    width: '100%',
    height: '100%',
    p: { xs: `${pxToRem(10)} 0`, md: `${pxTovW(10)}` },
    boxSizing: 'border-box',
    display: 'flex',
    // flexDirection: { xs: 'row', md: 'column' },
    justifyContent: { xs: 'flex-start', md: 'space-around' },
    flexWrap: { md: 'wrap' },
    alignItems: 'center',
    gap: { xs: pxToRem(11) },
    borderTopWidth: { xs: '0.052vw' },
    borderTopStyle: { xs: 'solid', md: 'none' },
    borderTopColor: { xs: 'neutral.aqua' },
  },
  subjectIcon: {
    width: { xs: pxToRem(36), md: pxTovW(57) },
    height: { xs: pxToRem(36), md: pxTovW(57) },
  },
};

//* Interface
interface IProps {
  title?: string;
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  displayData: {
    subject: string;
    icon: string;
    onClick?: () => void;
    color: string;
  }[];
}
export const StudentSubjectPopup = ({
  title,
  modalState,
  setModalState,
  displayData,
}: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box sx={styles.headingBox}>
          <Typography variant="h2" fontWeight="medium">
            {title || 'Choose Subject'}
          </Typography>

          <Box onClick={(e) => setModalState(false)} sx={styles.closeBox}>
            <ImageWrapper
              name="close"
              type="png"
              parentFolder="icons"
              styles={styles.close}
            />
          </Box>
        </Box>

        <Box sx={styles.displayDataMapper}>
          {displayData.map((elem, index) => (
            <Box
              key={index}
              sx={styles.classAndSubjectBox}
              onClick={elem.onClick}
            >
              <Box
                sx={{
                  ...styles.subjectBox,
                  overflow: 'auto',
                }}
              >
                {elem.icon.startsWith('http') ? (
                  <Box>
                    <ImageWrapper
                      name={'subjects/' + elem.subject?.toLowerCase() || ''}
                      type="png"
                      parentFolder="icons"
                      styles={styles.subjectIcon}
                      path={
                        elem.icon.startsWith('http') ? elem.icon : undefined
                      }
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      ...styles.subjectIcon,
                      border: `1px solid ${elem.color || '#000000'}`,
                      backgroundColor: `${elem.color || '#000000'}33`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h2"
                      color={elem.color || '#000000'}
                      sx={{ fontWeight: 900 }}
                    >
                      {elem.subject ? elem.subject[0] : ''}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="cardText"
                    sx={{
                      width: 'max-content',
                      maxWidth: '100%',
                      marginX: 'auto',
                      // textOverflow: 'ellipsis',
                      whiteSpace: 'wrap',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      // WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordWrap: 'break-word',
                    }}
                  >
                    {elem.subject}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

const subjectColor: { [key: string]: string } = {
  english: 'primary',
  maths: 'warning.main',
  marathi: 'neutral.royalBlue',
  science: 'secondary',
};
