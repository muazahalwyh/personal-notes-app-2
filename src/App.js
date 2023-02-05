import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ArchivedPage from './pages/ArchivedPage';
import AddPage from './pages/AddPage';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import ToggleTheme from './components/ToggleTheme';
import { LocaleProvider } from './contexts/LocaleContext';
import ToggleLocale from './components/ToggleLocale';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
        localeContext:{
          locale: 'id',
          toggleLocale: () => {
            this.setState((prevState) => {
              return{
                localeContext: {
                  ...prevState.localeContext,
                  locale: prevState.localeContext.locale === 'id' ? 'en':'id'
                }
              }
            })
          } 
        },

        theme:localStorage.getItem('theme') || 'light',  
        toggleTheme: () => {
          this.setState((prevState) => {
            const newTheme = prevState.theme === 'light' ? 'dark' : 'light';

            localStorage.setItem('theme', newTheme);

            return{
              theme: newTheme
            };
          });
        }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);

    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
 
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout(){
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    
    putAccessToken('');
  }

render() {
  if(this.state.initializing){
    return null;
  }

  if (this.state.authedUser === null){
    return(
      <LocaleProvider value={this.state.localeContext}>
      <ThemeProvider value = {this.state}>
      <div className='app-container'>
          <header>
            <h1>
            {this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
            </h1>
            <ToggleLocale />
            <ToggleTheme />
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess}/>} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
      </div>
      </ThemeProvider>
      </LocaleProvider>
    )
  }
  
  return (
    <LocaleProvider value={this.state.localeContext}>
    <ThemeProvider value = {this.state}>
    <div className="app-container" >
      <header>
        <h1>
        <Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App' }</Link>
        </h1>
        <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
    </ThemeProvider>
    </LocaleProvider>
  );
}
}

export default App;
