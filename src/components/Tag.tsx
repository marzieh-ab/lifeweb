import React, { useState, useEffect, ReactNode } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Stack,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, Link } from "react-router-dom";
import Layout from "./Layout";
import Chart from "./Chart";
import ChartModal from "./ChartModal";
type DataTag = {
  _id: number;
  color: string;
  expenseCount: number;
  name: string;
}[];

const CREATE_TAG = gql`
  mutation Create_tag($data: tagInfo!) {
    create_tag(data: $data) {
      msg
      status
    }
  }
`;

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

const DELETE_MY_TAG = gql`
  mutation Mutation($id: ID!) {
    delete_tag(_id: $id) {
      msg
      status
    }
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tag = () => {
  const [currentColor, setCurrentColor] = useState("#fff");
  const [dataTag, setDataTag] = useState<DataTag>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [tag] = useMutation(CREATE_TAG);
  const [deleteTagg] = useMutation(DELETE_MY_TAG);
  const { loading, error, data, refetch } = useQuery<{ getMyTags: DataTag }>(
    GET_MY_TAGS
  );
  const navigate = useNavigate();

  console.log(dataTag, "tagdataaa");

  useEffect(() => {
    if (data) {
      setDataTag(data.getMyTags);

      refetch();
    }
  }, [data]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;
  //   console.log(data);

  //   console.log(tags)

  // const hanselChange = (color) => {
  //   setCurrentColor(color.hex);
  // };

  const submitTag = async () => {
    try {
      const { data } = await tag({
        variables: {
          data: {
            color: currentColor,
            name: name,
          },
        },
      });
      window.location.assign("/tag");
    } catch (error) {
      console.log("ok");
    }
  };

  const deleteTag = async (id: number) => {
    console.log(id);

    try {
      const data = await deleteTagg({
        variables: {
          id: id,
        },
      });
      console.log(data);
      window.location.assign("/tag");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack
        direction={{ sm: "column", md: "row" }}
        sx={{
          // alignItems: "center",
          justifyContent: "space-between",
          width: { sm: "100%", md: "80%" },
          padding: "30px",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "20%" } }}>
          <Typography variant="h6" sx={{ taxtAling: "center", padding: "4px" }}>
            Create Tag
          </Typography>
          <Box sx={{ margin: "10px" }}>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              margin: "15px",
              width: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ fontSize: "10px", padding: "11px" }}
              onClick={submitTag}
            >
              submit
            </Button>

            <Button
              variant="contained"
              sx={{ fontSize: "10px", marginLeft: "5px", padding: "11px" }}
              onClick={handleOpen}
            >
              show chart
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ChartModal />
              </Box>
            </Modal>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            marginTop: { xs: "20px", md: "150px" },
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell align="right">ExpenseCount</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTag?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="right">{row.expenseCount}</TableCell>
                    <TableCell align="right" onClick={() => deleteTag(row._id)}>
                      <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Layout>
  );
};

export default Tag;
