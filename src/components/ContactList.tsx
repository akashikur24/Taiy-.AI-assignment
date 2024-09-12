import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteContact } from "../redux/contactsSlice";
import { Contact } from "../types/types";

interface ContactListProps {
  onEdit: (contact: Contact) => void;
  onView: (contact: Contact) => void;
}
//contact list items
const ContactList: React.FC<ContactListProps> = ({ onEdit, onView }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts); //to get the contact details from the redux
  const dispatch = useDispatch();

  if (contacts.length === 0) {
    return (
      <div className="w-1/2 border-2 border-black p-3 max-sm:w-[80%]">
        <p className="text-xl">
          No Contact Found. Please add a contact from the Create Contact Form.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-8 flex gap-y-3 flex-col max-sm:px-3">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-gray-50 border flex justify-between items-center rounded-md p-2.5 hover:bg-gray-200 hover:cursor-pointer "
        >
          <p className="flex flex-col">
            <span>{contact.firstName}</span>
            <span className="text-sm">{contact.phoneNumber}</span>
          </p>
          <div>
            <button className="btn" onClick={() => onEdit(contact)}>
              Edit
            </button>
            <button className="btn" onClick={() => onView(contact)}>
              View
            </button>
            <button
              className="btn"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
