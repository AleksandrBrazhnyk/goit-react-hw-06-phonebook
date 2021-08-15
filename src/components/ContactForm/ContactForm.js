import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import Cleave from 'cleave.js/react';
import { toast } from 'react-toastify';
import style from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === '' || number.trim() === '';
  };

  const checkValidNumber = number => {
    return !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkRepeatName(name)) {
      toast(`🤔 ${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      toast(`🤔 ${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      toast.info("😱 Enter the contact's name and number phone!");
    } else if (checkValidNumber(number)) {
      toast.error('💩 Enter the correct number phone!');
    } else {
      dispatch(addContact(name, number));
    }
    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Name
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов."
          onChange={handleChange}
          required
          placeholder="Enter name (Ivanov Ivan)"
        />
      </label>
      <label className={style.label}>
        Phone Number
        <Cleave
          className={style.input}
          type="tel"
          autoComplete="off"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          onChange={handleChange}
          required
          placeholder="Enter numbe (111-11-11)"
        />
      </label>
      <button className={style.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
