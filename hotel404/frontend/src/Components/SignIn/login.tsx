import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";
import { VerifyUser } from "../../Controller/UserController";
import { LoggedinContext , UsernameContext} from "../../index";
import { useContext } from "react";
import { Link} from 'react-router-dom'; 

const Login = () => {
  
  //lite style för kortet som Sign In form är på
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "20px auto",
  };
  //Styles för olika element
  const btnstyle = { margin: "10px 3px" };
  const userlblstyle = { margin: "10px 3px" };
  const titleSpacing = { marginTop: "5px" };

  //För att hantera Username
  const [username, SetUsername] = useState("");
  //för att hantera password
  const [password, SetPassword] = useState("");
  //För att hantera errors som uppstår
  const [error, SetError] = useState("");
  
  //Globalt tillstånd för huruvida användare är inloggad
  const {loggedin, setLoggedin} = useContext(LoggedinContext); 
  const {globalUsername, setGlobalUsername} = useContext(UsernameContext); 

  //Ifall användaren trycker på knappen "Enter " efter att ha fyllt i password
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  

  //Funktion för att hantera Login och kollar på att errors som kan uppstå
  const handleLogin = async () => {
    SetError("");
    const validUser: boolean | string=  await VerifyUser(username, password); 
    //Om användaren matar in rätt inloggnings uppgifter
    if(validUser == true){
      alert("Login successful"); 
      setLoggedin(true);
      //För att Skriva in i terminalen
      console.log(setGlobalUsername); 
      setGlobalUsername(username); 
    } 
    //Om användaren matar in fel uppgifter
    else {
      SetError(validUser as string); 
    }
    //Tömmer alla TextFeilds efter att denna process är klar
    SetPassword("");
    SetUsername("");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        {/* Title with logo */}
        <Grid container direction="row" alignItems="center">
          <ApartmentIcon />
          <h1>HOTEL 404</h1>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          style={titleSpacing}
        >
          <h2>Sign in</h2>
        </Grid>

        <TextField
          label="Username"
          fullWidth
          required
          style={userlblstyle}
          onChange={(e) => SetUsername(e.target.value)}
          value={username}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          id="outlined-password-input"
          style={userlblstyle}
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          onKeyPress={handleKeyDown}
        />
        {/*Om det finns en  error, kommer följande att visas upp */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          onClick={handleLogin}
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          <Typography sx={{ mt: 1 }}>
            <b>Sign in</b>
          </Typography>
        </Button>
        {/*Länken till Sign Up sidan */}
        <Typography sx={{ textAlign: "center" }}>
          Do you want to create an account?&nbsp;
          <Link to={"signup"}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
