import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import logo from '../img/trivia.png';
import { pageGameThunk, setUser } from '../redux/action';
import './pages.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatarEmail: '',
      name: '',
    };
  }

handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({
    [name]: value,
  });
};

  verifyLogin = () => {
    // referência regex: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const { gravatarEmail, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const regexEmail = regex.test(gravatarEmail);
    const NUMBER_TWO = 2;
    if (name.length >= NUMBER_TWO && regexEmail) return false;
    return true;
  };

    handleClick = async (event) => {
      event.preventDefault();

      const { history, requestToken, user } = this.props;
      await requestToken();
      user(this.state);
      history.push('/game');
    };

    handleSettingsClick = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      return (
        <div className="login flex flex-col items-center">
          <div><img src={ logo } className="App-logo relative mt-40" alt="logo" /></div>
          <form className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text text-lg font-bold">Nome:</span>
            </label>
            <input
                data-testid="input-player-name"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
                className="input input-bordered w-full max-w-xs input-primary"
              />
            <label htmlFor="gravatarEmail" className="label">
              <span className="label-text text-lg font-bold">Email:</span>
            </label>
            <input
                data-testid="input-gravatar-email"
                type="email"
                name="gravatarEmail"
                placeholder="Digite seu email"
              onChange={ this.handleChange }
              className="input input-bordered w-96 max-w-xs input-primary"
            />
            <div>
              <button
                data-testid="btn-play"
                type="submit"
                disabled={ this.verifyLogin() }
                onClick={ this.handleClick }
                className="btn-play btn px-14 btn-primary my-3 mr-5"
              >
                Play
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ this.handleSettingsClick }
                className="btn  btn-config"
              >
                Configurações
              </button>
            </div>
          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(pageGameThunk()),
  user: (state) => dispatch(setUser(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  requestToken: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
