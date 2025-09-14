import { ReactComponent as PrivateIcon } from '@assets/icons/private.svg';
import { ReactComponent as PublicIcon } from '@assets/icons/public.svg';
import type { SpaceAccessType } from '../../types/space.type';

interface AccessTypeIconProps {
  /** 설정하는 Type의 종류 */
  accessType: SpaceAccessType;
  /** Icon의 색깔 */
  color: string;
}

const AccessTypeIcon = ({ accessType, color }: AccessTypeIconProps) => {
  const AccessTypeIcon = accessType === 'PUBLIC' ? PublicIcon : PrivateIcon;

  return <AccessTypeIcon fill={color} />;
};

export default AccessTypeIcon;
