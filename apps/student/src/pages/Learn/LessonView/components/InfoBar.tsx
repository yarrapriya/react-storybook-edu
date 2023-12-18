import { IStyles, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { IconWrapper } from 'libs/shared-ui/src/components/elements/IconWrapper/Index';
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
    padding: { md: `${pxTovW(20)} ${pxTovW(30)}` },
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

interface TabProps {
  iconName: string;
  heading: string;
  subHeading: string;
}

interface InfoBarProps {
  tabs: TabProps[];
}

export default function InfoBar(props: InfoBarProps) {
  const { tabs } = props;
  return (
    <Box sx={styles.root}>
      {tabs.map((tab, i) => (
        <Box key={i} sx={styles.item}>
          <Box>
            <IconWrapper
              name={tab.iconName}
              size="md"
              type="png"
              parentFolder="icons"
            />
            <Typography variant="h3" fontWeight="bold">
              {tab.heading}
            </Typography>
          </Box>

          <Box>
            <Typography variant="smallText">{tab.subHeading}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
