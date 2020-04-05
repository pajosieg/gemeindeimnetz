import * as React from "react";
import { Association } from "../../models/Association";
import { getAllAssociations } from "../../api/Association";
import {
  getCommunitiesForAssociation,
  createCommunity
} from "../../api/Community";
import { createUser } from "../../api/User";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { TextInput } from "../TextInput/TextInput";
import { Community } from "../../models/Community";
import { NumberInput } from "../TextInput/NumberInput";

type RegisterToCommunityProps = {
  onRegistered: () => void;
};

const createCommunityObject = (
  name: string,
  zip: number,
  association: number
): Community => ({
  id: -1,
  Name: name,
  Association: "-1",
  AssociationId: association,
  ZipCode: zip
});

export const RegisterToCommunity = ({
  onRegistered: refreshCommunityView
}: RegisterToCommunityProps) => {
  const [associations, setAssociations] = React.useState<Association[]>([]);
  const [selectedAssociation, selectAssociation] = React.useState<number>(-1);
  const [communities, setCommunities] = React.useState<Association[]>([]);
  const [selectedCommunity, selectCommunity] = React.useState<number>(-1);
  const [registerNewCommunity, setRegisterNewCommunity] = React.useState(false);
  const [communityName, setCommunityName] = React.useState("");
  const [zipCode, setZipCode] = React.useState<number>(-1);

  React.useEffect(() => {
    getAllAssociations().then(setAssociations);
  }, []);

  React.useEffect(() => {
    selectCommunity(-1);
    getCommunitiesForAssociation(selectedAssociation || -1).then(
      setCommunities
    );
  }, [selectedAssociation]);

  const registerUserToCommunity = async () => {
    console.log("resigter user with:", selectedCommunity);
    if (selectedCommunity !== null) {
      await createUser(selectedCommunity);
      refreshCommunityView();
    }
  };

  const handleCreateNewCommunity = async () => {
    const newCommunity = createCommunityObject(
      communityName,
      zipCode,
      selectedAssociation
    );
    await createCommunity(newCommunity);
    refreshCommunityView();
  };

  return associations.length ? (
    <div className="grid">
      <div className="col col-lg-12">
        <h1>Wähle deine Gemeinde aus</h1>
      </div>
      <div className="col col-lg-6 col-lg-offset-3">
        <Select
          name="association"
          headline="Bistum oder Landeskirche auswählen"
          options={associations.map(({ Name, id }) => ({
            label: Name,
            value: id.toString()
          }))}
          value={selectedAssociation >= 0 ? selectedAssociation.toString() : ""}
          onChangeSelect={v => {
            console.log("ausgewählt", v);
            selectAssociation(parseInt(v));
          }}
        />

        <Select
          name="association"
          headline="Gemeinde"
          options={communities.map(({ Name, id }) => ({
            label: Name,
            value: id.toString()
          }))}
          value={selectedCommunity >= 0 ? selectedCommunity.toString() : ""}
          onChangeSelect={community => {
            selectCommunity(parseInt(community));
          }}
          disabled={registerNewCommunity}
        />
        <Button
          onClick={registerUserToCommunity}
          disabled={selectedCommunity < 0 || registerNewCommunity}
        >
          Für diese Gemeinde anmelden
        </Button>
        {selectedAssociation >= 0 && (
          <>
            <Checkbox
              checked={registerNewCommunity}
              name={
                <span>
                  Neue Gemeinde anlegen:{" "}
                  <b>
                    {associations.find(a => a.id === selectedAssociation)
                      ?.Name || ""}
                  </b>
                </span>
              }
              id="newCommunity"
              onCheckboxChange={(_, checked) =>
                setRegisterNewCommunity(checked)
              }
            />
            {registerNewCommunity ? (
              <div>
                <TextInput
                  disabled={!registerNewCommunity}
                  label="Name"
                  onTextChange={e => setCommunityName(e.target.value)}
                  id="newCommunityName"
                  value={communityName}
                />
                <NumberInput
                  disabled={!registerNewCommunity}
                  label="PLZ"
                  onBlur={e => setZipCode(e.target.valueAsNumber)}
                  id="newCommunityZipCode"
                  defaultValue={zipCode >= 0 ? zipCode.toString() : ""}
                />
                <Button
                  disabled={!registerNewCommunity}
                  onClick={handleCreateNewCommunity}
                >
                  Neue Gemeinde anlegen
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  ) : null;
};
