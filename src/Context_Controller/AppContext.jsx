import { createContext } from "react";

export const AppContext = createContext();

const AppContextprovider=(props)=>{
    const calculate_age=(dob)=>{
      const today= new Date();
      const birthday= new Date(dob);
      let age= today.getFullYear()-birthday.getFullYear();
      return age;
    }

function ChangeDates(slot_date){
  const Months=["","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"];
  const newslotdate=slot_date.split("_");
  return newslotdate[0]+" "+Months[Number(newslotdate[1])]+" "+newslotdate[2];
}
    const value={
      calculate_age,
      ChangeDates
    }

  return <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>

}
export default AppContextprovider;