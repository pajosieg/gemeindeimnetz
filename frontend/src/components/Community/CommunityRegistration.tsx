import * as React from 'react';
import { getAllAssociations } from '../../api/Association';
import { createCommunity, getCommunitiesForAssociation } from '../../api/Community';
import { createUser } from '../../api/User';
import { Association } from '../../models/Association';
import { createEmptyCommunity } from '../../models/Community';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select/Select';
import { NumberInput } from '../TextInput/NumberInput';
import { TextInput } from '../TextInput/TextInput';

type RegisterToCommunityProps = {
  onRegistered: () => void;
  loading: (flag: boolean) => void;
};

export const CommunityRegistration = ({
  onRegistered,
  loading,
}: RegisterToCommunityProps) => {
  const [associations, setAssociations] = React.useState<Association[]>([]);
  const [selectedAssociation, selectAssociation] = React.useState<number>(-1);
  const [communities, setCommunities] = React.useState<Association[]>([]);
  const [selectedCommunity, selectCommunity] = React.useState<number>(-1);

  const [registerNewCommunity, setRegisterNewCommunity] = React.useState(false);

  React.useEffect(() => {
    loading(true);
    getAllAssociations().then(associations => {
      setAssociations(associations);
      loading(false);
    });
  }, [loading]);

  React.useEffect(() => {
    loading(true);
    selectCommunity(-1);
    getCommunitiesForAssociation(selectedAssociation || -1).then(communities => {
      setCommunities(communities);
      loading(false);
    });
  }, [selectedAssociation, loading]);

  const registerUserToCommunity = async () => {
    if (selectedCommunity !== null) {
      loading(true);
      await createUser(selectedCommunity);
      onRegistered();
    }
  };

  const handleCreateNewCommunity = async (name: string, zipCode: number) => {
    loading(true);
    const newCommunity = createEmptyCommunity(name, zipCode, selectedAssociation);
    await createCommunity(newCommunity);
    onRegistered();
  };

  const getAssociationName = () =>
    associations.find(a => a.id === selectedAssociation)?.Name || '';

  return associations.length ? (
    <div className="grid">
      <div className="col col-lg-12">
        <h1>Wähle deine Gemeinde aus</h1>
      </div>
      <div className="col col-lg-6 col-lg-offset-3 margin-top-1_5em">
        <Select
          className="margin-top-1em"
          name="association"
          headline="Bistum oder Landeskirche auswählen"
          options={associations.map(({ Name, id }) => ({
            label: Name,
            value: id.toString(),
          }))}
          value={selectedAssociation >= 0 ? selectedAssociation.toString() : ''}
          onChangeSelect={v => {
            console.log('ausgewählt', v);
            selectAssociation(parseInt(v));
          }}
        />

        <Select
          className="margin-top-1em"
          name="association"
          headline="Gemeinde"
          options={communities.map(({ Name, id }) => ({
            label: Name,
            value: id.toString(),
          }))}
          value={selectedCommunity >= 0 ? selectedCommunity.toString() : ''}
          onChangeSelect={community => {
            selectCommunity(parseInt(community));
          }}
          disabled={registerNewCommunity}
        />
        <Button
          className="margin-top-1em"
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
                  Neue Gemeinde anlegen: <b>{getAssociationName()}</b>
                </span>
              }
              id="newCommunity"
              onCheckboxChange={(_, checked) => setRegisterNewCommunity(checked)}
            />
            {registerNewCommunity ? (
              <CommunityCreator onCreate={handleCreateNewCommunity} />
            ) : null}
          </>
        )}
      </div>
    </div>
  ) : null;
};

type CommunityCreatorProps = {
  onCreate: (name: string, zipCode: number) => void;
};
const CommunityCreator = ({ onCreate }: CommunityCreatorProps) => {
  const [communityName, setCommunityName] = React.useState('');
  const [zipCode, setZipCode] = React.useState(-1);

  const handleCreateNewCommunity = () => {
    onCreate(communityName, zipCode);
  };

  return (
    <div>
      <TextInput
        label="Name"
        onTextChange={e => setCommunityName(e.target.value)}
        id="newCommunityName"
        value={communityName}
      />
      <NumberInput
        label="PLZ"
        onBlur={e => setZipCode(e.target.valueAsNumber)}
        id="newCommunityZipCode"
        defaultValue={zipCode >= 0 ? zipCode.toString() : ''}
      />
      <Button onClick={handleCreateNewCommunity}>Neue Gemeinde anlegen</Button>
    </div>
  );
};
