import "./medicine.style.css";

import {
  Button,
  Box,
  Heading,
  Text,
  Label,
  ActionMenu,
  ActionList
} from "@primer/react";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const Medicine = ({ medicine, callback }) => {
  const sanitazeMedicine = () => {
    medicine.lastDosis = moment(medicine.lastDosis);
    medicine.until = moment(medicine.until);
  };

  if (typeof medicine.lastDosis === "string") sanitazeMedicine(medicine);

  const lastDosisClone = medicine.lastDosis.clone();
  const nextDosis = lastDosisClone.add(medicine.every, "hours");

  const takeDosis = () => {
    if (moment().isBefore(nextDosis)) {
      alert(
        `¿Estás seguro de tomar esta dosis ahora? En el horario normal esta dosis se debería tomar ${lastDosisClone.from(
          moment()
        )}.`
      );
      return; // for now
    }

    if (moment().isAfter(nextDosis)) {
      alert(`Debiste haber tomado esta dosis ${lastDosisClone.from(moment())}`);
      callback(medicine.name);
    }
  };

  const lastDosisView = `${
    medicine.lastDosis ? medicine.lastDosis.calendar() : "Nunca"
  } (${medicine.lastDosis.from(moment())})`;
  const nextDosisView = `${
    medicine.lastDosis ? nextDosis.calendar() : "Ahora"
  } (${lastDosisClone.from(moment())})`;
  const labelView = moment().isAfter(nextDosis) ? (
    <Label variant="attention">Tomar dosis</Label>
  ) : (
    <></>
  );

  return (
    <Box
      className="medicine"
      borderColor="border.default"
      borderWidth={1}
      borderStyle="solid"
    >
      <Heading sx={{ fontSize: 4 }}>
        {medicine.name} {labelView}
      </Heading>
      <Text color="gray" fontSize="1">
        Termina {medicine.until.from(medicine.since)}
      </Text>
      <Box className="medicine-data">
        <Text>
          <Text fontWeight="bold" fontSize={2}>
            Última dosis
          </Text>{" "}
          {lastDosisView}
        </Text>
        <Text>
          <Text fontWeight="bold" fontSize={2}>
            Siguiente dosis
          </Text>{" "}
          {nextDosisView}
        </Text>
      </Box>
      <Box className="actions">
        <Button
          onClick={takeDosis}
          variant={moment().isAfter(nextDosis) ? "danger" : "default"}
        >
          Tomar una dosis
        </Button>
        <ActionMenu>
          <ActionMenu.Button>Editar</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item
                onSelect={(event) => console.log("Nombre cambiao")}
              >
                Cambiar nombre
              </ActionList.Item>
              <ActionList.Item>Cambiar última dosis</ActionList.Item>
              <ActionList.Item>Cambiar fecha de conclusión</ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item variant="danger">
                Borrar medicina
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Box>
    </Box>
  );
};

export default Medicine;
