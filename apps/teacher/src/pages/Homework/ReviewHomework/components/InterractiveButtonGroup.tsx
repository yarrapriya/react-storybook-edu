import { IconWrapper, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Button } from '@mui/material';

interface IButtonsGroupProps {
  index: number;
  handleDeletion: () => void;
  handleReplace: () => void;
}
const InterractiveButtonGroup = (props: IButtonsGroupProps) => {
  const { index, handleDeletion, handleReplace } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: pxTovW(14),
        alignItems: 'center',
        justifyContent: 'space-around',
        width: { xs: pxToRem(80), md: pxTovW(80) },
      }}
    >
      <Button
        onClick={handleDeletion}
        sx={{
          cursor: 'pointer',
        }}
      >
        <IconWrapper name="remove" size="md" type="png" parentFolder="icons" />
      </Button>
      <Button
        onClick={handleReplace}
        sx={{
          cursor: 'pointer',
        }}
      >
        <IconWrapper name="refresh" size="md" type="png" parentFolder="icons" />
      </Button>
      <Box
        sx={{
          cursor: 'grab',
        }}
      >
        <IconWrapper
          name="reorder"
          size="small"
          type="png"
          parentFolder="icons"
        />
      </Box>
    </Box>
  );
};

export default InterractiveButtonGroup;
