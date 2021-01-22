import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({

}));

function OrdersTableRow({ order }) {

  const classes = useStyles();
  const STATUSES_COLORS = {
    '': '',
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          {order.id}
        </TableCell>
        <TableCell>
          {order.title}
        </TableCell>
        <TableCell>
          {order.status}
        </TableCell>
        <TableCell>
          <Box style={{ color: STATUSES_COLORS[order.status] }}>
            {order.status}
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );

}

export default OrdersTableRow;
