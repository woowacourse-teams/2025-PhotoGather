import { PrivateIcon, PublicIcon } from '../../@assets/icons';
import type { SpaceAccessType } from '../../types/space.type';

interface AccessTypeIconProps {
  /** 설정하는 Type의 종류 */
  accessType: SpaceAccessType;
  /** Icon의 색깔 */
  color?: string;
}

const AccessTypeIcon = ({ accessType, color }: AccessTypeIconProps) => {
  const AccessTypeIcon = accessType === 'PUBLIC' ? PublicIcon : PrivateIcon;

  return <AccessTypeIcon color={color} />;
};

export default AccessTypeIcon;
