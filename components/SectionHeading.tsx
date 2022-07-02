import React, { FC } from 'react';
import { Grid, Typography, Box } from "@mui/material";
import SectionTitle from "@components/SectionTitle";
import Blockquote from "@components/Blockquote";

interface HeadingProps {
  category?: string;
  title?: string;
  sx?: object;
}

const SectionHeading: FC<HeadingProps> = ({ category, title, children, sx }) => {
  return (
      <Grid container direction="column" spacing={3} sx={sx ? sx : { mb: '64px' }}>
        <Grid item>
          <SectionTitle>
            {category}
          </SectionTitle>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: "400",
              lineHeight: "116.7%",
              textTransform: "uppercase",
              fontFamily: '"Viga", sans-serif',
            }}
          >
            {title}
          </Typography>
        </Grid>
        {children ? (<Grid item>
          <Grid container >
            <Grid item md={8}>
              <Blockquote small>
                {children}
              </Blockquote>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </Grid>) : null}
      </Grid>
  )
}

export default SectionHeading