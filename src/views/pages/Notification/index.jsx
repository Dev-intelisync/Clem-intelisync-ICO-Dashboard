import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from '@material-ui/core';
import Page from '@component/Page';
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmationDialog from '@component/ConfirmationDialog';
import DialogActions from '@material-ui/core/DialogActions';

const bankDetailsList = [
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
  {
    name: 'Lorem ipsum',
    desc:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
  },
];
export default function Notification() {
  return (
    <Page title="Bank Details">
      <Grid container spacing={4}>
        {bankDetailsList.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <NotificationList data={data} index={i} />
            </Grid>
          );
        })}
      </Grid>
    </Page>
  );
}
export function NotificationList({ data, index }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [dataToView, setDataToView] = useState([]);
  return (
    <>
      {' '}
      <NotificationCard
        data={data}
        index={index}
        setDetailsOpen={(value) => setDetailsOpen(value)}
        setDataToView={(dataView) => setDataToView(dataView)}
      />
      <Dialog
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={'sm'}
      >
        <DialogContent style={{ padding: 0 }}>
          <NotificationCard
            detailsOpen={detailsOpen}
            data={dataToView}
            setDetailsOpen={(dataView) => setDetailsOpen(dataView)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
export function NotificationCard({
  data,
  index,
  setDetailsOpen,
  setDataToView,
  detailsOpen,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const confirmationHandler = () => {
    setConfirmOpen(false);
  };
  return (
    <Box
      style={
        detailsOpen
          ? { padding: 25 }
          : index && index % 2 === 0
          ? { backgroundColor: '#d5ecf5', borderRadius: 10, padding: 25 }
          : { backgroundColor: '#f5d5da', borderRadius: 10, padding: 25 }
      }
    >
      {confirmOpen && (
        <ConfirmationDialog
          open={confirmOpen}
          handleClose={() => setConfirmOpen(false)}
          title={'title'}
          desc={'desc'}
          confirmationHandler={confirmationHandler}
        />
      )}

      <Box display="flex">
        <Box>
          <Typography variant="subtitle1">{data.name}</Typography>
        </Box>
        {!detailsOpen && (
          <Box style={{ flex: '1 0', textAlign: 'right' }}>
            <IconButton
              style={{ backgroundColor: 'white' }}
              onClick={() => {
                setDetailsOpen(true);
                setDataToView(data);
              }}
            >
              <FaRegEye size={14} />
            </IconButton>{' '}
            <IconButton
              style={{ backgroundColor: 'white' }}
              onClick={() => setConfirmOpen(true)}
            >
              <FaRegTrashAlt size={14} />
            </IconButton>{' '}
          </Box>
        )}
      </Box>
      {detailsOpen && (
        <Box>
          <img src="/images/login.png" width="100%" alt="" />
        </Box>
      )}

      <Box mt={1}>
        <Typography variant="subtitle2">{data.desc}</Typography>
      </Box>
      {detailsOpen && (
        <DialogActions>
          <Button variant="contained" onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      )}
    </Box>
  );
}
