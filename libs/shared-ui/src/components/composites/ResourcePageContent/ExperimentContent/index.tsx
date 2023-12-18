import { Box } from '@mui/material';
import { ContentElementType, ExperimentContentModel } from '@protos/content_management/content.db_pb';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ElementRenderer, { ElementType } from '../../ElementRenderer';
import { ElementHeadingTag } from '../../ElementRenderer/ElementHeadingTag';
const styles: IStyles = {
  experimentWrapper: {
    gap: {
      xs: pxToRem(15),
      md: pxTovW(20)
    },
    display: 'flex',
    flexDirection: 'column',
  }
};
interface IProps {
  experiment: ExperimentContentModel;
}
export const ExperimentContent = (props: IProps) => {
  const { experiment } = props;
  const { title, aim, resourcesRequired, procedure, caution, observations, conclusion, faq } = experiment;
  const renderExperimentSection = (tag?: string, elements?: ElementType[]) => {
    return <>
      {tag && (
        <ElementHeadingTag text={tag.toUpperCase()} />
      )}
      {(elements && !!elements.length) && (
        <ElementRenderer elements={elements} />
      )}
    </>
  }

  return <Box sx={styles.experimentWrapper}>
    {title && (
      <ElementRenderer elements={[new ContentElementType({
        model: {
          case: 'heading',
          value: {
            heading: title
          }
        }
      })]} />
    )}
    {(!!aim?.elements.length) && (
      renderExperimentSection("aim", aim.elements,)
    )}
    {(!!resourcesRequired?.elements.length) && (
      renderExperimentSection("resources required", resourcesRequired.elements)
    )}
    {(!!procedure?.elements.length) && (
      renderExperimentSection("procedure", procedure.elements)
    )}
    {(!!observations?.elements.length) && (
      renderExperimentSection("observations", observations.elements)
    )}
    {(!!conclusion?.elements.length) && (
      renderExperimentSection("conclusion", conclusion.elements)
    )}
    {(!!caution?.elements.length) && (
      renderExperimentSection("caution", caution.elements)
    )}
    {(!!faq?.elements.length) && (
      renderExperimentSection("faq", faq.elements)
    )}
  </Box>
};
