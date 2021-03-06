import * as React from 'react';
import {
  createEntry,
  deleteEntry,
  getEntriesForCommunity,
  updateEntry,
} from '../../api/Entry';
import { ReactComponent as IconPlus } from '../../assets/icons/plus.svg';
import {
  createEmptyEntry,
  Entry,
  sortEntriesByDateAndTime,
} from '../../models/Entry';
import { UserWithCommunity } from '../../models/User';
import Authentication from '../../stores/Authentication';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Modal } from '../Modal/Modal';
import EntryCopier from './EntrieCopier';
import { EntryEditor } from './EntryEditor';
import './EntryList.scss';

type EntryListProps = {
  account: UserWithCommunity;
  onFinish: () => void;
  loading: (flag: boolean) => void;
};

export const EntryList = ({ account, onFinish, loading }: EntryListProps) => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [entryToEdit, setEntryToEdit] = React.useState<Entry | null>(null);
  const [entryToCopy, setEntryToCopy] = React.useState<Entry | null>(null);

  React.useEffect(() => {
    if (account) {
      loading(true);
      getEntriesForCommunity(account.Community?.id || -1).then(entries => {
        setEntries(entries.sort(sortEntriesByDateAndTime));
        loading(false);
      });
    }
  }, [account, loading]);

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
    loading(true);
    setEntryToEdit(null);
    if (entry.id === -1) {
      await createEntry(entry);
    } else {
      await updateEntry(entry);
    }
    onFinish();
  };

  const handleCancelEditing = () => {
    setEntryToEdit(null);
  };

  const handleEntryDelete = async (entry: Entry) => {
    loading(true);
    await deleteEntry(entry.id);
    onFinish();
  };

  const handleEntryCopyClick = async (entry: Entry) => {
    setEntryToCopy(entry);
  };

  const handleCopyEntry = async (entries: Entry[]) => {
    setEntryToCopy(null);
    console.log(entries);
    loading(true);

    await entries.reduce(async (promise, entry, index) => {
      return promise.then(() => {
        console.log('creating index:', index);
        return createEntry(entry).then(() => {
          console.log('finished', index);
          return Promise.resolve();
        });
      });
    }, Promise.resolve());
    onFinish();
  };

  const userAllowedToEdit = (entry: Entry) =>
    entry.account?.CognitoId ===
    (Authentication.getUser()?.user as any).attributes.sub;

  return (
    <div key="community">
      <div className="grid">
        <div className="col col-lg-3">
          <Button
            className="margin-top-1_5em"
            icon="plus"
            onClick={() => openEntryEditor()}
          >
            <IconPlus />
            Neuer Eintrag
          </Button>
        </div>
      </div>
      <div className="entry-list__entries">
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
            const editable = userAllowedToEdit(entry);
            return (
              <div className="col col-lg-6" key={index}>
                <Card
                  {...entry}
                  editable={editable}
                  onEdit={() => editable && handleEntryEditClick(entry)}
                  onDelete={() => editable && handleEntryDelete(entry)}
                  onCopy={() => editable && handleEntryCopyClick(entry)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {entryToEdit && (
        <Modal onClose={handleCancelEditing}>
          <EntryEditor
            entry={entryToEdit}
            onSave={handleCreateEntry}
            onCancel={handleCancelEditing}
          />
        </Modal>
      )}
      {entryToCopy && <EntryCopier entry={entryToCopy} onClose={handleCopyEntry} />}
    </div>
  );
};
