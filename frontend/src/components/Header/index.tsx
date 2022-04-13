import { Box, Button } from '@mui/material';

import { IoIosArrowDown } from 'react-icons/io'

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        maxWidth: '100%',
        height: '80px',
        boxShadow: '10px 0 10px -1px #e4e4e4',
        paddingRight: '30px',
        backgroundColor: '#ffffff',
      }}
    >
      <Button 
        variant="outlined"
        sx={{
          width: '160px',
          height: '45px',
          borderRadius: '20px',
          border: 2,
          borderColor: '#3a0868',
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: 3,
          paddingLeft: 3,
          color: '#000000'
        }}
      >
        Hi User  
        <IoIosArrowDown />
      </Button>
    </Box>
  )
}

export default Header;