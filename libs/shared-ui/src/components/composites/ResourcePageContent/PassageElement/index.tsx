import { PassageContentModel } from '@protos/content_management/content.db_pb';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ElementRenderer from '../../ElementRenderer';
const styles: IStyles = {

};
interface IProps {
  passage: PassageContentModel;
}
export const PassageElement = (props: IProps) => {
  const { passage } = props;
  const elements = passage.elements;
  if (!elements) {
    return null;
  }
  return <ElementRenderer elements={elements} />
};
