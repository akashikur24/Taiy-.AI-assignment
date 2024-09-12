//type interface for the contact
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: "Active" | "Inactive";
}
//interface for the toggleCallBack
export interface ToogleProp {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
