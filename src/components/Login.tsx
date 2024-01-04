import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const LOGIN_ACCOUNT = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_ACCOUNT);

  const loginAccont = async () => {
    const data = await login({
      variables: {
        username,
        password,
      },
    });

    if (data.data.login.token) {
      const token = data.data.login.token;
      cookies.set("ut", token);
      window.location.assign("/tag");
    } else {
      alert("no register");
      console.log("error");
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        width: "400px",
        marginTop: "10px",
        border: "1px solid #fff",
        borderRadius: "5px",
        padding: "20px",
        margin: " 40px auto",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4">Login</Typography>

      <TextField
        value={username}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setUsername(e.target.value)}
        type={"email"}
        margin="normal"
        variant="outlined"
        placeholder="email"
      />
      <TextField
        value={password}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
        type={"password"}
        margin="normal"
        variant="outlined"
        placeholder="password"
      />
      <Stack direction="row" spacing={2}>
        <Button
          color="warning"
          variant="contained"
          sx={{ marginTop: "5px" }}
          onClick={loginAccont}
        >
          Login
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginTop: "5px" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
}
