import React,{ useState } from 'react'
import logo from "../../assets/logo_.png"
import { List } from '@mui/material';
import {BsCart2} from "react-icons/bs"
import { HiOutlineMenu } from "react-icons/hi";
import { 
    Box,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon, 
    Icon
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import { Draw, Phone } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const [openMenu,setOpenMenu]=useState(false);
  const menuOptions = [
    
    {
      text :"Accueil",
      Icon :<HomeIcon/>

    },
    {
      text :"Fonctionnalités",
      Icon :<StarIcon/>

    },
    {
      text :"Contact",
      Icon :<PhoneRoundedIcon/>

    },
    {
      text :"A propos",
      Icon :<InfoIcon/>

    },
    {
      text :"Search",
      Icon :<SearchIcon/>

    },
  ]
  return (
    <nav>
      <div className='nav-logo-container'>
        <img src={logo} width="175" height="35" alt=""/>
      </div>
      <div className='navbar-links-container'>
        <a href=''>Accueil</a>
        <a href=''>Fonctionnalités</a>
        <a href=''>Contact</a>
        <a href=''>A propos</a>
        <a href=''>
        <SearchIcon className='navbar-search-icon' />
        </a>
        <button className='primary-button'>
          Connexion
        </button>
      </div>
      <div className='navbar-menu-container'>
  <HiOutlineMenu onClick={() => setOpenMenu(true)} /> 
</div>
<Drawer 
  open={openMenu} 
  onClose={() => setOpenMenu(false)} 
  anchor='right' 
  className='drawer'
>
  <Box 
    sx={{ width: 250 }} 
    role="presentation" 
    onClick={() => setOpenMenu(false)} 
    onKeyDown={() => setOpenMenu(false)}
  >
    <List>
      {menuOptions.map((item) => (
        <ListItem key={item.text} disablePadding className="list-item">
          <ListItemButton>
            <ListItemIcon sx={{ color: '#bc1823' }} className="icon">
              {item.Icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

    </nav>
  )
}

export default Navbar;