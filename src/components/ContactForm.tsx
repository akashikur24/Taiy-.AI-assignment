import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../redux/contactsSlice";
import { v4 as uuidv4 } from "uuid";
import { Contact } from "../types/types";
import * as yup from "yup";

interface ContactFormProps {
  closeModal: () => void;
  //option if the user want to edit by sending the prev contact
  contact?: Contact | null;
}
const validateSchema = yup.object().shape({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  phoneNumber: yup.string().required("Phone number required"),
});

//contact form two use cased while edit and create
const ContactForm: React.FC<ContactFormProps> = ({ closeModal, contact }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    //check if the user want to edit the contact
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setPhoneNumber(contact.phoneNumber);
      setStatus(contact.status);
    }
  }, [contact]);

  const handleSubmit = async () => {
    // Form data object
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      status,
    };
    try {
      // Validate form data using Yup schema
      await validateSchema.validate(formData, { abortEarly: false });
      // If validation passes, dispatch the appropriate action
      if (contact) {
        // Edit existing contact
        dispatch(editContact({ id: contact.id, ...formData }));
      } else {
        // Add a new contact
        dispatch(
          addContact({
            id: uuidv4(), // Generate a unique ID for the new contact
            ...formData,
          })
        );
      }
      // Close the form modal after successful submission
      closeModal();
    } catch (validationError: any) {
      // Collect validation errors and set them to the state
      const errorMessages: { [key: string]: string } = {};
      if (validationError.inner) {
        validationError.inner.forEach((err: any) => {
          errorMessages[err.path] = err.message;
        });
      }
      setErrors(errorMessages);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md ">
      <h2 className="text-xl mb-4">
        {contact ? "Edit Contact" : "Create New Contact"}
      </h2>
      <div className="flex flex-col gap-y-2">
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 w-full "
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 w-full "
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 w-full "
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label>Status:</label>
        <div>
          <label className="mr-2">
            <input
              type="radio"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
              className="mr-1"
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
              className="mr-1"
            />
            Inactive
          </label>
        </div>
        {errors.status && <p className="text-red-500">{errors.status}</p>}
      </div>
      <div className="flex justify-between">
        {/* create Button or Edit Update  */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {contact ? "Update Contact" : "Save Contact"}
        </button>
        {/* close Button  */}
        <button
          onClick={closeModal}
          className="bg-red-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
