import { Button } from "@mui/material";

export function Btn(props) {
  return (
    <Button
      style={{ backgroundColor: "#e50914", width: "100%", padding: "12px 0" }}
      variant="contained"
      {...props}
    >
      {props.value}
    </Button>
  );
}
