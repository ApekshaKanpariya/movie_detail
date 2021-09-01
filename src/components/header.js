import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from "./header.module.css";
import Context from '../store/context';

const Header = () => {

  const ctx = useContext(Context);

  const isLoggedIn = ctx.isLoggedIn;

  const logoutHandler = () =>{
    ctx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>FLYERD</div>
      </Link>
      <nav>
        <ul>  
          {isLoggedIn && (
            <li>
              <Link to='/movie'>Movies</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/actor'>Actors</Link>
            </li>
          )}
          {isLoggedIn && ( 
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}                
        </ul>
      </nav>
    </header>
  );
};

export default Header;
