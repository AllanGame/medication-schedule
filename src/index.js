import moment from "moment";
import ReactDOM from "react-dom";
import Medicine from "./components/medicine.component.js";
import { ThemeProvider, BaseStyles, Heading, Box, Button } from "@primer/react";
import "./index.css";
import useMedicines from "./hooks/useMedicines.js";
import NotificationsPopup from "./components/notifications.popup.js";
moment.locale("es");

const App = () => {
  const [medicines, takeDosisOf] = useMedicines();

  console.log({ medicines });

  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box className="app">
          <Heading>Horarios de medicación</Heading>
          <Box>
            {medicines.map((drug, i) => {
              return (
                <Medicine key={i} medicine={drug} callback={takeDosisOf} />
              );
            })}
          </Box>
          <Button>Añadir nueva medicina</Button>
          <NotificationsPopup />
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
