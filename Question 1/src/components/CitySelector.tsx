import React, { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Grid,
  CircularProgress,
  Backdrop,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import jwtAPI from "../services/jwtApi";
import { Country } from "../constants/countryModel";
import { City } from "../constants/cityModel";
import { Location } from "../constants/locationModel";
import { ValidationError } from "../constants/validationErrorModel";

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CitySelector: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [county, setCounty] = useState<Country | null>();
  const [city, setCity] = useState<City | null>();
  const [cities, setCities] = useState<City[]>([]);
  const [location, setLocation] = useState<Location | null>();
  const [locations, setLocations] = useState<Location[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadSection, setLoadSection] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const validationError = (msg: ValidationError[]) => {
    let text: string = "";
    msg.map((error) => {
      text = text + error.msg + ", ";
    });

    setErrorMsg(text.slice(0, -1));
  }

  useEffect(() => {
    setCountries([]);
    setCounty(null);
    setCity(null);
    setCities([]);
    setLocation(null);
    setLocations([]);
    const getSummary = async () => {
      setLoading(true);
      try {
        const res = await jwtAPI.getSummary();
        if (res.status === "error") validationError(res.message);
        const countryCount = res.result.results[0].countries;
        let countries = await jwtAPI.getCountries(countryCount);
        if (countries.status === "error") validationError(countries.message);
        countries.result.results = countries.result.results.filter((item: Country) => item.cities !== 0);
        setCountries(countries.result.results);
      } catch (e) {
        console.error(e);
        setError(true);
        setErrorMsg("Error in fetching Data!");
      }
      setLoading(false);
    };
    getSummary();
  }, []);

  useEffect(() => {
    setCity(null);
    setCities([]);
    setLocation(null);
    setLocations([]);
    if (!county) return;
    const getCities = async () => {
      setCities([]);
      setLoadSection(true);
      try {
        const res = await jwtAPI.getCities(county);
        if (res.status === "error") validationError(res.message);
        setCities(res.result.results);
      } catch (e) {
        console.error(e);
        setError(true);
      }
      setLoadSection(false);
    }
    getCities();
  }, [county]);

  useEffect(() => {
    setLocation(null);
    setLocations([]);
    if (!city) return;
    const getLocations = async () => {
      setLoadSection(true);
      try {
        const res = await jwtAPI.getLocations(city?.city);
        if (res.status === "error") validationError(res.message);
        setLocations(res.result.results);
      } catch (e) {
        console.error(e);
        setError(true);
      }
      setLoadSection(false);
    }
    getLocations();
  }, [city]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        open={error}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid item xs={12} sx={{ px: { md: 10 } }}>
          <Autocomplete
            id="Countries"
            options={countries}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label=" Coutry" margin="normal" />
            )}
            value={county}
            onChange={(event: any, newValue: Country | null) => {
              setCounty(newValue);
            }}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.name, inputValue);
              const parts = parse(option.name, matches);

              return (
                <li {...props}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ px: { md: 10 } }}>
          {cities.length > 0 && (
            <Autocomplete
              id="Cities"
              options={cities}
              getOptionLabel={(option) => option.city}
              renderInput={(params) => (
                <TextField {...params} label=" City" margin="normal" />
              )}
              value={city}
              onChange={(event: any, newValue: City | null) => {
                setCity(newValue);
              }}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.city, inputValue);
                const parts = parse(option.city, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sx={{ px: { md: 10 } }}>
          {locations.length > 0 && (
            <Autocomplete
              id="Locations"
              options={locations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label=" Location" margin="normal" />
              )}
              value={location}
              onChange={(event: any, newValue: Location | null) => {
                setLocation(newValue);
              }}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {location && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Parameter</StyledTableCell>
                    <StyledTableCell>Value</StyledTableCell>
                    <StyledTableCell>Unit</StyledTableCell>
                    <StyledTableCell>Last Updated</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {location?.parameters.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.displayName}
                      </TableCell>
                      <TableCell>{row.lastValue}</TableCell>
                      <TableCell>{row.unit}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(row.lastUpdated))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>

      {loadSection && (
        <Box textAlign="center" sx={{ mt: 3 }}>
          <CircularProgress color="inherit" />
        </Box>
      )}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default CitySelector;