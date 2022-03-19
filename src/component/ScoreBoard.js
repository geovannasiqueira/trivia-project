import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreBoard extends React.Component {
  state = {
    score: 0,
  }

  componentDidMount() {
    const { difficulty, timer } = this.props;
    console.log(difficulty, timer);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    const { difficulty, timer } = this.props;
    const { easy, medium, hard } = difficulty;
    let score = 0;
    const NUMBER_TEN = 10;
    const NUMBER_THREE = 3;
    // para perguntar: pq não tá indo na primeira vez
    // colocar o switch numa função separada
    if (difficulty && prevProps.difficulty.length !== difficulty.length) {
      switch (difficulty) {
      case easy:
        score = (1 * timer) + NUMBER_TEN;
        return score;
      case medium:
        score = (2 * timer) + NUMBER_TEN;
        return score;
      case hard:
        score = (NUMBER_THREE * timer) + NUMBER_TEN;
        return score;

      default:
        break;
      }
    }
  }

  render() {
    const { score } = this.state;

    return (
      <div>
        <span data-testid="header-score">{ score }</span>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  difficulty: state.arrQuestions.difficulty,
  timer: state.arrQuestions.timer,
});
ScoreBoard.propTypes = {
  difficulty: PropTypes.arrayOf().isRequired,
  timer: PropTypes.arrayOf().isRequired,
};
export default connect(mapStateToProps)(ScoreBoard);
