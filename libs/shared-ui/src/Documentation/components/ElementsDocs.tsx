//* MUI imports
import { Box } from '@mui/material';
import { FileEnum, FileExtensionEnum, GeneralAllowedElements } from '@protos/content_management/content.db_pb';
import { pxToRem, pxTovW } from '../../commonUtils/resizeUtils';
import ElementRenderer from '../../components/composites/ElementRenderer';

const elements: GeneralAllowedElements[] = [
  new GeneralAllowedElements({
    model: {
      case: 'text',
      value: {
        text: `text:The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.<br>The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.`
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'textCenter',
      value: {
        textCenter: "textCenter:The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path."
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'textRight',
      value: {
        textRight: "textRight:The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path."
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'textBox',
      value: {
        boxText: "textBox:The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path."
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'video',
      value: {
        videoUrl: 'https://www.youtube.com/watch?v=zShYft-mpN0&ab_channel=SchoolnetIndiaLimited',
        thumbnailImageUrl: 'https://i3.ytimg.com/vi/zShYft-mpN0/maxresdefault.jpg',
        videoDescription: 'This is Video Description The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.',
        videoName: "Video - Youtube"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'video',
      value: {
        videoUrl: 'https://storage.googleapis.com/geneo-staging-content-processed-media/video/body-movements-joints-08f02f975d/src/body-movements-joints.m3u8',
        videoDescription: 'This is Video Description The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.',
        videoName: "Video - HLS VIDEO"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'audio',
      value: {
        audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg',
        audioDescription: 'This is Audio Description The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.',
        audioName: "Audio Title"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'image',
      value: {
        imageUrl: "https://wallpaperaccess.com/full/170249.jpg"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'image',
      value: {
        imageUrl: "https://wallpaperaccess.com/full/530919.jpg"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'heading',
      value: {
        heading: "heading:Fluid Friction"
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'subHeading',
      value: {
        subHeading: "subHeading: The amazing video ahead showcases Mercedes-Benz in a wind tunnel."
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'bulletList',
      value: {
        listItems: [
          'Three 100 ml beakers ',
          'Water ',
          'Vegetable oil ',
          'Honey ',
          'Three identical metal ball bearings ',
          'Three identical small metal sheets (of approximate area 4 cm^2).',
        ]
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'externalResource',
      value: {
        fileExtensionType: FileExtensionEnum.FILE_EXTENSION_PPTX,
        fileUrl: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx',
        fileSizeInMb: 2,
        fileName: 'Sample PPT',
        fileType: FileEnum.FILE_TYPE_PRESENTATION
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'externalResource',
      value: {
        fileExtensionType: FileExtensionEnum.FILE_EXTENSION_UNKNOWN,
        fileUrl: 'https://www.geogebra.org/m/m9cvbqgp',
        fileName: 'Parallel Lines in the Coordinate Plane: Quick Exploration – GeoGebra',
        fileType: FileEnum.FILE_TYPE_URL
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'externalResource',
      value: {
        fileExtensionType: FileExtensionEnum.FILE_EXTENSION_UNKNOWN,
        fileUrl: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx',
        fileSizeInMb: 10,
        fileName: 'Sample PDF',
        fileType: FileEnum.FILE_TYPE_PDF
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'table',
      value: {
        table: {
          hasHeader: true,
          hasFooter: true,
          content: [
            { row: 0, column: 0, textType: { text: "Situation" } },
            { row: 0, column: 1, textType: { text: "Observation" } },
            { row: 1, column: 0, textType: { text: "Ball bearing in water" } },
            { row: 1, column: 1, textType: { text: "Ball bearing in water" } },
            { row: 2, column: 0, textType: { text: "Ball bearing in vegetable oil" } },
            { row: 2, column: 1, textType: { text: "Ball bearing in vegetable oil" } },
            { row: 3, column: 0, textType: { text: "Ball bearing in honey" } },
            { row: 3, column: 1, textType: { text: "Ball bearing in honey" } },
            { row: 4, column: 0, textType: { text: "Metal sheet in water" } },
            { row: 4, column: 1, textType: { text: "Metal sheet in water" } },
          ],
          mergedCells: [],
          title: "Table"
        }
      }
    }
  }),
  // URL Missing
  new GeneralAllowedElements({
    model: {
      case: 'ask',
      value: {
        question: 'Do you think the air hitting the car will affect its speed?',
        answer: 'Yes, the speed of the car will be slightly reduced because of the air hitting it.'
      }
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'explain',
      value: 'In the video, what you see is an amazing car that is being tested for its performance under high speeds.<br>The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.<br>This makes the car go really fast. Let us learn more about it.'
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'say',
      value: "In the video, what you see is an amazing car that is being tested for its performance under high speeds."
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'do',
      value: 'In the video, what you see is an amazing car that is being tested for its performance under high speeds.<br>The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.<br>This makes the car go really fast. Let us learn more about it.'
    }
  }),
  new GeneralAllowedElements({
    model: {
      case: 'discuss',
      value: 'In the video, what you see is an amazing car that is being tested for its performance under high speeds.<br>The white strokes of smoke shows the path of the wind. Observe how the car is designed in such a way that it deflects almost all the wind in its path.<br>This makes the car go really fast. Let us learn more about it.'
    }
  }),
]


export const ElementsDocs = () => {
  const styles = {
    root: {

    },
  };

  return (
    <Box sx={{
      paddingX: {
        xs: pxToRem(15),
        md: pxTovW(427)
      }
    }}>
      <ElementRenderer elements={elements} />
    </Box>
  );
};
