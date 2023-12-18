import { IStyles, pxToRem, pxTovW, theme } from '@geneo2-web/shared-ui';

import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { ReactNode } from 'react';

const styles: IStyles = {
  sectionListWrapper: {
    width: '100%',
    paddingTop: pxToRem(10),
    paddingBottom: pxToRem(10),
    display: 'flex',
    gap: { md: pxTovW(25) },
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    // justifyContent: { md: 'center' },
    alignItems: {
      md: 'center',
    },
  },
  sectionTitleWrapper: {
    // flexBasis: { md: '25%' },
    flexGrow: '1',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(43) },
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    justifyContent: { xs: 'space-between', md: 'flex-end' },
    alignItems: 'center',
    flexShrink: 0,
    paddingLeft: {
      xs: pxToRem(22),
      md: 0,
    },
    paddingRight: {
      xs: pxToRem(22),
      md: 0,
    },
  },
  capsuleTitleWrapper: {
    display: 'flex',
    // maxWidth: { md: pxTovW(200) },
    alignItems: 'center',
    gap: pxTovW(10),
  },
  capsule: {
    backgroundColor: 'primary.main',
    borderRadius: pxToRem(19),
    padding: '5px 22px',
    color: 'common.white',
    marginLeft: pxToRem(10),
  },

  contentsListDisplay: {
    flexGrow: 1,
    // boxSizing: 'border-box',
    flexBasis: { md: pxTovW(1214) },
    overflow: 'hidden',
    height: { xs: '100%', md: 'max-content' },

    display: 'flex',
    gap: {
      xs: pxToRem(16),
      md: pxTovW(18),
    },
    alignItems: 'center',
    overflowX: { xs: 'auto', md: 'hidden' },
    paddingTop: {
      xs: pxToRem(20),
      md: pxTovW(10),
    },
    paddingBottom: {
      xs: pxToRem(10),
      md: pxTovW(20),
    },
    paddingLeft: {
      xs: pxToRem(22),
      md: pxTovW(10),
    },
    paddingRight: {
      xs: pxToRem(22),
      md: pxTovW(10),
    },
    width: {
      xs: `calc(100% - ${pxToRem(44)})`,
      md: `calc(100% - ${pxTovW(60)})`,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  carouselButton: {
    margin: '0px',
    minHeight: { md: pxTovW(73) },
    padding: '0px !important',
    display: { xs: 'none', md: 'block' },
    width: { md: pxTovW(49) },
    height: { md: pxTovW(73) },
    borderRadius: '0.417vw',
    flexShrink: 0,
  },
};
interface IProps {
  children: ReactNode[];
  fullWidth?: boolean;
}
export default function SectionListSckeleton(props: IProps) {
  const { children, fullWidth } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={styles.sectionListWrapper}>
        {!fullWidth && (
          <Box sx={styles.sectionTitleWrapper}>
            <Box sx={styles.capsuleTitleWrapper}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: pxToRem(115), md: pxTovW(134) },
                  height: { xs: pxToRem(25), md: pxTovW(29) },
                  borderRadius: { xs: pxToRem(15) },
                }}
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: pxToRem(43), md: pxTovW(58) },
                  height: { xs: pxToRem(25), md: pxTovW(35) },
                  borderRadius: { xs: pxToRem(15) },
                }}
              />
            </Box>

            <Box>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: pxToRem(37), md: pxTovW(87) },
                  height: { xs: pxToRem(15), md: pxTovW(36) },
                  borderRadius: { xs: pxToRem(5) },
                }}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            ...styles.contentsListDisplay,
            background: fullWidth
              ? {
                  xs: 'linear-gradient(to bottom, white 33%,#cecccc 33% 66%,white 66% 100%)',
                  md: 'linear-gradient(to bottom, white 33%,#cecccc 33% 66%,white 66% 100%)',
                }
              : {
                  xs: 'linear-gradient(to bottom, white 33%,#cecccc 33% 66%,white 66% 100%)',
                  md: 'linear-gradient(to bottom, white 20%,#d1cfcf 20% 80%)',
                },
          }}
        >
          {!fullWidth && <Skeleton sx={styles.carouselButton} />}
          {children?.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}

          {!fullWidth && <Skeleton sx={styles.carouselButton} />}
        </Box>
      </Box>
    </Box>
  );
}

export const ShimmerOngoingLsCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: pxToRem(199), md: pxTovW(253) },
        minWidth: { xs: pxToRem(199), md: 'unset' },
        height: { xs: pxToRem(222), md: pxTovW(266) },
        borderRadius: { xs: pxToRem(15) },
        backgroundColor: '#f5f4f4',
        padding: {
          xs: `${pxToRem(13)} ${pxToRem(8)} ${pxToRem(14)} ${pxToRem(12)}`,
          md: pxTovW(14),
        },
        alignItems: 'center',
        gap: { xs: pxToRem(12), md: pxTovW(12) },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: { xs: pxToRem(91), md: pxTovW(117) },
          borderRadius: { xs: pxToRem(15) },
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '20%',
          height: { xs: pxToRem(12), md: pxTovW(12) },
          borderRadius: { xs: pxToRem(15) },
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '90%',
          height: { xs: pxToRem(12), md: pxTovW(12) },
          borderRadius: { xs: pxToRem(15) },
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: { xs: pxToRem(15), md: pxTovW(15) },
          borderRadius: { xs: pxToRem(15) },
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          height: { xs: pxToRem(15), md: pxTovW(15) },
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: '30%',
            height: { xs: pxToRem(15), md: pxTovW(15) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: '30%',
            height: { xs: pxToRem(12), md: pxTovW(12) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: '30%',
            height: { xs: pxToRem(12), md: pxTovW(12) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          height: { xs: pxToRem(15), md: pxTovW(15) },
        }}
      >
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            alignItems: 'center',
            height: { xs: pxToRem(15), md: pxTovW(15) },
            justifyContent: 'space-between',
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              height: { xs: pxToRem(28), md: pxTovW(28) },
              width: { xs: pxToRem(28), md: pxTovW(28) },
              borderRadius: { xs: pxToRem(15) },
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: '50%',
              height: { xs: pxToRem(12), md: pxTovW(12) },
              borderRadius: { xs: pxToRem(15) },
            }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '30%',
            height: { xs: pxToRem(12), md: pxTovW(12) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />
      </Box>
    </Box>
  );
};
const variantWidth = {
  xs: { small: pxToRem(283), medium: pxToRem(283), large: pxToRem(319) },
  md: { small: pxTovW(244), medium: pxTovW(330), large: pxTovW(457) },
};
const variantHeight = {
  xs: { small: pxToRem(102), medium: pxToRem(102), large: pxToRem(127) },
  md: { small: pxTovW(88), medium: pxTovW(120), large: pxTovW(165) },
};
interface IVariants {
  small: string;
  medium: string;
  large: string;
}
interface IResourceCardProps {
  variant: keyof IVariants;
}
export const ShimmerActiveHwCard = (props: IResourceCardProps) => {
  const { variant } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        width: {
          xs: variantWidth.xs[variant],
          md: variantWidth.md[variant],
        },
        height: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },

        minWidth: { xs: pxToRem(313), md: 'unset' },

        borderRadius: { xs: pxToRem(15) },
        backgroundColor: '#f5f4f4',
        padding: {
          xs: `${pxToRem(13)} ${pxToRem(8)} ${pxToRem(14)} ${pxToRem(12)}`,
          md: pxTovW(14),
        },
        alignItems: 'center',
        gap: { xs: pxToRem(12), md: pxTovW(12) },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: '40%',
          height: '100%',
          borderRadius: { xs: pxToRem(15) },
          //   backgroundColor: 'red',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: '40%',
            height: { xs: pxToRem(12), md: pxTovW(12) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: '90%',
            height: { xs: pxToRem(12), md: pxTovW(12) },
            borderRadius: { xs: pxToRem(15) },
          }}
        />

        <Box
          sx={{
            width: '70%',
            display: 'flex',
            justifyContent: 'space-between',
            height: { xs: pxToRem(15), md: pxTovW(15) },
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: { xs: pxToRem(12), md: pxTovW(12) },
              borderRadius: { xs: pxToRem(15) },
            }}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            height: { xs: pxToRem(15), md: pxTovW(15) },
          }}
        >
          <Box
            sx={{
              width: '30%',
              display: 'flex',
              alignItems: 'center',
              height: { xs: pxToRem(15), md: pxTovW(15) },
              justifyContent: 'space-between',
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                height: { xs: pxToRem(28), md: pxTovW(28) },
                width: { xs: pxToRem(28), md: pxTovW(28) },
                borderRadius: { xs: pxToRem(15) },
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                width: '50%',
                height: { xs: pxToRem(12), md: pxTovW(12) },
                borderRadius: { xs: pxToRem(15) },
              }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '30%',
              height: { xs: pxToRem(12), md: pxTovW(12) },
              borderRadius: { xs: pxToRem(15) },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
