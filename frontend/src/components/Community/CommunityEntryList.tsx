import * as React from "react";
import {
  createEntry,
  getEntriesForCommunity,
  updateEntry,
  deleteEntry
} from "../../api/Entry";
import { Entry } from "../../models/Entry";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { UserWithCommunity } from "./CommunityOverview";
import { EntryEditor } from "./EntryEditor";
import Authentication from "../../Stores/Authentication";

type CommunityEntryListProps = {
  account: UserWithCommunity;
  onFinish: () => void;
};

const createEmptyEntry = (account: UserWithCommunity) => ({
  Title: "",
  Description: "",
  category: { name: "", id: -1 },
  categoryId: -1,
  Community: account.Community,
  communityId: account.Community.id,
  account: account,
  accountId: account.id,
  date: new Date().toISOString().substring(0, 10),
  time: "12:00",
  Link: "",
  id: -1
});

export const CommunityEntryList = ({
  account,
  onFinish
}: CommunityEntryListProps) => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [entryToEdit, setEntryToEdit] = React.useState<Entry | null>(null);

  React.useEffect(() => {
    if (account) {
      getEntriesForCommunity(account.Community?.id || -1).then(setEntries);
    }
  }, [account]);

  const handleEntryEditClick = (entry: Entry) => {
    openEntryEditor(entry);
  };

  const openEntryEditor = (entry?: Entry) => {
    if (account !== null && account.Community) {
      entry = entry ?? createEmptyEntry(account);
      setEntryToEdit(entry);
    }
  };

  const handleCreateEntry = async (entry: Entry) => {
    if (entry.id === -1) {
      await createEntry(entry);
    } else {
      await updateEntry(entry);
    }
    setEntryToEdit(null);
    onFinish();
  };

  const handleCancelEditing = () => {
    setEntryToEdit(null);
  };

  const handleEntryDelete = async (entry: Entry) => {
    await deleteEntry(entry.id);
    onFinish();
  };

  React.useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <div key="community">
      <div className="grid">
        <div className="col col-lg-3">
          <Button icon="plus" onClick={() => openEntryEditor()}>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#52B25E" d="M-12-14h138v40H-12z"/><path d="M11 4.478H7.522V1H4.478v3.478H1v3.044h3.478V11h3.044V7.522H11z" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
            Neuer Eintrag
          </Button>
        </div>
      </div>
      <div className="grid">
        <div className="col col-lg-6">
          {entries.length ? (
            <h3>Alle Aktivitäten der Gemeinde</h3>
          ) : (
            <h3>Noch keine Aktivitäten vorhanden</h3>
          )}
        </div>
      </div>
      <div className="grid">
        {entries.map((entry, index) => {
          const editable =
            entry.account?.CognitoId ===
            (Authentication.getUser()?.user as any).attributes.sub;
          return (
            <div className="col col-lg-6" key={index}>
              <Card
                {...entry}
                editable={editable}
                onEdit={() => editable && handleEntryEditClick(entry)}
                onDelete={() => editable && handleEntryDelete(entry)}
              />
            </div>
          );
        })}
      </div>
      {entryToEdit && (
        <EntryEditor
          entry={entryToEdit}
          onSave={handleCreateEntry}
          onCancel={handleCancelEditing}
        />
      )}
    </div>
  );
};
