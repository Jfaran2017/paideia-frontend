import { Avatar, Box, Button, Paper } from "@mui/material";
import { bytesToSize } from "../../lib/creation/Utilities";
import ImageIcon from "@mui/icons-material/Image";

import { deviceStruct } from "./Style";

const FileBanner: React.FC<{
  file: any;
  handleImage: Function;
  id: string;
  fileUrl: string;
  banner?: boolean;
}> = (props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: "1rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".5rem",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "fileInput.main",
          border: "1px dashed",
          borderColor: "fileInput.border",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pt:
            props.fileUrl !== "" &&
            props.fileUrl !== undefined &&
            props.file !== undefined
              ? 0
              : "1rem",
          pb: "1rem",
        }}
      >
        {props.fileUrl !== "" &&
        props.fileUrl !== undefined &&
        props.file !== undefined ? (
          <>
            <Box sx={{ width: "100%" }}>
              <img
                src={props.fileUrl}
                alt="Picture of the author"
                style={{
                  borderTopLeftRadius: ".2rem",
                  borderTopRightRadius: ".3rem",
                }}
                width="1200rem"
                height="410rem"
              />
              <Box
                sx={{
                  height: "3rem",
                  pl: "1rem",
                  pr: "1rem",
                  display: "flex",
                  width: "100%",
                }}
              >
                <Box sx={{ mt: ".2rem" }}>
                  {props.file.name}
                  <Box
                    sx={{
                      color: "text.secondary",
                      fontSize: deviceStruct(
                        ".7rem",
                        ".7rem",
                        ".9rem",
                        ".9rem",
                        ".9rem"
                      ),
                    }}
                  >
                    {props.file === undefined || props.file === -1
                      ? "File Max size 1Mb. Dimensions 720px by 350px."
                      : bytesToSize(props.file.size)}
                  </Box>
                </Box>

                <Box sx={{ ml: "auto" }}>
                  <Button
                    variant="contained"
                    sx={{ mt: ".5rem" }}
                    size="small"
                    onClick={() => {
                      const fileInput = document.getElementById(props.id);
                      fileInput.click();
                    }}
                  >
                    Replace
                  </Button>
                </Box>
              </Box>
            </Box>
            <input
              type="file"
              id={props.id}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => props.handleImage(e)}
            />
          </>
        ) : (
          <>
            <Box>
              <ImageIcon style={{ fontSize: "3rem" }} color="primary" />
            </Box>
            <Box>
              <input
                type="file"
                id={props.id}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => props.handleImage(e)}
              />
              <Box
                sx={{
                  color: "text.primary",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {props.file === undefined || props.file === -1
                  ? "Drop your image here or "
                  : props.file.name}
                {(props.file === undefined || props.file === -1) && (
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "inline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const fileInput = document.getElementById(props.id);
                      fileInput.click();
                    }}
                  >
                    browse
                  </Box>
                )}
              </Box>
              <Box sx={{ color: "text.secondary", textAlign: "center" }}>
                {props.file === undefined || props.file === -1
                  ? "File Max size 1Mb. Dimensions 1200px by 400px."
                  : bytesToSize(props.file.size)}
              </Box>
              {props.file === -1 && (
                <Box sx={{ color: "red", fontWeight: 500 }}>
                  File size too large.
                </Box>
              )}
              {props.file !== undefined && props.file !== -1 && (
                <Button
                  variant="contained"
                  sx={{ mt: ".5rem" }}
                  onClick={() => {
                    const fileInput = document.getElementById(props.id);
                    fileInput.click();
                  }}
                >
                  Replace
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Paper>
  );
};

export default FileBanner;
