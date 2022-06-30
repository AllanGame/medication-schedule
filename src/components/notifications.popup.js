import { useState } from "react";
import { Box, Popover, Heading, Button, Text } from "@primer/react";
import "./notifications.popup.css";

const NotificationsPopup = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box position="absolute" pt={4} className="popupContainer">
      <Popover relative open={open} caret="bottom-right">
        <Popover.Content>
          <Heading sx={{ fontSize: 2 }}>Activa las notificaciones!</Heading>
          <Text as="p">
            Esta aplicación necesita permisos para notificarte de tomar tus
            dosis.
          </Text>
          <Button
            onClick={() => {
              setOpen(false);
              Notification.requestPermission();
            }}
          >
            Entendido.
          </Button>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

export default NotificationsPopup;
