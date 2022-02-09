import Logo from '@/presentation/components/logo/logo';
import Spinner from '@/presentation/components/spinner/spinner';
import React from 'react'
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder='Digite seu email' />
        <input type="password" name="password" placeholder='Digite sua senha' />

        <button type="submit">Entrar</button>

        <p className={Styles.createAccoun}>Criar conta</p>
        <div className={Styles.errorWrap}>
          <Spinner />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <footer className={Styles.footer}>

      </footer>
    </div>
  )
}

export default Login;
