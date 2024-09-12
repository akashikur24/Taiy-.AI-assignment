import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types/types";

interface ContactsState {
  contacts: Contact[];
}
//initial state
const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // add user's
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    // update User's
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    //delete the User
    deleteContact: (state, action: PayloadAction<string>) => {
      const filteredData = state.contacts.filter(
        (item) => item.id !== action.payload
      );
      state.contacts = filteredData;
    },
  },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
