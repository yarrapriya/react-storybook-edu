import { IStyles, IconWrapper, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
const styles: IStyles = {
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxSizing: 'border-box',
    boxShadow: '0px 3px 35px #0000000F',
    border: '1px dashed lightgrey',
    borderRadius: pxTovW(15),
    padding: {
      xs: `${pxToRem(16)} ${pxToRem(22)}`,
      md: `${pxTovW(20)} ${pxTovW(30)}`,
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxTovW(5),
    '&>div': {
      display: 'flex',
      gap: pxTovW(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
interface IProps {
  contentList: IContentList[];
}
interface IContentList {
  iconName: string;
  quantity: string;
  label: string;
}
export default function InfoBar(props: IProps) {
  const { contentList } = props;
  return (
    <Box sx={styles.root}>
      {contentList.map((e, index) => (
        <Box key={index} sx={styles.item}>
          <Box>
            <IconWrapper
              name={e.iconName}
              size="md"
              type="png"
              parentFolder="icons"
            />
            <Typography variant="h3">{e.quantity}</Typography>
          </Box>
          <Box>
            <Typography variant="smallText">{e.label}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
