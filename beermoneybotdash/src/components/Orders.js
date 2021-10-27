import React, {useEffect, useState } from "react";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let id = sessionStorage.getItem("id")

    fetch(`http://localhost:3001/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
       }).then(response => response.json())
       .then(res => {
            setData(res.data[0])
            console.log(res.data[0])
          })
       .catch(error=>{
           console.log("Error")
       })
}, [])

  return (
    <React.Fragment>
      <Title>Wallet</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>BTC</TableCell>
            <TableCell>USDT</TableCell>
            <TableCell>BUSD</TableCell>
            <TableCell>ETH</TableCell>
            <TableCell align="right">Beermoney</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            <TableRow key={data.ID}>
              <TableCell>{data.USDT}</TableCell>
              <TableCell>{data.BTC}</TableCell>
              <TableCell>{data.BUSD}</TableCell>
              <TableCell>{data.ETH}</TableCell>
              <TableCell align="right">{`$${data.BTC}`}</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
