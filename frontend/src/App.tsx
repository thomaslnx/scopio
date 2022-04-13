import { Box } from '@mui/material'

import SideBar from './components/SideBar';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
        <SideBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: '#f7f7f7',
          }}
        >
          <Header />
          <CustomerForm />
        </Box>
    </Box>
  );
}

export default App;
