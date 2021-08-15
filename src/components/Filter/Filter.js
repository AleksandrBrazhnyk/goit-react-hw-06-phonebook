import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-actions';
import {
  getFilter,
  getContacts,
} from '../../redux/contacts/contacts-selectors';
import { CSSTransition } from 'react-transition-group';
import popTransition from '../../utils/transitions/pop.module.css';
import style from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  return (
    <CSSTransition
      in={contacts.length > 0}
      timeout={250}
      classNames={popTransition}
      mountOnEnter
      unmountOnExit
    >
      <label className={style.label}>
        Find contacts by name
        <input
          className={style.input}
          type="text"
          value={filter}
          onChange={e => dispatch(filterContact(e.target.value))}
        />
      </label>
    </CSSTransition>
  );
}

export default Filter;
