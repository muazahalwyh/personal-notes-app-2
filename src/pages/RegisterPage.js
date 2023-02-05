import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const {error} = await register(user);
    if (!error){
      navigate('/');
    }
  }
 
  return (
    <LocaleConsumer>
      { ({ locale }) => {
        return(
        <section className='register-page'>
          <h2>{locale === 'id' ? 'Isi Form Untuk Mendaftar Akun.' : 'Fill the form to register account.'}</h2>
          <RegisterInput register={onRegisterHandler} />
          <p>{locale === 'id' ? 'Sudah Punya Akun?' : 'Already have an account?'}
          <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link></p>
        </section>
        );
        }
      }
    </LocaleConsumer>
  )
}

RegisterPage.propTypes = {
  user: PropTypes.func,
}
 
export default RegisterPage;
