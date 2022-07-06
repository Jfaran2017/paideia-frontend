
import React, { FC } from 'react';
import PageHeader from "@components/PageHeader";
import PageNav from "@components/PageNav";
import { 
  Typography, 
  Grid, 
  Container, 
  Box, 
} from "@mui/material";
import Image from "next/image";
import SectionHeading from "@components/SectionHeading";
import { DarkTheme } from "@theme/theme";

const navLinks = [
  {
    name: "Introduction",
    icon: "waving_hand",
    link: "sponsored",
    position: undefined,
  },
  {
    name: "Whitepaper",
    icon: "description",
    link: "feedback",
    position: undefined,
  },
  {
    name: "The Solution",
    icon: "emoji_objects",
    link: "activedaos",
    position: undefined,
  },
];

export default function Projects() {
  return (
    <>
      <PageHeader
        bgUrl="/about-header-bg.png"
        sectionTitle="Projects"
        titleLineOne="Projects"
        titleLineTwo="In Paideia&lt;"
        subTitleOne="Find all the projects launched on"
        subTitleTwo="Paideia and new ones coming soon. "
      />
      <Container sx={{ px: "24px", py: '60px' }} id="navContainer">
        <PageNav navLinks={navLinks}>
          <Box component="section" id="sponsored">
            
          </Box>
          <Box component="section" id="feedback">
            
          </Box>

          <Box component="section" id="activedaos">
            <SectionHeading
              category="The Solution"
              title="Paideia is a DAO management software suite"
              sx={{ mb: '280px' }}
            >
              It is designed to make it easy for anyone to create, manage and be involved in a DAO, as well as facilitate the distribution of governance tokens and allow the ability to raise funds. The technical goal is to provide a secure DAO tool set that is open, easy to use, inexpensive, and allows for use in any environment.

              With Paideia in the hands of anyone that wishes to use it, this software suite can open new ways for people to work together, to change their lives and the world for the better.
            </SectionHeading>
          </Box>

        </PageNav>
      </Container>
    </>
  );
}
