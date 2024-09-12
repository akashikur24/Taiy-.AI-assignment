import React from "react";
import { Contact } from "../types/types";

interface ContactDetailsModalProps {
  contact: Contact;
  closeModal: () => void;
}
//user contack details
const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({
  contact,
  closeModal,
}) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-xl mb-4">Contact Details</h2>
      <p className="mb-2">
        <strong>First Name:</strong> {contact.firstName}
      </p>
      <p className="mb-2">
        <strong>Last Name:</strong> {contact.lastName}
      </p>
      <p className="mb-2">
        <strong>Phone Number:</strong> {contact.phoneNumber}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {contact.status}
      </p>
      <button
        onClick={closeModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default ContactDetailsModal;
