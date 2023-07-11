import { Link } from 'react-router-dom'
import logoPath from '../images/logo.svg'

export default function Header({link, loggedIn, email, onLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Проект Место"/>
      {loggedIn && <p className='header__email'>{email}</p>}
      {loggedIn ? 
        <Link to='/signin' onClick={onLogout} className='header__link header__link_logoff' >
          Выход
        </Link> : 
        <Link to={link==='Вход' ? '/signin' : '/signup'} className='header__link'>
          {link}
        </Link>}
    </header>
  )
}