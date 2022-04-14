import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
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
  InputLabel,
  SelectChangeEvent,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { BsSearch } from 'react-icons/bs';

import { useQuery, useMutation } from '@apollo/client';

import queries from '../../queries/customers';
import mutations from '../../mutations/customers';
interface PlansAttributes {
  plans: Array<{
    id: string;
    name: string;
    billingPrice: number;
    price: number
  }>
}

interface CustomersAttributes {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

type CustomersInputAttributes = Omit<CustomersAttributes, 'id'>;

interface PaymentGatewayAttributes {
  paymentGateway: Array<{
    id: string;
    name: string;
  }>
}

interface DefaultInputData {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    subscriptionPlan: string;
    paymentGateway: string;
}

const fields = {
  firstName: '',
  lastName: '',
  role: '',
  email: '',
  subscriptionPlan: '',
  paymentGateway: '',
} ;

const CustomerForm: React.FC = () => {
  const { PLANS_QUERY, PAYMENT_GATEWAYS_QUERY } = queries;
  const { CREATE_CUSTOMER } = mutations;

  const { data: dataFromPaymentGateway, loading: loadingPaymentGateway, error: errorPaymentGateway } = useQuery<PaymentGatewayAttributes>(PAYMENT_GATEWAYS_QUERY);
  const { data: dataFromPlans, loading: loadingPlans, error: errorPlans } = useQuery<PlansAttributes>(PLANS_QUERY);
  
  const plansData = dataFromPlans?.plans;
  const paymentGateways = dataFromPaymentGateway?.paymentGateway;

  const [formsData, setFormsData] = useState<DefaultInputData>(fields);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState<boolean>(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
  
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const [createCustomer] = useMutation<
                    { createCustomer: CustomersAttributes },
                    { input: CustomersInputAttributes}
  >(CREATE_CUSTOMER, {
    onCompleted: () => {
      setFormsData(fields);
      setSuccessSnackBarOpen(true);
    },
    onError: () => {
      setErrorSnackBarOpen(true);
    },
    variables: {
    input: {
      firstName: formsData.firstName,
      lastName: formsData.lastName,
      role: formsData.role,
      email: formsData.email
    }
  }});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormsData({
      ...formsData,
      [name]: value
    })
  };

  const snackBarHandClose = (e: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return ;
    }

    setSuccessSnackBarOpen(false);
    setErrorSnackBarOpen(false);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createCustomer && createCustomer();
  };


  if (dataFromPlans && dataFromPaymentGateway) {

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
          
          <Snackbar open={successSnackBarOpen} autoHideDuration={5000} onClose={snackBarHandClose}>
            <Alert onClose={snackBarHandClose} severity='success' sx={{ width: '100%' }}>
              User saved successfully!
            </Alert>
          </Snackbar>

          <Snackbar open={errorSnackBarOpen} autoHideDuration={5000} onClose={snackBarHandClose}>
            <Alert onClose={snackBarHandClose} severity='error' sx={{ width: '100%' }}>
              An error happened!
            </Alert>
          </Snackbar>
         
          <form onSubmit={handleSubmit} style={{ width: 1000, height: 600, marginTop: '20px' }}
          >
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
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      type="text"
                      size="small"
                      style={{ width: '98%' }}
                      value={formsData.firstName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item sm={8} sx={{ display: 'flex', justifyContent: 'flex-end', height: '20px' }} >
                    <TextField 
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      type="text"
                      fullWidth
                      size="small"
                      sx={{ width: '98%' }}
                      value={formsData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Box>
                
                <Grid item sm={8} sx={{ height: '20px' }} >
                  <TextField 
                    id="role"
                    name="role"
                    label="Role"
                    type="text"
                    fullWidth
                    size="small"
                    value={formsData.role}
                    onChange={handleInputChange}
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
                    value={formsData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item sm={8} sx={{ height: '20px' }} >
                  <FormControl fullWidth size="small">
                    <InputLabel>Subscription Plan</InputLabel>
                    <Select 
                      id="subscriptionPlan"
                      name="subscriptionPlan"
                      fullWidth
                      size="small"
                      value={formsData.subscriptionPlan}
                      label="Subscription Plan"
                      onChange={handleInputChange}
                    >
                      {
                        plansData?.map(plan => (
                        <MenuItem
                          key={plan.id}
                          value={plan.name}
                        >
                          {plan.name}
                        </MenuItem>))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={8} sx={{ height: '20px' }} >
                  <FormControl fullWidth size="small">
                    <InputLabel>Payment Gateway</InputLabel>
                    <Select 
                      id="paymentGateway"
                      name="paymentGateway"
                      fullWidth
                      size="small"
                      value={formsData.paymentGateway}
                      onChange={handleInputChange}
                      label="Payment Gateway"
                    >
                      {
                        paymentGateways?.map(gateway => (
                        <MenuItem 
                          key={gateway.id}
                          value={gateway.name}
                        >
                          {gateway.name}
                        </MenuItem>))
                      }
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
              type="submit"
            >
              Add Customer
            </Button>
          </form>
        </Box>
      </Box>
      )
  }

  if (errorPlans) {
    return <p>Erro na busca dos planos!</p>;
  }

  if (errorPaymentGateway) {
    return <p>Erro na busca dos meios de pagamento!</p>;
  }

  // if (loadingPlans || loadingPaymentGateway) {
    return <p>loading...</p>;
  // }
   
}

export default CustomerForm;