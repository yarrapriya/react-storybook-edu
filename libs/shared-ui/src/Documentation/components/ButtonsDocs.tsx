import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IStyles } from '../../commonUtils/styleUtils';
import { HwProceedButton } from '../../components/composites/HwProceedButton';
import LinkButton from '../../components/composites/LinkButton';
import { PaginationButton } from '../../components/composites/PaginationButton';
import SecondaryButton from '../../components/composites/SecondaryButton';
import { SecondaryGreyButton } from '../../components/composites/SecondaryGreyButton';
import { IconWrapper } from '../../components/elements/IconWrapper/Index';
import PrimaryButton from '../../components/elements/PrimaryButton';
import QuantityButton from '../../components/elements/QuantityButton';
import { SecondaryOutlinedButton } from '../../components/elements/SecondaryOutlinedButton';
const styles: IStyles = {
  container: {
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '3px solid black',
    padding: '10px',
  },
  buttonBox: {
    height: 'max-content',
    width: 'max-content',
    padding: '15px',
    gap: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  infoBox: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    gap: '.5vw',
    mt: '50px',
  },
};
export default function ButtonsDocs() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vw' }}>
      {/* <Box>
        <Typography variant="h2">MUI Vairants Button</Typography>
        <Box>
          <Typography variant="h5">color primary</Typography>
          <Button variant="outlined" color="primary">
            outlined
          </Button>
          <Button variant="contained" color="primary">
            contained
          </Button>
        </Box>
        <Box>
          <Typography variant="h5">color secondary</Typography>
          <Button variant="outlined" color="secondary">
            outlined
          </Button>
          <Button variant="contained" color="secondary">
            contained
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography variant="h2">PrimaryButton</Typography>
        <PrimaryButton>Primary Button</PrimaryButton>
      </Box>

      <Box>
        <Typography variant="h2">QuantityButton</Typography>
        <QuantityButton quantity={0} />
        <QuantityButton quantity={1} />
        <QuantityButton quantity={1} smallVariant={true} />
      </Box>

      <Box>
        <HwProceedButton
          buttonTitle="BACK to HW"
          tabs={[
            { quantity: '7', title: 'Qs' },
            { quantity: '88', title: 'Marks' },
            { quantity: '100', title: 'Marks' },
          ]}
        />
      </Box>

      <PaginationButton currentPage={1} totalPages={4}/>

      <SecondaryButton withArrow>Choose Class & Subject</SecondaryButton>
      <SecondaryButton>Edit</SecondaryButton>
      <Box>
        <LinkButton>Send Reminder</LinkButton>
      </Box>
      <SecondaryGreyButton>
        <IconWrapper
          name="Filter"
          type="png"
          size="small"
          parentFolder="icons"
        />
        <Typography
          variant="smallText"
          fontWeight="bold"
          color="rgba(130, 130, 130, 1)"
        >
          Filter
        </Typography>
      </SecondaryGreyButton>
      <SecondaryGreyButton>
        <IconWrapper name="Sort" type="png" size="small" parentFolder="icons" />
        <Typography
          variant="smallText"
          fontWeight="bold"
          color="rgba(130, 130, 130, 1)"
        >
          Sort By
        </Typography>
      </SecondaryGreyButton>
      <SecondaryOutlinedButton sx={{ marginTop: '20px' }}>
        <Typography variant="h5" fontWeight="medium">
          8A Science
        </Typography>
        <Box>
          <ArrowForwardIosIcon
            sx={{
              height: { xs: pxToRem(12.55), md: pxTovW(15) },
              width: { xs: pxToRem(7.18), md: pxTovW(15) },
              color: '#828282',
            }}
          />
        </Box>
      </SecondaryOutlinedButton> */}
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">PrimaryButton</Typography>
          <PrimaryButton>Primary Button</PrimaryButton>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">
            {'<PrimaryButton></PrimaryButton>'}
          </Typography>
          <Typography variant="h3">Children:React Node</Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">QuantityButton</Typography>
          <QuantityButton quantity={0} />
          <QuantityButton quantity={1} />
          <QuantityButton quantity={1} smallVariant={true} />
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">
            {'<QuantityButton></QuantityButton>'}
          </Typography>
          <Typography variant="h3">smallVariant?:boolean</Typography>
          <Typography variant="h3">quantity?:number</Typography>
          <Typography variant="h3">{'increamentHandler?:()=>void'}</Typography>
          <Typography variant="h3">{'decreamentHandler?:()=>void'}</Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">Secondary Button</Typography>

          <SecondaryButton witharrow>Choose Class & Subject</SecondaryButton>
          <SecondaryButton>Edit</SecondaryButton>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">
            {'<SecondaryButton></SecondaryButton>'}
          </Typography>
          <Typography variant="h3">withArrow?:boolean</Typography>
          <Typography variant="h3">styles?: SxProps;</Typography>
          <Typography variant="h3">{'onClick?:()=>void'}</Typography>
          <Typography variant="h3">{'children?: React.ReactNode;'}</Typography>
          <Typography variant="h3">
            {'variant?: contained| outlined'}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">HwProceedButton</Typography>

          <Box>
            <HwProceedButton
              buttonTitle="BACK to HW"
              tabs={[
                { quantity: '7', title: 'Qs' },
                { quantity: '88', title: 'Marks' },
                { quantity: '100', title: 'Marks' },
              ]}
            />
          </Box>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">{'<HwProceedButton/>'}</Typography>
          <Typography variant="h3">buttonTitle?: string;</Typography>
          <Typography variant="h3">
            {'tabs?:{quantity: string;title: string;}[]'}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2"> PaginationButton</Typography>

          <Box>
            <PaginationButton currentPage={1} totalPages={4} />
          </Box>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">{'<PaginationButton/>'}</Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">LinkButton</Typography>

          <Box>
            <LinkButton>Send Reminder</LinkButton>
          </Box>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">{'LinkButton/>'}</Typography>
          <Typography variant="h3">
            children: string | React.ReactNode;
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">SecondaryGreyButton</Typography>

          <Box>
            <SecondaryGreyButton>
              <IconWrapper
                name="Sort"
                type="png"
                size="small"
                parentFolder="icons"
              />
              <Typography
                variant="smallText"
                fontWeight="bold"
                color="rgba(130, 130, 130, 1)"
              >
                Sort By
              </Typography>
            </SecondaryGreyButton>
          </Box>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">{'LinkButton/>'}</Typography>
          <Typography variant="h3">children: React.ReactNode;</Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.buttonBox}>
          <Typography variant="h2">SecondaryOutlinedButton</Typography>

          <Box>
            <SecondaryOutlinedButton size="small" witharrow>
              <Typography variant="h5" fontWeight="medium">
                8A Science
              </Typography>
            </SecondaryOutlinedButton>
          </Box>
          <Box>
            <SecondaryOutlinedButton size="medium" witharrow>
              <Typography variant="h5" fontWeight="medium">
                8A Science
              </Typography>
            </SecondaryOutlinedButton>
          </Box>
          <Box>
            <SecondaryOutlinedButton size="large" witharrow>
              <Typography variant="h5" fontWeight="medium">
                8A Science
              </Typography>
            </SecondaryOutlinedButton>
          </Box>
        </Box>
        <Box sx={styles.infoBox}>
          <Typography variant="h3">{'<SecondaryOutlinedButton/>'}</Typography>
          <Typography variant="h3">
            {
              'props: size:{small: string;medium: string;large: string;}withArrow?: boolean;'
            }
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
