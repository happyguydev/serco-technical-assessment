import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from  "@mui/material/Link";

function AppNavBar() {
  return (
    <AppBar
      position="static"
      sx={{
        mb: 2,
      }}
      className="navbar"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 3, display: "flex" }}
          >
            <Link href="/" color="inherit" underline="none">LOGO</Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavBar;
