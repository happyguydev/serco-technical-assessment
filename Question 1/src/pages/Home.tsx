import React from "react";
import {
  Container,
  Typography,
  Grid,
} from "@mui/material";

import CitySelector from "../components/CitySelector";

const Home: React.FC = () => {
  return (
    <Container sx={{ mt: 7 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold" textAlign="center">First City</Typography>
          <CitySelector />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold" textAlign="center">Second City</Typography>
          <CitySelector />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;