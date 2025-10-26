import { useState, createContext } from "react";
export const AdminContext = createContext();

const AdminProvider = (props) => {

  const [Atoken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'):('') );
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const value = {
    Atoken,
    setAtoken,
    backend_url,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
