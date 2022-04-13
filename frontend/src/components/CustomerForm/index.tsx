import {
   Box, 
   Grid, 
   TextField, 
   Select,
  MenuItem, 
  Button, 
  Typography, 
  InputAdornment, 
  FormControl, 
  InputLabel
} from '@mui/material';
import { BsSearch } from 'react-icons/bs';

const CustomerForm: React.FC = () => {
  return (
    <Box
      sx={{
        width: '85vw',
        height: '559px',
        border: '1px solid',
        borderColor: '#ebebeb',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '1000px',
          height: '360px',
          paddingLeft: '30px',
          paddingTop: '30px',
        }}
      >
        <Typography variant="subtitle2" fontSize={16}>
          CUSTOMER MANAGMENT
        </Typography>
        <form action="" style={{ width: 1000, height: 600, marginTop: '20px' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid 
              container 
              direction="row"
              sx={{
                height: '360px'
              }}
            >
              <Grid item sm={8} sx={{ height: '20px' }}>
                <TextField 
                  id="search-input"
                  name="search"
                  label="Search name or email"
                  type="text"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsSearch />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '41.62rem',
                }}
              >
                <Grid item sm={8} sx={{ height: '20px' }} >
                  <TextField 
                    id="first-name"
                    name="first-name"
                    label="First Name"
                    type="text"
                    size="small"
                    style={{ width: '98%' }}
                  />
                </Grid>
                <Grid item sm={8} sx={{ display: 'flex', justifyContent: 'flex-end', height: '20px' }} >
                  <TextField 
                    id="last-name"
                    name="last-name"
                    label="Last Name"
                    type="text"
                    fullWidth
                    size="small"
                    sx={{ width: '98%' }}
                  />
                </Grid>
              </Box>
              
              <Grid item sm={8} sx={{ height: '20px' }} >
                <TextField 
                  id="role"
                  name="Role"
                  label="Role"
                  type="text"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item sm={8} sx={{ height: '20px' }} >
                <TextField 
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item sm={8} sx={{ height: '20px' }} >
                <FormControl fullWidth size="small">
                  <InputLabel>Subscription Plan</InputLabel>
                  <Select 
                    id="subscription-plan"
                    name="subscription-plan"
                    fullWidth
                    size="small"
                  >
                    <MenuItem>The Criative</MenuItem>
                    <MenuItem>Adventure</MenuItem>
                    <MenuItem>Super Star</MenuItem>
                    <MenuItem>Infinty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={8} sx={{ height: '20px' }} >
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Gateway</InputLabel>
                  <Select 
                    id="payment-gateway"
                    name="payment-gateway"
                    label="Payment Gateway"
                    fullWidth
                    size="small"
                  >
                    <MenuItem>VISA</MenuItem>
                    <MenuItem>Master Card</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Button 
            variant="contained"
            sx={{
              backgroundColor: '#631bc7',
              borderRadius: '30px',
              height: '50px',
              width: '200px',
              marginTop: '30px'
            }}
          >
            Add Customer
          </Button>
        </form>
      </Box>
    </Box>
    )
}

export default CustomerForm;