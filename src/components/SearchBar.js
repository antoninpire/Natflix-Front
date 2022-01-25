import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
// import { Loader } from "./Loader";
import axios from "axios";
import { requests } from "../requests";
import { useHistory } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.val,
});

const useStyles = makeStyles({
  option: {
    backgroundColor: "#1c252f",
    color: "white",
    "&:hover": {
      backgroundColor: "#2c3a4a !important",
    },
  },
});

export function SearchBar() {
  const styles = useStyles();
  const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchSearchAutoCompleteData);
      setSearchData(request.data);
    }
    fetchData();
  }, []);

  const handleClickAutocomplete = (event, option) => {
    if (option.type === "Film") {
      history.push(`/Movie/${option.id}`);
    } else if (option.type) {
      history.push(`/Search/[${option.type}]${option.val}`, {
        prop1: "test",
      });
    } else {
      history.push(`/Search/[Any]${event.target.value}`, { prop1: "test" });
    }
  };

  // if (loading) return <Loader />;

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={searchData}
          ListboxProps={{
            style: { backgroundColor: "#1c252f", overflow: "hidden" },
          }}
          classes={{
            option: styles.option,
          }}
          getOptionLabel={(option) => option.val}
          filterOptions={filterOptions}
          renderOption={(props, option) => {
            const { val, type, color } = option;
            return (
              <span {...props} style={{ backgroundColor: color }}>
                {type !== "Film" ? `${type}: ` : ""}
                {val && val.replaceAll("\\", "")}
              </span>
            );
          }}
          onChange={(e, value) => handleClickAutocomplete(e, value)}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <StyledInputBase
                {...params.InputProps}
                {...rest}
                style={{ minWidth: "17ch" }}
                placeholder="Rechercher..."
              />
            );
          }}
        />
      </Search>
    </>
  );
}
