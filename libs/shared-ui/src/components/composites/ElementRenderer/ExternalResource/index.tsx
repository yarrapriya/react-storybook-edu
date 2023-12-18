import { Box, Typography } from '@mui/material';
import {
  ExternalResourceType,
  FileEnum,
  FileExtensionEnum,
} from '@protos/content_management/content.db_pb';
import { getMediaBasePath } from '../../../../commonUtils/images';
import { pxToRem } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';

const styles: IStyles = {
  externalResourceWrapper: {
    backgroundColor: 'common.white',
    borderRadius: '10px',
    width: {
      md: pxToRem(362),
    },
    padding: {
      xs: pxToRem(10),
      md: `${pxToRem(12)} ${pxToRem(14)}`,
    },
    display: 'flex',
    flexDirection: 'row',
    gap: {
      xs: pxToRem(10),
      md: pxToRem(14),
    },
    boxShadow: {
      md: '0px 3px 15px #0000001F',
      xs: '0px 3px 15px #00000029',
    },
    cursor: 'pointer',
  },
  externalResourceImageWrapper: {
    backgroundColor: '#EFEFEF',
    width: {
      xs: pxToRem(73),
      md: pxToRem(75),
    },
    height: {
      xs: pxToRem(73),
      md: pxToRem(75),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  externalResourceImage: {
    width: {
      xs: pxToRem(42),
      md: pxToRem(43),
    },
  },
  urlImageWrapper: {
    backgroundColor: '#EFEFEF',
    width: {
      xs: pxToRem(110),
      md: pxToRem(75),
    },
    height: {
      xs: pxToRem(110),
      md: pxToRem(75),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  urlImage: {
    width: {
      xs: pxToRem(64),
      md: pxToRem(43),
    },
  },
  externalResourceTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
  },
  externalResourceFileSize: {
    color: '#828282',
    fontSize: {
      xs: pxToRem(14),
      md: pxToRem(14),
    },
  },
  externalResourceTextHeading: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  urlTextHeading: {
    display: '-webkit-box',
    WebkitLineClamp: {
      xs: 4,
      md: 2,
    },
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  urlResourceWrapper: {
    backgroundColor: 'common.white',
    borderRadius: '10px',
    width: {
      md: pxToRem(570),
    },
    padding: {
      xs: pxToRem(10),
      md: `${pxToRem(12)} ${pxToRem(14)}`,
    },
    display: 'flex',
    flexDirection: 'row',
    gap: {
      xs: pxToRem(10),
      md: pxToRem(14),
    },
    boxShadow: {
      md: '0px 3px 15px #0000001F',
      xs: '0px 3px 15px #00000029',
    },
    cursor: 'pointer',
  },
  fileURLText: {
    color: 'primary.main',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textDecoration: 'underline',
    fontSize: {
      xs: pxToRem(14),
      md: pxToRem(14),
    },
  },
};

const getFileExtension = (ext: FileExtensionEnum) => {
  switch (ext) {
    case FileExtensionEnum.FILE_EXTENSION_TXT:
      return 'txt';
    case FileExtensionEnum.FILE_EXTENSION_JPG:
      return 'jpg';
    case FileExtensionEnum.FILE_EXTENSION_GIF:
      return 'gif';
    case FileExtensionEnum.FILE_EXTENSION_PNG:
      return 'png';
    case FileExtensionEnum.FILE_EXTENSION_MP3:
      return 'mp3';
    case FileExtensionEnum.FILE_EXTENSION_MP4:
      return 'mp4';
    case FileExtensionEnum.FILE_EXTENSION_DOCX:
      return 'docx';
    case FileExtensionEnum.FILE_EXTENSION_XLSX:
      return 'xlsx';
    case FileExtensionEnum.FILE_EXTENSION_PPTX:
      return 'pptx';
    case FileExtensionEnum.FILE_EXTENSION_ZIP:
      return 'zip';
    case FileExtensionEnum.FILE_EXTENSION_HTTPS:
      return 'https';
    default:
      return '';
  }
};

interface IProps {
  element: ExternalResourceType;
}

const getIconImage = (fileType: FileEnum) => {
  switch (fileType) {
    case FileEnum.FILE_TYPE_TEXT:
    case FileEnum.FILE_TYPE_IMAGE:
    case FileEnum.FILE_TYPE_AUDIO:
    case FileEnum.FILE_TYPE_VIDEO:
    case FileEnum.FILE_TYPE_DOCUMENT:
    case FileEnum.FILE_TYPE_SPREADSHEET:
    case FileEnum.FILE_TYPE_PRESENTATION:
      return '/assets/shared-ui/icons/fileIcons/ppt.png';
    case FileEnum.FILE_TYPE_ARCHIVE:
    case FileEnum.FILE_TYPE_PDF:
      return '/assets/shared-ui/icons/fileIcons/pdf.png';
    case FileEnum.FILE_TYPE_URL:
      return '/assets/shared-ui/icons/fileIcons/url.png';
  }
};

export const ExternalResource = (props: IProps) => {
  const { element } = props;
  const { fileUrl } = element;
  const fileUrlModified = getMediaBasePath(fileUrl, 'processedMediaBucket');
  switch (element.fileType) {
    case FileEnum.FILE_TYPE_TEXT:
    case FileEnum.FILE_TYPE_IMAGE:
    case FileEnum.FILE_TYPE_AUDIO:
    case FileEnum.FILE_TYPE_VIDEO:
    case FileEnum.FILE_TYPE_DOCUMENT:
    case FileEnum.FILE_TYPE_SPREADSHEET:
    case FileEnum.FILE_TYPE_PRESENTATION:
    /* falls through */
    case FileEnum.FILE_TYPE_ARCHIVE:
    case FileEnum.FILE_TYPE_PDF:
      return (
        <Box
          sx={styles.externalResourceWrapper}
          onClick={() => {
            window.open(fileUrlModified, '_blank');
          }}
        >
          <Box sx={styles.externalResourceImageWrapper}>
            <Box
              component={'img'}
              src={getIconImage(element.fileType)}
              sx={styles.externalResourceImage}
            />
          </Box>
          <Box sx={styles.externalResourceTextWrapper}>
            <Typography
              sx={styles.externalResourceTextHeading}
              variant={'elementBodyText'}
            >
              {`${element.fileName}${
                element.fileExtensionType
                  ? '.' + getFileExtension(element.fileExtensionType)
                  : ''
              }`}
            </Typography>
            {element.fileSizeInMb && (
              <Typography
                sx={styles.externalResourceFileSize}
                variant={'elementBodyText'}
              >
                {element.fileSizeInMb + 'MB'}
              </Typography>
            )}
          </Box>
        </Box>
      );
    case FileEnum.FILE_TYPE_URL:
      return (
        <Box
          sx={styles.urlResourceWrapper}
          onClick={() => {
            window.open(fileUrlModified, '_blank');
          }}
        >
          <Box sx={styles.urlImageWrapper}>
            <Box
              component={'img'}
              src={getIconImage(element.fileType)}
              sx={styles.urlImage}
            />
          </Box>
          <Box sx={styles.externalResourceTextWrapper}>
            <Typography sx={styles.urlTextHeading} variant={'elementBodyText'}>
              {`${element.fileName}${
                element.fileExtensionType
                  ? '.' + getFileExtension(element.fileExtensionType)
                  : ''
              }`}
            </Typography>
            {fileUrlModified && (
              <Typography sx={styles.fileURLText} variant={'elementBodyText'}>
                {fileUrlModified}
              </Typography>
            )}
          </Box>
        </Box>
      );
    default:
      return null;
  }
};
