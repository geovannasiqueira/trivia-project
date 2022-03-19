import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../component/HeaderGame';
import { clearScore } from '../redux/action';

class Feedback extends React.Component {
  playAgain = () => {
    const { history, finishGame } = this.props;
    history.push('/');
    finishGame();
  }
  render() {
    const { assertions, score, history } = this.props;
    const minAssertions = 3;
    return (
      <div className={ ( assertions < minAssertions ) ? 'fail' : 'success' }>
        <HeaderGame />
        <div className="flex flex-col items-center mt-40 text-5xl font-bold">
        <div className="feedback-text w-">
        <h3
          data-testid="feedback-text"
        >
          {(assertions < minAssertions) ? 'Could be better...' : 'Well Done!' }
        </h3>
        <h3 data-testid="feedback-total-score">{`Score: ${ score }`}</h3>
          <h3 data-testid="feedback-total-question">{ `Você acertou: ${ assertions }` }</h3>
        </div>
        <div className="flex items-center after:mt-20">
              <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
              className="btn mx-2"
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push( '/ranking' ) }
              className="btn"
            >
              Ranking
            </button>
          </div>
        </div>
      </div>

    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  } ).isRequired,
  finishGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  finishGame: () => dispatch(clearScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
