import { useTranslation } from '@/i18n/client';
import { useAppSelector } from '@/hooks';
import { getConnectedUser } from '@/corelogic/store/user/user.store';

export default function LineUserInfo() {

  const { t } = useTranslation();

  const connectedUser = useAppSelector(getConnectedUser);

  return (
    <div>{t('hello', { firstname: connectedUser.firstname }) }</div>
  );
}