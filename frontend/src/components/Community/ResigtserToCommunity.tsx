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
  const [selectedAssociation, selectAssociation] = React.useState<
    number | null
  >(null);
  const [communities, setCommunities] = React.useState<Association[]>([]);
  const [selectedCommunity, selectCommunity] = React.useState<string | null>(
    null
  );
  const [checkedNewCommunity, setCheckedNewCommunity] = React.useState(false);
  const [newCommunityName, setNewCommunityName] = React.useState("");
  const [newCommunityZipCode, setNewCommunityZipCode] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    getAllAssociations().then(setAssociations);
  }, []);

  React.useEffect(() => {
    selectCommunity(null);
    getCommunitiesForAssociation(selectedAssociation || -1).then(
      setCommunities
    );
  }, [selectedAssociation]);

  const registerUserToCommunity = async () => {
    console.log("resigter user with:", selectedCommunity);
    if (selectedCommunity !== null) {
      await createUser(parseInt(selectedCommunity));
      refreshCommunityView();
    }
  };

  const handleCreateNewCommunity = async () => {
    const newCommunity = createCommunityObject(
      newCommunityName,
      newCommunityZipCode ?? 0,
      selectedAssociation || -1
    );
    await createCommunity(newCommunity);
    refreshCommunityView();
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
          value={selectedAssociation?.toString() || ""}
          onChangeSelect={v => selectAssociation(parseInt(v))}
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
        <Button
          onClick={registerUserToCommunity}
          disabled={selectedCommunity === null}
        >
          Für diese Gemeinde Veröffentlichen
        </Button>
      </div>
      <div className="col col-lg-6">
        <Checkbox
          checked={checkedNewCommunity}
          name="Neue Gemeinde zu diesem Bistum/Landeskirche anlegen"
          id="newCommunity"
          onCheckboxChange={(_, checked) => setCheckedNewCommunity(checked)}
        />
        <TextInput
          disabled={!checkedNewCommunity}
          label="Name"
          onTextChange={e => setNewCommunityName(e.target.value)}
          id="newCommunityName"
          value={newCommunityName}
        />
        <NumberInput
          disabled={!checkedNewCommunity}
          label="PLZ"
          onTextChange={e => setNewCommunityZipCode(e.target.valueAsNumber)}
          id="newCommunityZipCode"
          value={newCommunityZipCode?.toString() || ""}
        />
        <Button
          disabled={!checkedNewCommunity}
          onClick={handleCreateNewCommunity}
        >
          Neue Gemeinde anlegen
        </Button>
      </div>
    </div>
  ) : null;
};
