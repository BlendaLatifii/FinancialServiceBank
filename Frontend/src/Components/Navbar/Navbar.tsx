
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import {SidebarData} from './NavbarData'
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button, Menu, Image ,Segment, Dropdown,Icon } from 'semantic-ui-react';
import { AuthService } from '../../services/AuthService';


function Navbar()  {
        const [sidebar, setSidebar] = useState(false);
        const showSidebar = () => setSidebar(!sidebar);
        const navigate = useNavigate();

        function LogOut(){
          AuthService.LogOut();
          navigate("/")
        }
        return (
          <>
          <div style={{ backgroundColor: '#008374' }}>
            <IconContext.Provider  value={{ color: '#fff' }} >
            { AuthService.LoggedInUser() != null && <div className='navbar'>
                <Link to='#' className='menu-bars'>
                  <FaIcons.FaBars className="ngjyra-sidebarhover" onClick={() => AuthService.GetUserRole() == "Admin" ? showSidebar() : null} />
                </Link>
                
                <Menu.Item position='left'>
                <Icon name="user"/>
                  <Dropdown style={{color:"white",float:"left"}} pointing='top left' text={AuthService.GetUserRole() ?? ""}>
                    <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/MyProfile`} text='My Profile' />
                      <Dropdown.Item onClick={()=> LogOut()} text='Logout' icon='power' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                
             
              </div>}
              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                  <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.className}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            
              
            </IconContext.Provider>
            </div>
          </>
        );
      }
      
      export default Navbar;