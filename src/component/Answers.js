import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  constructor() {
    super();
    this.state = {
      alternativesArr: [],
    };
    this.creatButtons = this.creatButtons.bind(this);
  }

  componentDidMount() {
    this.shuffle(this.creatButtons());
  }

  componentDidUpdate(prevProps) {
    const { index } = this.props;
    if (index && prevProps.index !== index) {
      this.shuffle(this.creatButtons());
    }
  }

    shuffle = (arr) => {
      const shuffleNumber = 0.5;
      const result = arr.sort(() => Math.random() - shuffleNumber);
      this.setState({
        alternativesArr: result,
      });
      return result;
    }

    creatButtons() {
      const { arrQuestions, index } = this.props;
      const alternatives = [
        { answer: arrQuestions[index].correct_answer,
          dataTestid: 'correct-answer',
          id: 'correct' },
      ];

      const wrongAlternatives = arrQuestions[index]
        .incorrect_answers
        .map((incorrect) => (
          { answer: incorrect,
            dataTestid: `wrong-answer-${index}`,
            id: 'incorrect' }
        ));

      wrongAlternatives.forEach((element) => {
        alternatives.push(element);
      });
      return alternatives;
    }

    render() {
      const { alternativesArr } = this.state;
      const { red, green, handleClickAnswer, disabledAnswer } = this.props;
      return (
        <div data-testid="answer-options" className="grid grid-cols-2">
          {alternativesArr.map(({ answer, dataTestid, id }) => (

            <button
              key={ answer }
              data-testid={ dataTestid }
              type="button"
              className={`btn-answers btn-wide btn m-2 ${ (id === 'correct' ? green : red) }`}
              id={ id }
              onClick={ handleClickAnswer }
              disabled={ disabledAnswer }
            >
              { answer }
            </button>
          ))}
        </div>
      );
    }
}

Answers.propTypes = {
  arrQuestions: PropTypes.arrayOf(String).isRequired,
  index: PropTypes.number.isRequired,
  handleClickAnswer: PropTypes.func.isRequired,
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  disabledAnswer: PropTypes.bool.isRequired,
};

export default Answers;
