import React, { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
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
  Autocomplete,
  Popper,
  PopperProps,
  Theme,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { BsSearch } from 'react-icons/bs';

import { useQuery, useMutation, gql } from '@apollo/client';

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
   customers: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      email: string;
      __typename: string;
  }
}

interface CustomersQuery {
  customers: Array<
    {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      email: string;
    }
  >
}
interface FoundedUserData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

interface UpdateCustomerInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
}

type CustomersInputAttributes = Omit<CustomersAttributes['customers'], 'id' | '__typename'>;
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

const useStyles = makeStyles((theme?: Theme) =>
  createStyles({
    root: {
      zIndex: 5000,
      '& .MuiAutocomplete-listbox': {
        '& li': {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          paddingRight: '80px',
          paddingLeft: '40px',
        }
      }
    }
  })
)

const CustomerPopper = (props: PopperProps) => {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />
}

const CustomerForm: React.FC = () => {
  const { PLANS_QUERY, PAYMENT_GATEWAYS_QUERY, CUSTOMERS_QUERY } = queries;
  const { CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } = mutations;

  const { data: dataFromCustomers, error: errorCustomers } = useQuery<CustomersQuery>(CUSTOMERS_QUERY);
  const { data: dataFromPaymentGateway, loading: loadingPaymentGateway, error: errorPaymentGateway } = useQuery<PaymentGatewayAttributes>(PAYMENT_GATEWAYS_QUERY);
  const { data: dataFromPlans, loading: loadingPlans, error: errorPlans } = useQuery<PlansAttributes>(PLANS_QUERY);
  
  const plansData = dataFromPlans?.plans;
  const paymentGateways = dataFromPaymentGateway?.paymentGateway;

  const [formsData, setFormsData] = useState<DefaultInputData>(fields);
  
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState<boolean>(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
  
  const [updateSuccessSnackBarOpen, setUpdateSuccessSnackBarOpen] = useState<boolean>(false);
  const [updateErrorSnackBarOpen, setUpdateErrorSnackBarOpen] = useState<boolean>(false);

  const [customersList, setCustomersList] = useState<CustomersQuery['customers'] | undefined>();
  const [foundedUser, setFoundedUser] = useState<FoundedUserData>();

  useEffect(() => {
    if (dataFromCustomers !== undefined) {
      const listOfCustomers = dataFromCustomers.customers;
      setCustomersList(listOfCustomers);
    }
  }, [dataFromCustomers]);
  
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

  const [updateCustomer] = useMutation<
                  { updateCustomer: UpdateCustomerInput },
                  { input: UpdateCustomerInput }
  >(UPDATE_CUSTOMER, {
    update(cache, { data: updateCustomer }) {
      cache.modify({
        fields: {
          updateCustomer(customer: UpdateCustomerInput[]) {
            const updatedCustomer = cache.writeFragment({
              data: updateCustomer,
              fragment: gql`
                updateCustomer on Customer {
                  id
                  firstName
                  lastName
                  role
                  email
                }
              `
            });

            return [...customer, updatedCustomer]
          }
        }
      })
    },
    onCompleted: () => {
      console.log('update realizado com sucesso');
      setFormsData(fields);
      setUpdateSuccessSnackBarOpen(true);
      setFoundedUser(undefined);
    },
    onError: () => {
      setUpdateErrorSnackBarOpen(true);
    },
    variables: {
      input: {
        id: foundedUser?.id,
        firstName: foundedUser?.firstName,
        lastName: foundedUser?.lastName,
        role: foundedUser?.role,
        email: foundedUser?.email,
      }
    }
  })

  const [ deleteCustomer ] = useMutation<
                      { deleteCustomer: string },
                      { input: { id: string }}
  >(DELETE_CUSTOMER);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    if (foundedUser !== undefined) {
      setFoundedUser({
        ...foundedUser,
        [name]: value
      })
    } else {
      setFormsData({
        ...formsData,
        [name]: value
      })
    }

  };

  const snackBarHandClose = (e: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return ;
    }

    setSuccessSnackBarOpen(false);
    setErrorSnackBarOpen(false);
    setUpdateSuccessSnackBarOpen(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createCustomer && createCustomer();
  };

  const handleUpdateCustomer = (e: SyntheticEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    if (foundedUser !== undefined) {
      updateCustomer && updateCustomer({ variables: { 
        input: {
          id: foundedUser?.id,
          firstName: foundedUser?.firstName,
          lastName: foundedUser?.lastName,
          role: foundedUser?.role,
          email: foundedUser?.email,
        }
        }} );
    }
  };

  const handleDeleteCustomer = () => {
      if (foundedUser !== undefined) {
      deleteCustomer({
        variables: { input: { id: foundedUser?.id }}
      });
    }
  }

  const handleAutoCompleteChange = (e: SyntheticEvent, value: FoundedUserData | string) => {
    let userId: string = '';
    
    if (typeof value === 'object') {
      Object.entries(value).forEach(([key, value]) => {
        if (key === 'id') {
          userId = value;

          customersList?.map(customer => {
            if(customer.id === userId) {
              setFoundedUser({
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                role: customer.role,
                email: customer.email,
              });
            }
            return;
          })
        }
      });
    };
    if (typeof value === 'string') {
      console.log('entrou dentro do if de string');
    };
    return;
  }


  if (dataFromPlans && dataFromPaymentGateway && customersList) {

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

          <Snackbar open={updateSuccessSnackBarOpen} autoHideDuration={5000} onClose={snackBarHandClose}>
            <Alert onClose={snackBarHandClose} severity='success' sx={{ width: '100%' }}>
              User updated successfully!
            </Alert>
          </Snackbar>

         
          <form onSubmit={foundedUser !== undefined ? handleUpdateCustomer : handleSubmit} style={{ width: 1000, height: 600, marginTop: '20px' }}
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
                  <Autocomplete
                    id="search-input"
                    freeSolo
                    disableClearable
                    size="small"
                    openOnFocus={false}
                    options={customersList}
                    renderInput={(params) => 
                      <TextField 
                        name="search"
                        {...params} 
                        label="Search name or email"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                          startAdornment: (
                            <InputAdornment position="start">
                              <BsSearch />
                            </InputAdornment>
                          )
                        }}
                        />
                      }
                    getOptionLabel={(option) => `${option.firstName}`}
                    renderOption={(props, option) => (
                      <>
                        <li key={option.id} {...props}>
                          <p>{option.firstName}</p>
                          <p>{option.email}</p>
                        </li>
                      </>
                      )}
                    PopperComponent={CustomerPopper}
                    onChange={handleAutoCompleteChange}
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
                      value={foundedUser !== undefined ? foundedUser.firstName : formsData.firstName}
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
                      value={foundedUser !== undefined ? foundedUser.lastName : formsData.lastName}
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
                    value={foundedUser !== undefined ? foundedUser.role : formsData.role}
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
                    value={foundedUser !== undefined ? foundedUser.email : formsData.email}
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
  
            {
              foundedUser !== undefined ?
              (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '41.62rem',
                    height: '50px',
                    marginTop: '30px',
                    paddingRight: '12rem',
                  }}
                >
                  <Button 
                    variant="contained"
                    sx={{
                      backgroundColor: '#631bc7',
                      borderRadius: '30px',
                      height: '50px',
                      width: '200px',
                      textTransform: 'none',
                    }}
                    type="submit"
                  >
                    Save Details
                  </Button>

                  <Button
                    type="button"
                    onClick={handleDeleteCustomer}
                    variant="text"
                    sx={{
                      color: 'red',
                      height: '40px',
                      textTransform: 'none',
                      paddingTop: '15px',
                      marginTop: '-10px',
                      
                      '& span': {
                          borderBottom: '2px solid red',
                          borderRadius: '0px',
                          marginLeft: '7px',
                          width: '87%',
                      }
                    }}
                  >
                    Delete Customer
                  </Button>
                </Box>
              ) : 
              (
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
            )
            }
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
  
  return <p>loading...</p>;
}

export default CustomerForm;