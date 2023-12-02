import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getConnectedUser, retrieveConnectedUserStatus, retrieveUserThunk } from '@/corelogic/store/user/user.store';
import { Status } from '@/types/fetch.types';
import { useEffect } from 'react';

export default function LineUserInfo() {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const connectedUser = useAppSelector(getConnectedUser);

  const userStatus: Status = useAppSelector(retrieveConnectedUserStatus);

  useEffect(() => {
    if (userStatus == Status.IDLE) {
      dispatch(retrieveUserThunk);
    }
  }, [userStatus, dispatch]);

  return (
    <div>{t('hello', { firstname: connectedUser.firstname})}</div>
  )
}