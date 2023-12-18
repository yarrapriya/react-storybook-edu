import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TeachClassSubjects } from '@protos/user_management/ums.login.apis_pb';
import { useEffect, useState } from 'react';
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
    borderWidth: { md: '0.052vw' }, //10px
    borderStyle: { md: 'solid' },
    borderColor: { md: 'neutral.gainsboro' },
    borderRadius: { md: '0.521vw' }, //10px
    boxShadow: '0px 0px 0.573vw rgba(231, 231, 231, 0.85)',
    '&:hover': {
      boxShadow: '0px 0px 0.573vw grey',
    },
    width: { md: pxTovW(190) }, //153px
    height: { md: pxTovW(160) }, //117px
    display: { md: 'flex' },
    flexDirection: { md: 'column' },
    justifyContent: { md: 'space-around' },
    alignItems: 'center',
    cursor: 'pointer',
    pl: { xs: pxToRem(20), md: '0' },
    overflowY: 'auto',
  },
  subjectBox: {
    width: '100%',
    p: { xs: `${pxToRem(10)} 0`, md: `${pxTovW(10)}` },
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    justifyContent: { xs: 'flex-start', md: 'center' },
    // flexWrap: { md: 'wrap' },
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
  subjectIconSmall: {
    width: { xs: pxToRem(36), md: pxTovW(28) },
    height: { xs: pxToRem(36), md: pxTovW(28) },
  },
};

//* Interface
export interface IClassAndSubjectSelected {
  classname: string;
  section: string;
  sectionId: number;
  subject: string;
  subjectId: number;
  classId: number;
  icon: string;
  bookId?: number;
  color?: string;
}
interface IProps {
  title?: string;
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  displayData: {
    subject: string;
    icon: string;
    class?: string;
    onClick?: () => void;
  }[];
  classSubjectsList?: TeachClassSubjects[];
  classAndsubjectClickHandler?: (input: IClassAndSubjectSelected) => void;
}
export const ClassAndSubjectPopup = ({
  title,
  modalState,
  setModalState,
  displayData,
  classSubjectsList,
  classAndsubjectClickHandler,
}: IProps) => {
  const [allSubjects, setAllSubjects] = useState<IClassAndSubjectSelected[]>(
    []
  );
  useEffect(() => {
    if (classSubjectsList?.length) {
      const arr = classSubjectsList.flatMap((classInfo) =>
        classInfo.subjects.map((subject) => ({
          classname: classInfo.className,
          section: classInfo.sectionName,
          sectionId: classInfo.sectionId,
          subjectId: subject.subjectId,
          subject: subject.subjectName,
          icon: subject.iconUrl,
          color: subject.textColor,
          bookId: subject.bookId,
          classId: classInfo.classId,
        }))
      );
      setAllSubjects([...arr]);
    }
  }, [classSubjectsList?.length]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const subjectClickHandler = (classInfo: IClassAndSubjectSelected) => {
    // console.log({ classInfo });
    const {
      classname,
      subject,
      section,
      subjectId,
      sectionId,
      bookId,
      classId,
      icon,
    } = classInfo;
    const classAndSubject = {
      classname,
      subject,
      section,
      subjectId,
      sectionId,
      bookId,
      classId,
      icon,
    };
    if (classAndsubjectClickHandler) {
      classAndsubjectClickHandler(classAndSubject);
    }
  };
  // console.log('allSubjects', allSubjects);

  const getImageForSubject = (elem: IClassAndSubjectSelected) => {
    return elem.icon.startsWith('http') ? (
      <Box
        component="img"
        src={elem.icon}
        alt="subject_icon"
        sx={elem.classname ? styles.subjectIconSmall : styles.subjectIcon}
      />
    ) : (
      <Box
        sx={{
          ...(elem.classname ? styles.subjectIconSmall : styles.subjectIcon),
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
    );
  };

  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box sx={styles.headingBox}>
          <Typography variant="h2" fontWeight="medium">
            {title || 'Choose Class & Subject'}
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

        {allSubjects && (
          <Box sx={styles.displayDataMapper}>
            {allSubjects.map((elem, index) => (
              <Box
                key={index}
                sx={{ ...styles.classAndSubjectBox }}
                onClick={() => subjectClickHandler(elem)}
              >
                {elem.classname && (
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography
                      variant="g1"
                      color={elem.color || 'text.primary'}
                    >
                      {elem.classname || ''} {elem.section || ''}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    ...styles.subjectBox,
                    ...(elem.classname ? { flexDirection: 'row' } : {}),
                  }}
                >
                  {elem.icon && !isMobile ? (
                    getImageForSubject(elem)
                  ) : (
                    <Box
                      sx={{
                        background: elem.color + '33',
                        border: elem.color
                          ? `1px solid ${elem.color}`
                          : undefined,
                        borderRadius: '50%',
                        height: { xs: pxToRem(36), md: pxTovW(28) },
                        width: { xs: pxToRem(36), md: pxTovW(28) },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h3"
                        color={elem.color}
                        sx={{ fontWeight: 900 }}
                      >
                        {elem.classname || ''}
                        {elem.section || ''}
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    variant="cardText"
                    sx={{
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
            ))}
          </Box>
        )}
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
