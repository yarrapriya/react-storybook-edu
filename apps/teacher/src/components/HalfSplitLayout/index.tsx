import { GeneoLoginCarousel, IStyles } from '@geneo2-web/shared-ui';
import { Grid } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import React from 'react';

const styles: IStyles = {
  container: {
    borderRadius: '5px',
    display: 'flex',
    width: '100vw',
    height: '100vh',
    margin: 'auto',
  },
};
interface IProps {
  children: React.ReactNode;
  skipped: boolean;
  setSkipped?: (key: boolean) => void;
}
export default function HalfSplitLayout({
  children,
  setSkipped,
  skipped,
}: IProps) {
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: '#E5E5E5',
          height: '100%',
          display: { xs: skipped === true ? 'none' : 'block', md: 'block' },
        }}
      >
        <GeneoLoginCarousel
          skipped={skipped}
          setSkipped={
            setSkipped ? () => setSkipped(true) : () => console.log('Skipped')
          }
          role={ProfileRolesEnum.PROFILE_ROLE_TEACHER}
        />
      </Grid>
      {children && (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            maxHeight: '100vh',
          }}
        >
          {children}
        </Grid>
      )}
    </Grid>
  );
}
