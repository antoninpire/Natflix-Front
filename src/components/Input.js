import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const focusedColor = "#8c8c8c";
const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: focusedColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
});

export function Input(props) {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      className={["input", classes.root]}
      inputProps={{ style: { color: "white" } }}
      InputLabelProps={{
        style: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
          color: "#8c8c8c",
        },
      }}
    />
  );
}
