import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as React from "react";
import { getUser } from "../../api/User";
import { Community } from "../../models/Community";
import { User } from "../../models/User";
import { CommunityEntryList } from "./CommunityEntryList";
import { RegisterToCommunity } from "./ResigtserToCommunity";

interface ICommunityOverviewProps {
  authData: any;
  authState: any;
}

export type UserWithCommunity = User & { Community: Community };

export const CommunityOverview = withAuthenticator(
  (_: ICommunityOverviewProps) => {
    const [account, setAccount] = React.useState<null | User>(null);
    const [noCommunityRegistered, setNoCommunityRegistered] = React.useState(
      false
    );

    const loadAccount = React.useCallback(() => {
      getUser().then(user => {
        if (user) {
          setAccount(user);
          setNoCommunityRegistered(false);
        } else {
          setNoCommunityRegistered(true);
        }
      });
    }, []);

    React.useEffect(() => {
      loadAccount();
    }, [loadAccount]);

    const handleViewRefresh = () => {
      setTimeout(loadAccount, 1000);
    };

    const communityInfos = (community: Community | null) =>
      community && (
        <dl>
          <dt>Gemeinde</dt>
          <dd>{community.Name}</dd>
          <dt>Organisation</dt>
          <dd>{community.Association}</dd>
          <dt>PLZ</dt>
          <dd>{community.ZipCode}</dd>
        </dl>
      );

    return account ? (
      account.Community ? (
        <div key="community">
          <div className="grid">
            <div className="col col-lg-6">
              {communityInfos(account.Community)}
            </div>
          </div>
          <CommunityEntryList
            account={account as UserWithCommunity}
            onFinish={handleViewRefresh}
          />
        </div>
      ) : (
        <div>
          <h2>
            Gemeinde konnte nicht geladen werden. Bitte wenden Sie sich an den
            Support.
          </h2>
        </div>
      )
    ) : noCommunityRegistered ? (
      <RegisterToCommunity onRegistered={handleViewRefresh} />
    ) : (
      <div>Loading Data</div>
    );
  }
);
