import * as React from "react";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import Amplify, { Auth, Hub, API } from "aws-amplify";
import Authentication from "../../Stores/Authentication";
import aws_settings from "../../aws_settings";
import { getLoggedInCommunity } from "../../api/Community";
import { Community } from "../../models/Community";
import { Card } from "../Card/Card";
import { Entry } from "../../models/Entry";
import { getEntriesForCommunity } from "../../api/Entry";

Amplify.configure(aws_settings);

// You can get the current config object
// const currentConfig = Auth.configure(null);
// console.log(currentConfig);

Auth.currentAuthenticatedUser({
  bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
})
  .then(user => {
    console.log("auth user:", user);
    Authentication.authenticate(user);
  })
  .catch(err => {
    Authentication.logout();
  });

Auth.currentSession().then(session => console.log("current session:", session));

const authenticationListener = (data: any) => {
  switch (data.payload.event) {
    case "signIn":
      console.log("signIn event data:", data.payload);
      Authentication.authenticate(data.payload.data);
      break;
    case "signOut":
      console.log("signOut event data:", data.payload);
      Authentication.logout();
      break;
  }
};

interface ICommunityOverviewProps {
  authData: any;
  authState: any;
}

export const CommunityOverview = withAuthenticator(
  ({ authState, authData }: ICommunityOverviewProps) => {
    const [community, setCommunity] = React.useState<null | Community>(null);
    const [entries, setEntries] = React.useState<Entry[]>([]);

    Hub.listen("auth", authenticationListener);

    React.useEffect(() => {
      console.log("authState:", authState);
      console.log("authData:", authData);
    }, [authState, authData]);

    React.useEffect(() => {
      loadCommunity();
    }, []);

    const loadCommunity = async () => {
      setCommunity(await getLoggedInCommunity());
    };

    const loadEntries = async () => {
      if (community) {
        setEntries(await getEntriesForCommunity(community.id));
      }
    };

    React.useEffect(() => {
      loadEntries();
    }, [community]);

    return (
      community && (
        <div>
          <dl>
            <dt>Gemeinde</dt>
            <dd>{community.Name}</dd>
            <dt>Organisation</dt>
            <dd>{community.Association}</dd>
            <dt>PLZ</dt>
            <dd>{community.ZipCode}</dd>
          </dl>
          <h2>Alle Einträge zur Gemeinde</h2>
          <div className="grid">
            {entries.map((entry, index) => (
              <div className="col col-lg-6" key={index}>
                <Card {...entry} />
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
);
