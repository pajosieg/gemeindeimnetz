import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as React from "react";
import { getAllAssociations } from "../../api/Association";
import {
  getCommunitiesForAssociation,
  getLoggedInCommunity
} from "../../api/Community";
import { getEntriesForCommunity } from "../../api/Entry";
import { createUser } from "../../api/User";
import { Association } from "../../models/Association";
import { Entry } from "../../models/Entry";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Select } from "../Select/Select";
import { Community } from "../../models/Community";

interface ICommunityOverviewProps {
  authData: any;
  authState: any;
}

export const CommunityOverview = withAuthenticator(
  (_: ICommunityOverviewProps) => {
    const [community, setCommunity] = React.useState<null | Community>(null);
    const [entries, setEntries] = React.useState<Entry[]>([]);
    const [noCommunityRegistered, setNoCommunityRegistered] = React.useState(
      false
    );

    const loadCommunity = React.useCallback(() => {
      getLoggedInCommunity().then(community => {
        if (community) {
          setCommunity(community);
          setNoCommunityRegistered(false);
        } else {
          setNoCommunityRegistered(true);
        }
      });
    }, [community]);

    React.useEffect(() => {
      loadCommunity();
    }, []);

    React.useEffect(() => {
      if (community) {
        getEntriesForCommunity(community.id).then(setEntries);
      }
    }, [community]);

    const handleViewRefresh = () => {
      setTimeout(loadCommunity, 1000);
    };

    return [
      community && (
        <div key="community">
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
      ),
      noCommunityRegistered && (
        <SelectCommunity
          key="registerCommunity"
          refreshCommunityView={handleViewRefresh}
        />
      )
    ];
  }
);

type SelectCommunityProps = {
  refreshCommunityView: Function;
};

const SelectCommunity = ({ refreshCommunityView }: SelectCommunityProps) => {
  const [associations, setAssociations] = React.useState<Association[]>([]);
  const [selectedAssociation, selectAssociation] = React.useState<
    string | null
  >(null);
  const [communities, setCommunities] = React.useState<Association[]>([]);
  const [selectedCommunity, selectCommunity] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    getAllAssociations().then(setAssociations);
  }, []);

  React.useEffect(() => {
    selectCommunity(null);
    getCommunitiesForAssociation(selectedAssociation || "").then(
      setCommunities
    );
  }, [selectedAssociation]);

  const registerUserToCommunity = () => {
    console.log("resigter user with:", selectedCommunity);
    if (selectedCommunity !== null) {
      createUser(parseInt(selectedCommunity));
      refreshCommunityView();
    }
  };

  return associations.length ? (
    <div className="grid">
      <div className="col col-lg-12">
        <h1>Wähle deine Gemeinde aus</h1>
      </div>
      <div className="col col-lg-6">
        <Select
          name="association"
          headline="Bistum oder Landeskirche auswählen"
          options={associations.map(({ Name, id }) => ({
            label: Name,
            value: id.toString()
          }))}
          value={selectedAssociation || ""}
          onChangeSelect={selectAssociation}
        />
        <Select
          name="association"
          headline="Gemeinde"
          options={communities.map(({ Name, id }) => ({
            label: Name,
            value: id.toString()
          }))}
          value={selectedCommunity || ""}
          onChangeSelect={comms => {
            console.log(comms);
            selectCommunity(comms);
          }}
        />
        <Button onClick={registerUserToCommunity}>
          Für diese Gemeinde Veröffentlichen
        </Button>
      </div>
    </div>
  ) : null;
};
