import { Header } from "@components/creation/utilities/HeaderComponents";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import DiscussionContext from "./DiscussionContext";

const GeneralInformation: React.FC = () => {
  let discussionContext = React.useContext(DiscussionContext);
  let value = discussionContext.api.value;

  return (
    <>
      <Header title="Discussion general information" />
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          value={value.name}
          label="Discussion name"
          onChange={(e: any) =>
            discussionContext.api.setValue({
              ...value,
              name: e.target.value,
            })
          }
          sx={{ width: "50%", mr: "1rem" }}
        />
        <FormControl sx={{ width: "50%" }}>
          <InputLabel htmlFor={`new-discussion-category-label`}>
            Discussion category
          </InputLabel>
          <Select
            labelId={`new-discussion-category-label`}
            id={`new-discussion-category`}
            variant="outlined"
            label="Discussion category"
            value={value.category}
            sx={{ height: "100%", color: "primary.text" }}
            onChange={(e: any) =>
              discussionContext.api.setValue({
                ...value,
                category: e.target.value,
              })
            }
          >
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default GeneralInformation;