import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import { toast } from "react-toastify";

export function SettingCard({
  titre,
  description,
  value,
  setSelectedValue,
  selectedValue,
  storageKey,
}) {
  const handleChange = () => {
    localStorage.setItem(storageKey, value);
    setSelectedValue(value);
    toast.success("Modification effectuée");
  };

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "60%",
        margin: "0 auto 1.5rem",
        backgroundColor: "#1c252f",
        color: "white",
        border: `${
          selectedValue === value ? "1px solid white" : "1px solid transparent"
        }`,
        padding: "1.5rem 0",
        "&:hover": {
          border: "1px solid white",
          cursor: "pointer",
        },
      }}
      onClick={handleChange}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 3rem",
        }}
      >
        <Radio
          style={{ color: "white", backgroundColor: "transparent" }}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          checked={selectedValue === value}
          value={value}
          inputProps={{ "aria-label": value }}
          name="radio-settings"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: "3rem",
        }}
      >
        <h4 style={{ paddingBottom: "10px" }}>{titre} </h4>
        <p>{description}</p>
      </Box>
    </Card>
  );
}
