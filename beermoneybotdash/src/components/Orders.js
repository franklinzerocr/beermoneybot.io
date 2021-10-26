import React, {useEffect, useState } from "react";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const data = async () => {
//   let id  = sessionStorage.getItem("id")
//   const data = await fetch(`http://localhost:3001/users/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     }
//     });
//   let result = await data.json();
//   if(result.code > 0){
//     console.log(result)
//   }
//
// };


const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

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
