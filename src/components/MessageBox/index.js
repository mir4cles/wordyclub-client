import React from "react";
import { useSelector } from "react-redux";

import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { selectMessage } from "../../store/appState/selectors";

export default function MessageBox() {
  const [open, setOpen] = React.useState(true);
  const message = useSelector(selectMessage);
  const showMessage = message !== null;

  if (!showMessage) return null;

  if (message.dismissable) {
    return (
      <Collapse in={open}>
        <Alert
          severity={message.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message.text}
        </Alert>
      </Collapse>
    );
  }

  return <Alert severity={message.variant}>{message.text}</Alert>;
}
