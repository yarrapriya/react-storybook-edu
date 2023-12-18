import { HelpSupport } from '@geneo2-web/shared-ui';
import { useNavigate } from 'react-router-dom';
import { FAQ } from '../../../routeHandling/RoutesNomenclature';

interface IProps {
}

export const HelpAndSupport = (props: IProps) => {
  const navigate = useNavigate();
  return <HelpSupport onFaqClick={() => navigate(FAQ)} />
}
