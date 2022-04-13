import { IconType } from 'react-icons/lib'
import { SvgIcon } from '@mui/material';
import './sidebar.css';

interface SideBarLinkProps {
  Icon: IconType;
}

const SideBarLink = ({ Icon }: SideBarLinkProps) => {
  return (
    <div className='link'>
      <SvgIcon color="action" sx={{
        color: '#ffffff',
        stroke: '#ffffff',
      }}>
        <Icon />
      </SvgIcon>
    </div>
  )
}

export default SideBarLink;