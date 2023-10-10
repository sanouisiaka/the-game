import BetThemAll from '@/components/elements/betThemAll'
import { getConnectedUser, retrieveUserThunk } from '@/corelogic/store/user/user.store'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Status } from '@/types/fetch.types'
import { useTranslation } from '@/i18n/client'

export default function Header() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const connectedUser = useAppSelector(getConnectedUser);

  const userStatus: Status = useAppSelector((state) => state.user.status)

  useEffect(() => {
    if (userStatus == Status.IDLE) {
      console.log("will trigger")
      dispatch(retrieveUserThunk())
    }
  }, [userStatus, dispatch])

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <BetThemAll/>
          { connectedUser.email} {t('title')}
        </div>
      </div>
    </nav>
  );
}
