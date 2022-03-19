import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import logo from '../img/trivia.png';
import { setImage } from '../redux/action';

class HeaderGame extends React.Component {
  render() {
    const { userName, gravatarEmail, score, gravatarImage } = this.props;
    const HASH = md5(gravatarEmail).toString();
    const urlImage = `https://www.gravatar.com/avatar/${HASH}`;
    gravatarImage( urlImage );
    
    return (
      <div className="div-header flex justify-between align-center pt-3 px-2 justify-items-stretch">
        <div className="flex flex-col ">
        <img
          src={ urlImage }
          data-testid="header-profile-picture"
          alt="Imagem do jogador"
          className="rounded-full h-16 w-16"
          />
          <span
          data-testid="header-player-name"
          className="font-bold"
        >{ userName }</span>
        </div>
        <div><img src={ logo } className="w-56 relative ml-4" alt="logo" /></div>
        <div className="mt-4 mr-4">
          <div className="justify-self-center">
          <p
          data-testid="header-score"
        >{`SCORE: ${ score }`}</p>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  gravatarImage: ( url ) => dispatch( setImage( url ) )
});


HeaderGame.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarImage: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderGame);
