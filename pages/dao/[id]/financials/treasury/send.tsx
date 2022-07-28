import Layout from "@components/dao/Layout";
import { Box, Button } from "@mui/material";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import { ITokenHolder } from "@lib/creation/CreationApi";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import { deviceWrapper } from "@components/utilities/Style";
import MultiTokenHolders from "@components/utilities/MultiTokenHolders";
import SendApi, { ISendFunds } from "@lib/dao/financials/SendApi";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import RecurringForm from "@components/dao/financials/treasury/RecurringForm";
import SendContext from "@lib/dao/financials/SendContext";

const Send: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = React.useState<ISendFunds>({
    receivers: [
      {
        alias: "",
        address: "",
        img: "",
        balance: 0,
        percentage: 0,
      },
    ],
    recurring: false,
    firstPayment: new Date(),
    frequency: "Monthly",
    emissionLengthValue: undefined,
    emissionLength: "Months",
  });
  const treasuryAmount = 50000;
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new SendApi(undefined, undefined, value, setValue);

  React.useEffect(() => {
    if (globalContext.api !== undefined) {
      api.alert = globalContext.api.alert;
      api.alert = globalContext.api.setAlert;
    }
  }, [globalContext.api]);

  return (
    <SendContext.Provider value={{ api }}>
      <Layout width={deviceWrapper("92%", "60%")}>
        <Link
          href={
            id === undefined
              ? "/dao/financials/treasury"
              : `/dao/${id}/financials/treasury`
          }
        >
          <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
        <Box sx={{ mt: "1rem" }} />
        <Header title="Send funds from treasury" large />
        <Box sx={{ mt: "1.5rem" }} />
        <CapsInfo title="Sign-up form" mb="0.25rem" />
        <Box sx={{ color: "text.secondary", fontSize: ".9rem", mb: ".5rem" }}>
          In order to participate on this airdrop, please complete the form
          below.
        </Box>
        <MultiTokenHolders
          tokenHolders={value.receivers}
          treasuryAmount={treasuryAmount}
          set={(newTokenHolders: ITokenHolder[]) =>
            setValue({
              ...value,
              receivers: newTokenHolders,
            })
          }
        />

        <LabeledSwitch
          title="Set as recurring"
          subtitle="Set and schedule this payment to be done for a determined amount of time, in any frequency you wish."
          value={value.recurring}
          onChange={() =>
            setValue({
              ...value,
              recurring: !value.recurring,
            })
          }
        />
        {value.recurring && <RecurringForm />}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "50%", mr: "1rem" }}
            size="small"
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ width: "50%" }} size="small">
            Send
          </Button>
        </Box>
      </Layout>
    </SendContext.Provider>
  );
};

export default Send;
