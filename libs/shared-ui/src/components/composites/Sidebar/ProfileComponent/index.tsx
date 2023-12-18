import { Box, Grid, Typography } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { BoardMediumInfo, ProfilePicInfo, SchoolBoardMediumInfo, SchoolInfo, SubjectList, TeachClassSubjects } from '@protos/user_management/ums.login.apis_pb';
import React from 'react';
import { firstLetterImage } from '../../../../commonUtils/images';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ImageWrapper from '../../../elements/ImageWrapper';

const boxColor = '#7a3bd0';
const pageBackgroundColor = '#fdfbfb'
const imageHeight = 150;
const borderRadiusBoxHeight = 30;

const styles: IStyles = {
  topBox: {
    height: {
      xs: pxToRem(220),
      md: pxTovW(220)
    },
    background: boxColor,
    position: 'relative'
  },
  topFirstBoxOuter: {
    position: 'absolute',
    height: {
      xs: pxToRem(borderRadiusBoxHeight),
      md: pxTovW(borderRadiusBoxHeight)
    },
    background: pageBackgroundColor,
    bottom: {
      xs: pxToRem(borderRadiusBoxHeight),
      md: pxTovW(borderRadiusBoxHeight)
    },
    width: '100%',
  },
  topFirstBoxInner: {
    height: '100%',
    width: '100%',
    background: boxColor,
    borderBottomLeftRadius: '30px'
  },
  topSecondBoxOuter: {
    position: 'absolute',
    height: {
      xs: pxToRem(borderRadiusBoxHeight),
      md: pxTovW(borderRadiusBoxHeight)
    },
    background: boxColor,
    bottom: 0,
    width: '100%',
  },
  topSecondBoxInner: {
    height: '100%',
    width: '100%',
    background: pageBackgroundColor,
    borderTopRightRadius: '30px'
  },
  profileType: {
    paddingLeft: {
      xs: pxToRem(20),
      md: 0
    },
    paddingTop: {
      xs: pxToRem(20),
      md: pxTovW(20),
    },
    textAlign: {
      xs: 'left',
      md: 'center'
    }
  },
  userImage: {
    height: {
      xs: pxToRem(imageHeight),
      md: pxTovW(imageHeight)
    },
    width: {
      xs: pxToRem(imageHeight),
      md: pxTovW(imageHeight)
    },
    borderRadius: '50%',
    border: '6px solid #fff',
    backgroundColor: '#fff'
  },
  profilePicBox: {
    position: 'absolute',
    bottom: {
      xs: pxToRem(-((imageHeight / 2) - borderRadiusBoxHeight)),
      md: pxTovW(-((imageHeight / 2) - borderRadiusBoxHeight))
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBody: {
    paddingX: {
      xs: pxToRem(20),
      md: 0
    },
    margin: '0 auto',
    marginTop: {
      xs: pxToRem(((imageHeight / 2) - borderRadiusBoxHeight)),
      md: pxTovW(((imageHeight / 2) - borderRadiusBoxHeight))
    },
    maxWidth: {
      xs: 'unset',
      md: pxTovW(900)
    }
  }
};
interface IProps {
  id: bigint,
  role: ProfileRolesEnum,
  profilePics?: ProfilePicInfo[],
  name?: string,
  phone?: string,
  email?: string,
  schoolDetails?: SchoolInfo,
  schoolBoardMediumInfo?: SchoolBoardMediumInfo[],
  boardMediumDetails?: BoardMediumInfo;
  teachClassSubjects?: TeachClassSubjects[]
  learnSubjects?: SubjectList[]
  className?: string
}

export const ProfileComponent = (props: IProps) => {
  const { id, role, profilePics, name, phone, email, schoolDetails, schoolBoardMediumInfo, boardMediumDetails, teachClassSubjects, learnSubjects, className } = props;
  const url = profilePics ? profilePics[0]?.url : undefined;



  const renderBox = (key: string, val: string) => {
    return <Box>
      <Grid container spacing={0} sx={{
        paddingY: {
          xs: pxToRem(20),
          md: pxTovW(20)
        },
        borderBottom: '1px dashed #333333'
      }}>
        <Grid item xs={5}>
          <Typography variant='h3'>
            {key}
          </Typography>
        </Grid>
        <Grid item xs={7} sx={{ textAlign: 'right' }}>
          <Typography variant='h3' color='#3F4D8F'>
            {val}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  }
  return (
    <>
      <Box sx={styles.topBox}>
        <Box sx={styles.profileType}>
          <Typography variant={'bodyText'} color="common.white">
            {role === ProfileRolesEnum.PROFILE_ROLE_STUDENT ?
              "Student Profile"
              :
              role === ProfileRolesEnum.PROFILE_ROLE_TEACHER ?
                "Teacher Profile"
                :
                null
            }
          </Typography>
        </Box>
        <Box sx={styles.topFirstBoxOuter}>
          <Box sx={styles.topFirstBoxInner} />
        </Box>
        <Box sx={styles.topSecondBoxOuter}>
          <Box sx={styles.topSecondBoxInner} />
        </Box>
        <Box sx={styles.profilePicBox}>
          <ImageWrapper
            name={"userBlue"}
            path={url || firstLetterImage(name)}
            type="png"
            parentFolder="icons"
            styles={styles.userImage}
          />
        </Box>
      </Box>
      <Box sx={styles.profileBody}>
        <Box sx={{ textAlign: 'center' }}>
          {name && (
            <Typography variant='h1' sx={{
              marginY: {
                xs: pxToRem(2),
                md: pxTovW(5)
              },
            }}>{name}</Typography>
          )}
          <Typography variant='h4' sx={{
            marginY: {
              xs: pxToRem(2),
              md: pxTovW(5)
            },
            color: "#999999"
          }}>
            {role === ProfileRolesEnum.PROFILE_ROLE_STUDENT ?
              "Student"
              :
              role === ProfileRolesEnum.PROFILE_ROLE_TEACHER ?
                "Teacher"
                :
                null
            }
          </Typography>
        </Box>
        <Box sx={{
          marginY: {
            xs: pxToRem(30),
            md: pxTovW(30)
          }
        }}>
          <Box>
            <Typography variant='h2' sx={{
              marginY: {
                xs: pxToRem(2),
                md: pxTovW(5)
              }
            }}>Personal Details</Typography>
            {className && renderBox("Class", className)}
            {phone && renderBox("Phone", phone)}
            {email && renderBox("Email", email)}
          </Box>
          <Box>
            <Typography variant='h2' sx={{
              marginTop: {
                xs: pxToRem(20),
                md: pxTovW(20)
              }
            }}>School Details</Typography>
            {schoolBoardMediumInfo?.map(schoolDetails => {
              return <React.Fragment key={schoolDetails.schoolId}>
                {schoolDetails.schoolName && schoolDetails.schoolName && renderBox("School Name", schoolDetails.schoolName)}
                {schoolDetails.boardMediumInfo && schoolDetails.boardMediumInfo.length > 0 && schoolDetails.boardMediumInfo.map(boardMedium => (
                  <React.Fragment key={schoolDetails.schoolId + "_" + boardMedium.boardId}>
                    {boardMedium?.boardName && renderBox("Your board", boardMedium.boardName)}
                    {boardMedium?.mediumName && renderBox("Your medium", boardMedium.mediumName)}
                  </React.Fragment>
                ))}
              </React.Fragment>
            })}
            {schoolDetails && schoolDetails.schoolName && renderBox("School Name", schoolDetails.schoolName)}
            {boardMediumDetails?.boardName && renderBox("Your board", boardMediumDetails.boardName)}
            {boardMediumDetails?.mediumName && renderBox("Your medium", boardMediumDetails.mediumName)}
            {learnSubjects && learnSubjects.length > 0 && renderBox("Your Subjects", learnSubjects.map(val => val.subjectName).join(', '))}
            {teachClassSubjects && teachClassSubjects.length > 0 && renderBox("Class & Subjects", teachClassSubjects.reduce((acc: string[], item) => {
              const classSection = `${item.className}${item.sectionName} `;
              const subjects = item.subjects.map(sub => classSection + sub.subjectName);
              return [...acc, ...subjects];
            }, []).join(', '))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileComponent;
