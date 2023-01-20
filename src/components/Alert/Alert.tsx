import { Alert as AlertMui, IconButton, Snackbar } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IAlert {
  message: string;
}

const Alert: FC<IAlert> = ({ message }) => (
  <Snackbar open autoHideDuration={600}>
    <AlertMui
      action={
        <IconButton aria-label="close" color="inherit" size="small">
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </AlertMui>
  </Snackbar>
);

export default Alert;
