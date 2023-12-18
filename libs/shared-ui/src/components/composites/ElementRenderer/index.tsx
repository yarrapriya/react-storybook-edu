import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { SxProps } from '@mui/system';
import {
  AskInstructionModel,
  AudioType,
  BulletedListType,
  ComprehensionPassage,
  ContentElementType,
  ExcerptType,
  ExternalResourceType,
  FlashCardElementType,
  GeneralAllowedElements,
  HeadingType,
  ImageType,
  InstructionElementType,
  NumberedListType,
  QuestionElementType,
  SolutionElementType,
  SubHeadingType,
  TableType,
  TextBoxType,
  TextCenterType,
  TextElementType,
  TextLeftType,
  TextRightType,
  TextType,
  VideoType,
} from '@protos/content_management/content.db_pb';
import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getMediaBasePath } from '../../../commonUtils/images';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
import VideoPlayer from '../../elements/VideoPlayer';
import TypographyHtml from '../Question/TypographyHtml';
import { BlankCounter } from '../Question/question-utils';
import { ElementHeadingTag } from './ElementHeadingTag';
import { ExternalResource } from './ExternalResource';
import { TableElement } from './Table';

export type ElementType =
  | ContentElementType
  | QuestionElementType
  | SolutionElementType
  | GeneralAllowedElements
  | TextElementType
  | FlashCardElementType
  | InstructionElementType;

interface IProps {
  elements: ElementType[];
  isFibText?: boolean;
  handleAnswerChange?: (value: string, index?: number) => void;
  userAttemptedAnswer?: string[];
  disableInput?: boolean;
}

const styles: IStyles = {
  textElements: {
    width: '100%',
  },
  textElementsWrapper: {
    height: '100%',
    gap: {
      xs: pxToRem(15),
      md: pxTovW(20),
    },
    display: 'flex',
    flexDirection: 'column',
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  subHeading: {},
  textBoxWrapper: {
    gap: {
      xs: pxToRem(15),
      md: pxTovW(20),
    },
    display: 'flex',
    flexDirection: 'column',
    border: '1.5px solid #007CDC',
    padding: {
      md: `${pxTovW(13)} ${pxTovW(32)}`,
      xs: `${pxToRem(10)} ${pxToRem(11)}`,
    },
    backgroundColor: '#FAFDFF',
  },
  heading: {},
  textInput: {
    outline: 0,
    borderWidth: '0 0 2px',
    borderStyle: 'dashed',
    borderColor: 'error.main',
    '&:hover': {
      borderStyle: 'solid',
      borderColor: 'error.main',
    },
    '&:focus': {
      borderStyle: 'solid',
      borderColor: 'error.main',
    },
    textAlign: 'center',
    fontSize: {
      xs: pxToRem(16),
      md: pxToRem(21),
    },
  },
  image: {
    maxHeight: {
      xs: '160px',
      md: '600px',
    },
    width: '100%',
    overflow: 'hidden',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  bulletList: {
    margin: 0,
    paddingLeft: '25px',
  },
  tagWrapper: {
    paddingLeft: {
      xs: pxToRem(8),
      md: pxToRem(8),
    },
    borderLeft: {
      md: '8px solid #F8C807',
      xs: '4px solid #F8C807',
    },
  },
  accordion: {
    backgroundColor: '#F2F2F2',
    '&:before': {
      backgroundColor: '#F2F2F2',
    },
    boxShadow: 'none',
    borderRadius: '5px',
    width: {
      md: '60%',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '48px',
      margin: 0,
      borderBottom: '1px solid #E1E1E1',
    },
    '& .MuiAccordionSummary-root, .MuiAccordionDetails-root': {
      paddingX: {
        xs: pxToRem(13),
        md: pxToRem(18),
      },
    },
  },
  audioBox: {
    backgroundColor: 'common.white',
    borderRadius: '10px',
    maxWidth: {
      md: pxToRem(648),
    },
    padding: {
      xs: pxToRem(10),
      md: pxToRem(14),
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
  },
  audioImage: {
    width: {
      xs: pxToRem(56),
      md: pxToRem(100),
    },
  },
  audioWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& .rhap_container': {
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'unset',
    },
    '& .rhap_progress-container': {
      marginRight: 0,
    },
    '& .rhap_controls-section': {
      margin: 0,
      justifyContent: 'flex-end',
      '&>div': {
        color: '#838383',
      },
    },
    '& .rhap_download-progress': {
      backgroundColor: '#DDD9FF',
    },
    '& .rhap_progress-filled': {
      backgroundColor: '#007CDC',
    },
    '& .rhap_progress-indicator': {
      backgroundColor: '#007CDC',
    },
    '& .rhap_main-controls-button': {
      color: '#007CDC',
    },
    flexGrow: 1,
  },
};

const ElementRenderer = (props: IProps) => {
  const {
    elements,
    isFibText,
    handleAnswerChange,
    userAttemptedAnswer,
    disableInput,
  } = props;
  const blankCounter = new BlankCounter();

  const textElements = (
    texts: string[],
    sx: SxProps | undefined,
    variant: any,
    component?: any
  ): JSX.Element[] => {
    return texts.map((text, index) => {
      return (
        <Box component={component} key={index} sx={sx}>
          <TypographyHtml variant={variant}>{text}</TypographyHtml>
        </Box>
      );
    });
  };
  const splitText = (t: string): string[] =>
    t.split('<br>').filter((text) => text);

  const renderElement = (element: ElementType) => {
    const elementType =
      element instanceof InstructionElementType
        ? element.instruction.case
        : element.model.case;
    const elementValue =
      element instanceof InstructionElementType
        ? element.instruction.value
        : element.model.value;
    const elem: { text?: string; style?: SxProps; variant?: any } = {};
    const BlankTextRegExp = /_{3,}/g;
    const tagName =
      elementType === 'teacherNote'
        ? 'NOTE'
        : (elementType === 'ask' || elementType == 'askQuestion')
          ? 'QUESTION'
          : elementType === 'explain'
            ? 'EXPLANATION'
            : elementType?.toUpperCase();
    switch (elementType) {
      case 'text': {
        if (elementValue instanceof TextType) {
          elem.text = elementValue.text;
          elem.style = styles.leftText;
        }
      }
      /* falls through */
      case 'textCenter': {
        if (elementValue instanceof TextCenterType) {
          elem.text = elementValue.textCenter;
          elem.style = styles.centerText;
        }
      }
      /* falls through */
      case 'textLeft': {
        if (elementValue instanceof TextLeftType) {
          elem.text = elementValue.textLeft;
          elem.style = styles.leftText;
        }
      }
      /* falls through */
      case 'textRight': {
        if (elementValue instanceof TextRightType) {
          elem.text = elementValue.textRight;
          elem.style = styles.rightText;
        }
      }
      /* falls through */
      case 'heading': {
        if (elementValue instanceof HeadingType) {
          elem.text = elementValue.heading;
          elem.style = styles.heading;
          elem.variant = 'elementH1';
        }
      }
      /* falls through */
      case 'subHeading': {
        if (elementValue instanceof SubHeadingType) {
          elem.text = elementValue.subHeading;
          elem.style = styles.subHeading;
          elem.variant = 'elementH2';
        }
        const { text, style, variant } = elem;
        const qParts = text?.split(BlankTextRegExp) || [];
        if (isFibText) {
          return (
            <Box>
              {qParts.map((part, index) => {
                if (index === 0) {
                  return (
                    part &&
                    textElements(
                      splitText(part),
                      style,
                      variant || 'elementText',
                      'span'
                    )
                  );
                }
                const ct = blankCounter ? blankCounter.next() : 0;
                return (
                  <>
                    <Box
                      component={'input'}
                      sx={styles.textInput}
                      placeholder="TYPE HERE"
                      type={'text'}
                      value={
                        userAttemptedAnswer
                          ? userAttemptedAnswer[ct]
                          : undefined
                      }
                      disabled={disableInput}
                      onChange={(ev) => {
                        if (handleAnswerChange) {
                          handleAnswerChange(ev.target.value, ct);
                        }
                      }}
                    />
                    {part &&
                      textElements(
                        splitText(part),
                        style,
                        variant || 'elementText',
                        'span'
                      )}
                  </>
                );
              })}
            </Box>
          );
        }
        return text ? (
          <Box sx={styles.textElementsWrapper}>
            {textElements(splitText(text), style, variant || 'elementText')}
          </Box>
        ) : null;
      }

      case 'textBox':
        if (elementValue instanceof TextBoxType) {
          return (
            <Box sx={styles.textBoxWrapper}>
              {textElements(splitText(elementValue.boxText), {}, 'elementText')}
            </Box>
          );
        }
        return null;

      case 'teacherImage':
      /* falls through */
      case 'image':
        if (elementValue instanceof ImageType) {
          return (
            <>
              <ImageWrapper
                name={elementValue.imageName}
                path={getMediaBasePath(
                  elementValue.imageUrl,
                  'processedMediaBucket'
                )}
                type={'png'}
                styles={styles.image}
              />
              {/* {elementValue.imageName && textElements(splitText(elementValue.imageName), {}, 'h1')} */}
              {elementValue.imageDescription &&
                textElements(
                  splitText(elementValue.imageDescription),
                  {},
                  'elementText'
                )}
            </>
          );
        }
        return null;
      case 'audio':
        if (elementValue instanceof AudioType) {
          return (
            <>
              <Box sx={styles.audioBox}>
                <ImageWrapper
                  name={'audio'}
                  type={'png'}
                  parentFolder="icons"
                  styles={styles.audioImage}
                />
                <Box sx={styles.audioWrapper}>
                  <AudioPlayer
                    autoPlay={false}
                    src={getMediaBasePath(
                      elementValue.audioUrl,
                      'processedMediaBucket'
                    )}
                    // onPlay={e => console.log("onPlay")}
                    customControlsSection={[
                      RHAP_UI.CURRENT_TIME,
                      <div>/</div>,
                      RHAP_UI.DURATION,
                    ]}
                    customProgressBarSection={[
                      RHAP_UI.MAIN_CONTROLS,
                      RHAP_UI.PROGRESS_BAR,
                    ]}
                    showJumpControls={false}
                  // other props here
                  />
                </Box>
              </Box>
              {/* <Box component="audio" controls>
            <source src={elementValue.audioUrl} />
          </Box> */}
              {elementValue.audioName &&
                textElements(
                  splitText(elementValue.audioName),
                  {},
                  'elementH1'
                )}
              {elementValue.audioDescription &&
                textElements(
                  splitText(elementValue.audioDescription),
                  {},
                  'elementText'
                )}
            </>
          );
        }
        return null;
      case 'teacherVideo':
      /* falls through */
      case 'video':
        if (elementValue instanceof VideoType) {
          const {
            videoName,
            videoUrl,
            videoDescription,
            thumbnailImageUrl,
            credits,
            subTitles,
            externalSubtitlesSrtUrl,
          } = elementValue;
          const options: any = {};
          if (thumbnailImageUrl) {
            options.poster = getMediaBasePath(
              thumbnailImageUrl,
              'processedMediaBucket'
            );
          }
          return (
            <>
              <VideoPlayer options={options} videoUrl={videoUrl} />
              {/* {videoName && textElements(splitText(videoName), {}, 'h1')} */}
              {videoDescription &&
                textElements(splitText(videoDescription), {}, 'elementText')}
            </>
          );
        }
        return null;
      case 'numberList':
        if (elementValue instanceof NumberedListType) {
          return (
            <Box component="ol" sx={styles.bulletList}>
              {elementValue.listItems.map((text, index) => {
                return (
                  <li key={index}>
                    {textElements(splitText(text), {}, 'elementText', 'span')}
                  </li>
                );
              })}
            </Box>
          );
        }
        return null;
      case 'bulletList':
        if (elementValue instanceof BulletedListType) {
          return (
            <Box component="ul" sx={styles.bulletList}>
              {elementValue.listItems.map((text, index) => {
                return (
                  <li key={index}>
                    {textElements(splitText(text), {}, 'elementText', 'span')}
                  </li>
                );
              })}
            </Box>
          );
        }
        return null;
      case 'askQuestion': if (typeof elementValue == 'string') {
        return <>
          {tagName && <ElementHeadingTag text={tagName} />}
          {textElements(
            splitText(elementValue),
            {},
            'bodyText',
            'span'
          )}
        </>
      }
        return null;
      case 'askAnswer': if (typeof elementValue == 'string') {
        return (
          <Accordion sx={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <TypographyHtml variant={'h3'}>Answer</TypographyHtml>
            </AccordionSummary>
            <AccordionDetails>
              {textElements(
                splitText(elementValue),
                {},
                'bodyText',
                'div'
              )}
            </AccordionDetails>
          </Accordion>
        );
      }
        return null;
      case 'ask':
        if (elementValue instanceof AskInstructionModel) {
          return (
            <>
              {tagName && <ElementHeadingTag text={tagName} />}
              {textElements(
                splitText(elementValue.question),
                {},
                'elementBodyText',
                'span'
              )}
              <Accordion sx={styles.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <TypographyHtml variant={'elementH3'}>Answer</TypographyHtml>
                </AccordionSummary>
                <AccordionDetails>
                  {textElements(
                    splitText(elementValue.answer),
                    {},
                    'elementBodyText',
                    'div'
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          );
        }
        return null;
      case 'do':
      case 'teacherNote':
      case 'note':
      case 'explain':
      case 'say':
      case 'discuss':
        if (typeof elementValue == 'string') {
          return (
            <>
              {tagName && <ElementHeadingTag text={tagName} />}
              {textElements(
                splitText(elementValue),
                {},
                'elementBodyText',
                'span'
              )}
            </>
          );
        }
        return null;
      case 'comprehensionPassage':
        if (elementValue instanceof ComprehensionPassage) {
          return (
            <Box>
              {textElements(
                splitText(elementValue.comprehensionPassageText),
                {},
                'elementBodyText',
                'span'
              )}
            </Box>
          );
        }
        return null;
      case 'table':
        if (elementValue instanceof TableType && elementValue.table) {
          return <TableElement table={elementValue.table} />;
        }
        return null;
      case 'excerpt':
        if (elementValue instanceof ExcerptType) {
          return (
            <Box>
              {textElements(
                splitText(elementValue.excerpt),
                {},
                'elementBodyText',
                'span'
              )}
            </Box>
          );
        }
        return null;
      case 'externalResource':
        if (elementValue instanceof ExternalResourceType) {
          return (
            <Box>
              <ExternalResource element={elementValue} />
            </Box>
          );
        }
        return null;
      default:
        return <Box sx={{ color: 'red' }}>Invalid Element</Box>;
    }
  };

  return (
    <Box
      sx={{
        gap: {
          xs: pxToRem(15),
          md: pxTovW(20),
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {elements.map((element, i) => {
        return (
          <React.Fragment key={i}>{renderElement(element)}</React.Fragment>
        );
      })}
    </Box>
  );
};

export default ElementRenderer;
