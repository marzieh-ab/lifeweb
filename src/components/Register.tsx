import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CREATE_ACCOUNT = gql`
  mutation Signup($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [salert, setAalert] = useState("false");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [create] = useMutation(CREATE_ACCOUNT);

  const createAcount = async () => {
    console.log(cookies);

    const { data } = await create({
      variables: { name: name, username: username, password: password },
    });

    console.log(data);

    if (data.signup.token) {
      const token = data.signup.token;
      cookies.set("ut", token);
      window.location.assign("/tag");
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
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        margin: " 40px auto",
        boxShadow: "10px 10px 20px #ccc",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4">Register</Typography>
      <TextField
        value={name}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setName(e.target.value)}
        type={"text"}
        margin="normal"
        variant="outlined"
        placeholder="name"
      />
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
      <Button
        color="warning"
        variant="contained"
        sx={{ marginTop: "5px" }}
        onClick={createAcount}
      >
        Register
      </Button>
    </Stack>
  );
}
