import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { display } from "@mui/system";
import Layout from "./Layout";
type Expense = {
  amount: number;
  date: {
    year: number;
    month: number;
    day: number;
  };
  geo: {
    __typename: string;
    lat: number;
    lon: number;
  };
  tag: {
    __typename: string;
    _id: string;
    color: string;
    expenseCount: number;
    name: string;
  };
  __typename: string;
  _id: string;
}[];

const GET_ALL_EXPENSE = gql`
  query Query {
    getMyExpenses {
      _id
      amount
      date
      geo {
        lat
        lon
      }
      tag {
        _id
        color
        expenseCount
        name
      }
    }
  }
`;

const ChartModal = () => {
  const [dataTag, setDataTag] = useState<Expense>();

  const { loading, error, data, refetch } = useQuery<{
    getMyExpenses: Expense;
  }>(GET_ALL_EXPENSE);
  console.log(data, "charttttt");
  const exTag = data;

  useEffect(() => {
    if (exTag) {
      setDataTag(exTag.getMyExpenses);
    }
  }, [exTag]);

  const dataChart = dataTag?.map((item) => {
    return {
      tag: item.tag.name,
      amount: item.amount,
    };
  });

  const chareData = dataChart;

  // console.log(x)

  return (
    <>
   
        <Typography
          variant="h6"
          sx={{ display: "flex", justifyContent: "center", marginLeft: "20px" }}
        >
          Finace Chart
        </Typography>
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            pdding: "60px",
          }}
        >
          <LineChart
            width={700}
            height={300}
            data={dataChart}
            margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
          >
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="tag" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Box>
   
    </>
  );
};

export default ChartModal;
