import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import {
  getVisibleContacts,
  getContacts,
} from '../../redux/contacts/contacts-selectors';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import style from './ContactList.module.css';
import popTransition from '../../utils/transitions/pop.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(getVisibleContacts);
  const contacts = useSelector(getContacts);

  return (
    <>
      <CSSTransition
        in={!contacts.length}
        timeout={250}
        classNames={popTransition}
        mountOnEnter
        unmountOnExit
      >
        <p>Your phonebook is empty. Please add contact.</p>
      </CSSTransition>

      <TransitionGroup component="ul" className={style.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            mountOnEnter
            unmountOnExit
            classNames={popTransition}
          >
            <li className={style.item}>
              <p className={style.info}>
                <b>{name}</b>
                <em>{number}</em>
              </p>
              <button
                className={style.btn}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                {/* <DeleteIcon width="26" height="26" /> */}
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

export default ContactList;
