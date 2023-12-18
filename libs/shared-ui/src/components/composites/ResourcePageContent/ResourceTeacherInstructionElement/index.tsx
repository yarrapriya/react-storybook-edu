import { ResourceTeacherInstruction } from '@protos/content_management/content.db_pb';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ElementRenderer from '../../ElementRenderer';
const styles: IStyles = {

};
interface IProps {
  teacherInstruction: ResourceTeacherInstruction;
}
export const ResourceTeacherInstructionElement = (props: IProps) => {
  const { teacherInstruction } = props;
  const elements = teacherInstruction.instructionContent?.elements;
  if (!elements) {
    return null;
  }
  return <ElementRenderer elements={elements} />
};
