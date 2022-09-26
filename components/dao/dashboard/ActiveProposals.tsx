import { Box, Button, IconButton } from "@mui/material";
import * as React from "react";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProposalCard from "../proposals/ProposalCard";
import useDidMountEffect from "@components/utilities/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import CardSlider from "@components/CardSlider";
import { getBaseUrl, fetcher } from "@lib/utilities";
import useSWR from "swr";

let temp = new Date();
temp.setDate(temp.getDate() - 30);

const ActiveProposal: React.FC = () => {
  const [slide, setSlide] = React.useState<number>(1);

  useDidMountEffect(() => {
    let element = document.getElementById(
      `proposal-active-${slide === 0 ? slide : slide - 1}`
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [slide]);

  const router = useRouter();
  const { id } = router.query;
  const { data: proposalData, error: proposalError } = useSWR(
    `/proposals/by_dao_id/${id === undefined ? 1 : id}`,
    fetcher
  );

  return (
    <>
      <CardSlider
        uniqueId="uses"
        addMargin={0}
        buttonTop
        header={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: deviceWrapper("80%", "90%"),
            }}
          >
            <Subheader title="Active proposals" small bold />
            <Box sx={{ ml: "auto" }}>
              <Link
                href={
                  id === undefined
                    ? "dao/proposals/all"
                    : `/dao/${id}/proposals/all`
                }
              >
                <Button sx={{ fontSize: ".8rem", mr: "1rem" }} size="small">
                  View All
                </Button>
              </Link>
            </Box>
          </Box>
        }
      >
        {proposalData === undefined ? (
          <Box> Loading Here...</Box>
        ) : (
          proposalData.map((i: any, c: number) => (
            <ProposalCard
              {...i}
              c={c}
              scrollable
              key={"proposal-card-key-" + c}
              width={deviceStruct("25%", "25%", "35%", "33%", "70%")}
            />
          ))
        )}
      </CardSlider>
    </>
  );
};

export default ActiveProposal;
