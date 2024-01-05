import React, { useState, useRef } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { DtPicker } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Layout from "./Layout";
type DataTag = {
  _id: number;
  color: string;
  expenseCount: number;
  name: string;
}[];

const GET_MY_TAGS = gql`
  query GetMyTags {
    getMyTags {
      _id
      color
      expenseCount
      name
    }
  }
`;

const CREATE_EXPENSE = gql`
  mutation Mutation($data: ExpenseInfo!) {
    create_expense(data: $data) {
      msg
      status
    }
  }
`;

export default function Expense() {
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(null);

  const [tag, setTag] = useState();
  const [create] = useMutation(CREATE_EXPENSE);
  const center = [51.505, -0.09];
  const zoom = 13;
  console.log(date);

  const mapRef = useRef<LeafletMap>(null);

  console.log(mapRef, "ref");

  const addExpense = async () => {
    console.log("ok");
    // console.log(markerRef._current)
    console.log(mapRef.current);
    // console.log(markerRef.current.getCenter())
    const x = mapRef.current!.getCenter();
    const geo = {
      lat: x.lat,
      lon: x.lng,
    };

    console.log(typeof date);

    const dataEx = {
      amount: Number(amount),
      // date: day,
      geo: geo,
      date: date,

      tag: tag,
    };

    try {
      const { data } = await create({
        variables: {
          data: dataEx,
        },
      });
      console.log(data, "data");

      window.location.assign("/tag");
    } catch (error) {
      console.log(error);
    }
  };

  const { loading, error, data, refetch } = useQuery<{ getMyTags: DataTag }>(
    GET_MY_TAGS
  );
  console.log(data, "expenseeee");
  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  console.log(data?.getMyTags);

  return (
    <>
      <Layout>
        <Stack
          sx={{
            padding: "10px",
            width: "100%",
            height: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            direction: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <TextField
              id="outlined-basic"
              label="amount"
              variant="outlined"
              sx={{ width: "330px", margin: "10px 0" }}
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
            />
            <Box>
              <DtPicker
                onChange={setDate}
                showWeekend
                headerClass="custom-header"
                local="fa"
              />

              <CalendarMonthIcon sx={{ color: "gray" }} />
            </Box>

            <div>
              <FormControl sx={{ mt: 1, width: "336px" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Tag
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={tag}
                  label="Age"
                  onChange={(e: any) => setTag(e.target.value)}
                >
                  {data?.getMyTags.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "500px" },
              height: "300px",
              marginTop: { xs: "20px" },
              marginLeft: "-74px",
            }}
          >
            <MapContainer
              ref={mapRef}
              zoom={10}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <AddLocationIcon
                sx={{
                  color: "blue",
                  fontSize: "40px",
                  top: "calc(50% - 24px)",
                  left: "calc(50% - 24px)",
                  zIndex: "1000",
                  position: "absolute",
                }}
              />
            </MapContainer>
          </Box>

          <Box>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={addExpense}
            >
              Add
            </Button>
          </Box>
        </Stack>
      </Layout>
    </>
  );
}
