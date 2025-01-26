import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LoggedinContext } from "../../index";
import { CreateUser } from "../../Controller/UserController";

import {useNavigate, Link} from 'react-router-dom'; 

const Signup = () => {
  const navigate = useNavigate(); 
  //styles
  const paperStyle = {
    padding: 20,
    //height: "65vh",
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
  //hanterar firstname
  const [name, SetFirstName] = useState("");
  //hanterar lastname
  const [lastname, SetLastName] = useState("");
  //hanterar age
  const [age, SetAge] = useState<number>(0);
  //hanterar error
  const [error, SetErrorMsg] = useState("");

  const {loggedin, setLoggedin} = useContext(LoggedinContext); 

  //Async funktion för att hantera nya användare
 const handleSignup = async () => {
  SetErrorMsg("");
  const newUser = await CreateUser(name,lastname, username, age, password, false);
  console.log('Sign Up handler');
  if(newUser) {
    alert("Sign Up successful");
    setLoggedin(true);

  }
  else
  {
    alert("Something Wrong")
    SetErrorMsg("All the fields needs to be filled!");
  }


 }
  //Ifall användaren tycker "Enter" i den efter att ha fyllt i password
  const handKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSignup();

    //Sätter alla textFields tomma igen
      SetFirstName("");
      SetLastName("");
      SetAge(0);
      SetUsername("");
      SetPassword("");
      SetErrorMsg("");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid container direction="row" alignItems="center">
          <ApartmentIcon />
          <h1>HOTEL 404</h1>
        </Grid>
        <Grid item direction="row" alignItems="center" style={titleSpacing}>
          <h2>Sign Up</h2>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              fullWidth
              required
              style={userlblstyle}
              onChange={(e) => SetFirstName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              fullWidth
              required
              style={userlblstyle}
              onChange={(e) => SetLastName(e.target.value)}
              value={lastname}
            />
          </Grid>
        </Grid>
        <TextField
          label="Age"
          type="number"
          fullWidth
          required
          style={userlblstyle}
          value={age}
          onChange={(e) => SetAge(parseInt(e.target.value))}
        />
        <TextField
          label="Username"
          type="text"
          fullWidth
          required
          style={userlblstyle}
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          id="password_lbl"
          style={userlblstyle}
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          onKeyPress={handKeyDown}
        />
        {/*Innebär, när errorMsg inträffar så kommer det andra att ske
            Error hantering */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSignup}
        >
          <Typography sx={{ mt: 1 }}>
            <b>Sign in</b>
          </Typography>
        </Button>
        {/*Länken till Sign In Sidan */}
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?&nbsp;
          <Link to="/">Sign in</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
