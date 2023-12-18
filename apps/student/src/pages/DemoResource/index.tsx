import { Timestamp } from '@bufbuild/protobuf';
import {
  ContentIdAttempt,
  IStyles,
  IconWrapper,
  PaginationButton,
  ResourcePageContent,
  deepClone,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Button, Typography } from '@mui/material';
import {
  Content,
  Question,
  ResourceContent,
  ResourceTeacherInstruction,
} from '@protos/content_management/content.db_pb';
import { UpdateStudentResourceSessionRequest } from '@protos/learning_management/lms.common.apis_pb';
import {
  ContentAttempt,
  SessionStatusEnum,
  TeacherContentResponse,
} from '@protos/learning_management/lms.db_pb';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles: IStyles = {
  paginationButtonBox: {
    position: 'fixed',
    bottom: { md: pxTovW(30), xs: pxToRem(10) },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    alignItems: 'center',
    mt: { xs: pxToRem(10), md: pxTovW(10) },
  },
  headingImage: {
    width: { xs: pxToRem(60), md: pxTovW(105) },
    height: { xs: pxToRem(60), md: pxTovW(105) },
  },
  resourcePage: {
    paddingBottom: {
      xs: pxToRem(75),
      md: pxTovW(110),
    },
  },
};

interface IProps {
  headerButtonText?: string;
  buttonClickHandler?: () => void;
}
export default function DemoResource(props: IProps) {
  const navigate = useNavigate();
  const [resourceId, setResourceId] = useState<string | undefined>(undefined);
  const [activeResourceContent, setActiveResourceContent] = useState<
    ResourceContent | undefined
  >(undefined);
  const pageContents = (
    new ResourceContent(activeResourceContent)?.resourceContentData
      ?.pageContent || []
  ).sort((a, b) => a.pageNumber - b.pageNumber);
  const [pageNumber, setPageNumber] = useState(0);
  const [contentIdAttempt, updateContentIdAttempt] = useState<ContentIdAttempt>(
    {}
  );
  const [url, setUrl] = useState('');

  const pageContent = pageContents[pageNumber];
  const [startTime, setStartTime] = useState(Timestamp.fromDate(new Date()));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    setStartTime(Timestamp.fromDate(new Date()));
  }, [pageNumber]);

  const fetchResourceData = async (gcpJsonURL: string) => {
    try {
      setLoading('loading');
      setErrorMsg('');
      const modifiedUrl = getMediaBasePath(gcpJsonURL, 'resourceContentBucket');
      const gcpResponse = await (await fetch(modifiedUrl)).json();
      const resContent = new ResourceContent().fromJson(gcpResponse, {
        ignoreUnknownFields: true,
      });
      setActiveResourceContent(resContent);
      setResourceId(resContent.resourceId);
      setLoading('completed');
    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading('error');
      setActiveResourceContent(undefined);
      console.error(err);
    }
  };

  const handleAnswerSubmit = (contentId: string, answer: string[]) => {
    const contentIdAttemptCopy = deepClone(contentIdAttempt);
    if (!contentIdAttemptCopy[contentId]) {
      contentIdAttemptCopy[contentId] = new TeacherContentResponse({
        contentId: contentId,
        responses: [],
      });
    }
    contentIdAttemptCopy[contentId].responses.push(
      new ContentAttempt({
        startTime: startTime,
        endTime: Timestamp.fromDate(new Date()),
        answer,
      })
    );
    updateContentIdAttempt(contentIdAttemptCopy);
  };

  const makeResponseObject = (
    sessionStatus: SessionStatusEnum
  ): UpdateStudentResourceSessionRequest => {
    const contentIdAttemptCopy = deepClone(contentIdAttempt);
    pageContent.contents.forEach((con) => {
      const contentValue = con.model.value;
      const contentId =
        contentValue instanceof Content
          ? contentValue.contentId
          : contentValue instanceof Question
          ? contentValue.questionId
          : contentValue instanceof ResourceTeacherInstruction
          ? contentValue.resourceId
          : undefined;
      if (contentId) {
        if (!contentIdAttemptCopy[contentId]) {
          contentIdAttemptCopy[contentId] = new TeacherContentResponse({
            contentId: contentId,
          });
        }
        if (
          !(contentValue instanceof Question) ||
          contentIdAttemptCopy[contentId].responses.length == 0
        ) {
          contentIdAttemptCopy[contentId].responses.push(
            new ContentAttempt({
              startTime: startTime,
              endTime: Timestamp.fromDate(new Date()),
              answer: undefined,
            })
          );
        }
      }
    });
    updateContentIdAttempt(contentIdAttemptCopy);
    return new UpdateStudentResourceSessionRequest({
      studentResourceSessionId: undefined,
      studentId: undefined,
      resourceId,
      sessionStatus: sessionStatus,
      endTime: Timestamp.fromDate(new Date()),
      response: Object.values(contentIdAttemptCopy),
    });
  };

  const onNextClick = async () => {
    if (pageContents[pageNumber + 1]) {
      // console.log("response to submit: ", makeResponseObject(SessionStatusEnum.SESSION_STATUS_ONGOING))
      setPageNumber(pageNumber + 1);
    } else {
      // console.log("response to submit: ", makeResponseObject(SessionStatusEnum.SESSION_STATUS_COMPLETED))
    }
  };

  const onPreviousClick = () => {
    if (pageNumber > 0 && pageContents[pageNumber - 1]) {
      setPageNumber(pageNumber - 1);
    }
  };

  if (loading === 'loading') {
    return <Box>Loading...</Box>;
  }

  if (!resourceId || !activeResourceContent) {
    return (
      <Box sx={{ margin: '20px' }}>
        URL:
        <Box
          component={'input'}
          type="text"
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
          sx={{
            width: '100%',
          }}
        />
        <Box sx={{ color: 'red', mY: '10px' }}>{errorMsg}</Box>
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            fetchResourceData(url);
          }}
        >
          Submit
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.resourcePage}>
      <ResourcePageContent
        pageContents={pageContents}
        pageNumber={pageNumber}
        contentIdAttempt={contentIdAttempt}
        handleAnswerSubmit={handleAnswerSubmit}
      />
      <Box sx={styles.paginationButtonBox}>
        <PaginationButton
          currentPage={pageNumber + 1}
          totalPages={pageContents.length}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
        />
      </Box>
    </Box>
  );
}

const cdcIconDetails = [
  {
    iconName: 'clock',
    text: '_15 Min',
  },
  {
    iconName: 'questions',
    text: '_video',
  },
];

interface IBox {
  iconName: string;
  text?: string;
  index: number;
}

const IconTextBox = ({ iconName, text, index }: IBox) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(4), md: pxTovW(4) } }}>
      <IconWrapper name={iconName} size="md" parentFolder="icons" type="png" />
      <Typography
        variant="bodyText"
        fontWeight={'bold'}
        color={index % 2 === 0 ? 'primary' : 'secondary'}
      >
        {text}
      </Typography>
    </Box>
  );
};
