import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NoteDetail from '../components/NoteDetail';
import { getNote, archiveNote, deleteNote, unarchiveNote } from '../utils/network-data';
import { useParams, useNavigate } from 'react-router-dom';

function DetailPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [note, setNote] = useState({});

  useEffect(() => {
    getNote(id).then(({data}) => {
      setNote(data);
    });
  }, [id]);

  async function onDelete (id) {
    await deleteNote(id);
    navigate('/');
  }

  async function onArchive (id) {
    await archiveNote(id);
    navigate('/');
  }

  async function onUnArchive (id) {
    await unarchiveNote(id);
    navigate('/');
  }

  if(typeof note === 'undefined'){
    return <p>Note is not found</p>
  }
  return (
    <section>
      <NoteDetail
        note={note}
        onDelete={onDelete}
        onArchive={onArchive}
        onUnArchive={onUnArchive}
        />
    </section>
  );
  
}

DetailPage.propTypes ={
id: PropTypes.string,
onDelete: PropTypes.func,
onArchive: PropTypes.func,
onUnArchive: PropTypes.func,
}

export default DetailPage;