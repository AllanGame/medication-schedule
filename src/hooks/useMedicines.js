import moment from "moment";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const initialData = [
  {
    name: "Parecetamol",
    until: moment("07-03-2022", "MM-DD-YYYY"),
    lastDosis: moment("06-30-2022 14:50:00", "MM-DD-YYYY hh:mm:ss"),
    every: 6
  },
  {
    name: "Loratadina",
    until: moment("07-07-2022", "MM-DD-YYYY"),
    lastDosis: moment("06-29-2022 17:00:00", "MM-DD-YYYY hh:mm:ss"),
    every: 24
  },
  {
    name: "Dextromatorfano",
    until: moment("07-07-2022", "MM-DD-YYYY"),
    lastDosis: moment("06-30-2022 14:50:00", "MM-DD-YYYY hh:mm:ss"),
    every: 6
  }
];

const useMedicines = (initialState = initialData) => {
  const [state, setState] = useState(initialState);
  const [medicines, setMedicines] = useLocalStorage("appState", state);

  const takeDosisOf = (medicine) => {
    const medicineObj = state.filter((m) => m.name === medicine)[0];
    if (!medicineObj) {
      console.error("This medicine doesn't exist!");
      return;
    }

    medicineObj.lastDosis = moment();

    setState((medicines) => {
      const newstate = medicines.map((med) =>
        med.name === medicine ? medicineObj : med
      );
      setMedicines(newstate);
      return newstate;
    });
  };

  return [medicines, takeDosisOf];
};

export default useMedicines;
