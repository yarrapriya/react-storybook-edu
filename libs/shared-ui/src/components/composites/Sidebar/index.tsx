import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Typography } from '@mui/material';
import { pxToRem } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
const styles: IStyles = {
  drawer: {
    '& .MuiDrawer-paper': {
      borderTopLeftRadius: '50px',
      borderBottomLeftRadius: '50px',
      width: '80vw',
      height: '100vh',
      padding: `${pxToRem(16)} ${pxToRem(18.77)}`,
      boxSizing: 'border-box',
      overflowX: 'hidden',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    margin: `${pxToRem(16)} ${pxToRem(10)}`,
    paddingBottom: pxToRem(16),
    borderBottom: '1px solid #0000003B',
  },
};
interface IProps {
  open: boolean;
  handleClose: () => void;
  handleMenuClick?: (index: number) => void;
  options: Option[];
}

interface Option {
  name: string;
  icon: string;
  onClick?: () => void;
}

export const Sidebar = (props: IProps) => {
  const { open, handleClose, options } = props;
  return (
    <Drawer sx={styles.drawer} anchor="right" open={open} onClose={handleClose}>
      <Box sx={styles.header}>
        <Typography variant="h1" fontWeight="bold">
          Our Menus
        </Typography>
        <CloseIcon onClick={handleClose} />
      </Box>
      {[...options].map((option, index) => (
        <Box
          key={index}
          sx={{
            ...styles.header,
            justifyContent: 'flex-start',
            gap: pxToRem(7),
            borderBottom: '1px solid #E0DFDE',
          }}
          onClick={() => {
            if (option.onClick) {
              option.onClick();
            }
            handleClose();
          }}
        >
          <ImageWrapper
            name={option.icon}
            parentFolder="icons"
            type="png"
            styles={{ height: pxToRem(19), width: pxToRem(21) }}
          />
          <Typography variant="h2" fontWeight="regular">
            {option.name}
          </Typography>
        </Box>
      ))}
    </Drawer>
  );
};
