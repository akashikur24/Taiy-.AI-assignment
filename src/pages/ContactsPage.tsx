import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import ContactDetailsModal from "../components/ContactDetailsModal";
import { Contact } from "../types/types";

const ContactsPage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [contactToView, setContactToView] = useState<Contact | null>(null);

  //for edit modal
  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
    setModal(true);
  };
  //for profile modal
  const handleView = (contact: Contact) => {
    setContactToView(contact);
  };

  //to close the modal
  const handleCloseModal = () => {
    setContactToEdit(null);
    setContactToView(null);
    setModal(false);
  };

  return (
    <div className="h-full flex flex-col items-center gap-9 py-6 relative">
      <div>
        <button
          onClick={() => setModal(true)}
          className="py-4 px-9 border-2 rounded-md hover:bg-slate-400 hover:text-white text-xl max-sm:py-2 max-sm:text-lg"
        >
          Create Contact
        </button>
      </div>
      {/* render the list of contact */}
      <ContactList onEdit={handleEdit} onView={handleView} />
      {/* condition rendering the modal  */}
      {modal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ContactForm
              contact={contactToEdit}
              closeModal={handleCloseModal}
            />
          </div>
        </>
      )}
      {/* condition rendering the profile modal  */}
      {contactToView && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setContactToView(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ContactDetailsModal
              contact={contactToView}
              closeModal={() => setContactToView(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ContactsPage;
