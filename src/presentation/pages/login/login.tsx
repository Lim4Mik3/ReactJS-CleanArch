import LoginHeader from '@/presentation/components/login-header/login-header';

import Spinner from '@/presentation/components/spinner/spinner';
import React from 'react'
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
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
