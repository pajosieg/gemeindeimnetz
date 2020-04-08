import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import * as React from 'react';
import { getUser } from '../../api/User';
import { Community } from '../../models/Community';
import { User, UserWithCommunity } from '../../models/User';
import { AuthenticationService } from '../../services/AuthenticationService';
import { EntryList } from './EntryList';
import { CommunityRegistration } from './CommunityRegistration';
import { LoadingAnimation } from '../Loader/LoadingAnimation';

interface ICommunityOverviewProps {
  authData: any;
  authState: any;
}

export const CommunityOverview = withAuthenticator(
  (_: ICommunityOverviewProps) => {
    const [account, setAccount] = React.useState<null | User>(null);
    const [noCommunityRegistered, setNoCommunityRegistered] = React.useState(false);
    const [loadingAnimation, setLoadingAnimation] = React.useState(true);

    const loadAccount = React.useCallback(async () => {
      await getUser().then(user => {
        if (user) {
          setAccount(user);
          setNoCommunityRegistered(false);
        } else {
          setNoCommunityRegistered(true);
        }
      });
    }, []);

    React.useEffect(() => {
      setLoadingAnimation(true);
      loadAccount();
      setLoadingAnimation(false);
    }, [loadAccount]);

    const handleViewRefresh = () => {
      setLoadingAnimation(true);
      setTimeout(async () => {
        await loadAccount();
        setLoadingAnimation(false);
      }, 1000);
    };

    const handleLoading = React.useCallback((loading: boolean) => {
      setLoadingAnimation(loading);
    }, []);

    const communityInfos = (community: Community | null) =>
      community && <h4>Gemeinde {community.Name}</h4>;

    return (
      <div className="community">
        {account ? (
          account.Community ? (
            <>
              <div className="grid">
                <div className="col col-lg-6">
                  {communityInfos(account.Community)}
                  <h2>Willkommen</h2>
                </div>
              </div>
              <EntryList
                account={account as UserWithCommunity}
                onFinish={handleViewRefresh}
                loading={handleLoading}
              />
            </>
          ) : (
            <div>
              <h3>
                Gemeinde konnte nicht geladen werden. Bitte wenden Sie sich an den
                Support.
              </h3>
            </div>
          )
        ) : noCommunityRegistered ? (
          <CommunityRegistration
            onRegistered={handleViewRefresh}
            loading={handleLoading}
          />
        ) : null}
        {loadingAnimation && <LoadingAnimation />}
      </div>
    );
  },
  false,
  [],
  null,
  AuthenticationService.getTheme(),
  AuthenticationService.getSignUpConfig()
);
