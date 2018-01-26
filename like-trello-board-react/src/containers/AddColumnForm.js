import React from 'react';
import styles from '../styles/components/AddColumnForm.css';
import AddForm from './AddForm';

const COLUMN_LABEL = 'Add a column...';

class AddColumnForm extends React.Component {
  render() {
    return (
      <div className={styles['add-column-form']}>
        <AddForm label={COLUMN_LABEL}/>
      </div>

    );
  }
}

export default AddColumnForm;