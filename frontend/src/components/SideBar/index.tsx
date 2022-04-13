import { GrUpload, GrImage } from 'react-icons/gr';
import { FaCoins } from 'react-icons/fa';
import { BsGear, BsArrowRightCircle } from 'react-icons/bs';

import { Icon } from '@mui/material';
import { Box } from '@mui/system'


const SideBar: React.FC = () => {
  return (
      <Box 
        sx={{
          width: 70,
          height: '100vh',
          backgroundColor: '#2b1336',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Box
          sx={{
            height: 300,
            width: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Icon sx={{ 
            width: 45,
            height: 45,
            marginBottom: 8
            }}
          >
            <img src="logo2.png" alt="logo" style={{ width: 45, height: 45, marginBottom: 20 }}/>
          </Icon>
          <Icon sx={{
            height: 40,
            }}
          >
            <GrUpload />
          </Icon>
          <Icon sx={{
            height: 40
            }}
          >
            <GrImage />
          </Icon>
          <Icon sx={{
            height: 40
            }}
          >
            <FaCoins />
          </Icon>
          <Icon sx={{
            height: 40
            }}
          >
            <BsGear />
          </Icon>
        </Box>
        <Icon sx={{
            height: 40,
          }}
        >
            <BsArrowRightCircle />
        </Icon>
      </Box>
  )
}

export default SideBar;