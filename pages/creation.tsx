import { Box } from "@mui/material";
import * as React from "react";
import Nav from "../components/creation/nav/Nav";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "../theme/theme.js";
import Button from "@mui/material/Button";
import BasicInformation from "../components/creation/basic-information/BasicInformation";
import { GlobalContext } from "../lib/creation/Context";
import { CreationApi } from "../lib/creation/Api";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { checkCompleteness } from "../lib/creation/Utilities";

export default function Creation(props) {
  const [alert, setAlert] = React.useState({show: false});
  const [theme, setTheme] = React.useState(LightTheme);
  const [data, setData] = React.useState({
    navStage: 0,
    basicInformation: {
      dao_name: '',
      dao_url: '',
      short_description: '',
    }
  });

  let lookup = {
    light: "#FFFFFF",
    dark: "#0E1420",
  };

  let content = [
    <BasicInformation/>
  ]

  React.useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    document.body.style.background = lookup[temp];
  }, [theme]);

  const api = new CreationApi(
    alert, 
    setAlert,
    theme,
    setTheme,
    data,
    setData
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{api}}>
        <Nav value={data.navStage} theme={theme} setTheme={setTheme} />
        <Box sx={{ position: "fixed", ml: "15.5rem", top: "3.5rem", width: 'calc(100% - 16rem)', mt: '.5rem', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {content[data.navStage]}
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: '1.5rem'}}>
                {data.navStage > 0 && <Button variant="outlined" color="primary" onClick={() => setData({...data, navStage: data.navStage - 1})} sx={{mr: 1}}>
                  <ArrowBackIcon sx={{mr: 1}}/> Back
                </Button>}
                <Button variant="contained" disabled={checkCompleteness(data)} color="primary" onClick={() => setData({...data, navStage: data.navStage + 1})}>
                  Next <ArrowForwardIcon sx={{ml: 1}}/>
                </Button>
            </Box>

        </Box>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}
