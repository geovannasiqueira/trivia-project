import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { pageGameThunk, SetScoreBoard } from '../redux/action';
import requestQuestion from '../requestQuestion';
import Answers from './Answers';
import '../pages/pages.css'

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      arrQuestions: [],
      index: 0,
      disabledAnswer: false,
      visibleNext: 'hidden',
      alternativesArr: [],
      green: '',
      red: '',
      assertions: 0,
      countDown: 30,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.timer();
  }

  handleClickAnswer = ({ target }) => {
    this.setState({
      disabledAnswer: true,
      visibleNext: 'showButton btn btn-next px-14',
      red: 'red-border btn btn-wide m-2 btn-secondary',
      green: 'green-border btn btn-wide m-2 btn-secondary',
    });
    this.stopTimer();
    this.sunScore(target);
  }

  sunScore = (target) => {
    const { saveScoreGlobal } = this.props;
    const { countDown, index, arrQuestions } = this.state;
    console.log(arrQuestions);
    const NUMBER_TEN = 10;
    const NUMBER_THREE = 3;
    if (target.id === 'correct') {
      switch (arrQuestions[index].difficulty) {
      case 'easy':
        return saveScoreGlobal((1 * countDown) + NUMBER_TEN);
      case 'medium':
        return saveScoreGlobal((2 * countDown) + NUMBER_TEN);
      case 'hard':
        return saveScoreGlobal((NUMBER_THREE * countDown) + NUMBER_TEN);
      default:
        break;
      }
    }
  }

  handleClickNext = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      disabledAnswer: false,
      visibleNext: 'hidden',
      red: '',
      green: '',
    }));
    this.timer();
  }

  timer = () => {
    const maxTimerSecond = 30;
    const miliSecond = 1000;
    const timeUp = { target: { id: 'incorrect' } };
    let count = maxTimerSecond;
    this.test = setInterval(() => {
      this.setState({
        countDown: count,
      });
      if (count === 0) {
        this.stopTimer();
        this.handleClickAnswer(timeUp);
      }
      count -= 1;
    }, miliSecond);
  }

  stopTimer = () => {
    clearInterval(this.test);
  }

  async fetchQuestions() {
    const getToken = localStorage.getItem('token');
    let arrApiQuestions = await requestQuestion(getToken);
    const expired = 3;
    if (arrApiQuestions.response_code === expired) {
      const { requestToken } = this.props;
      await requestToken();
      const newGetToken = localStorage.getItem('token');
      arrApiQuestions = await requestQuestion(newGetToken);
    }
    this.setState({
      arrQuestions: arrApiQuestions.results,
    });
  }

  render() {
    const lastPage = 5;
    const { arrQuestions, index, visibleNext, countDown } = this.state;
    const { score, userName, gravatarImage } = this.props;
    if (arrQuestions.length === 0) {
      return <p>loading</p>;
    }
    if (index === lastPage) {
      localStorage.setItem('ranking', JSON.stringify([
        { name: userName, score, picture: gravatarImage },
      ]));
      return (<Redirect to="/feedback" />);
    }
    if (index === lastPage) return (<Redirect to="/feedback" />);
    return (
      <div className="flex items-center flex-col font-bold mt-16 h-96 w-1/2 ml-96 text-black">
        <div className="count">
          <p className="text-lg">{countDown}</p>
        </div>
        <div className=" div-questions font-bold  mt-10 h-full w-full text-black flex flex-col items-center p-10">
          <div><h2 className="pl-" data-testid="question-category">{arrQuestions[index].category}</h2></div>
          <div><h4 data-testid="question-text" className="my-2">{ arrQuestions[ index ].question }</h4></div>
          <div><Answers className="btn btn-wide m-2 btn-secondary" { ...this.state } handleClickAnswer={ this.handleClickAnswer } /></div>
          <button
            data-testid="btn-next"
            type="button"
            id="visibility"
            onClick={ this.handleClickNext }
            className={ visibleNext }
          >
            Next
          </button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  userName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  gravatarImage: state.gravatar.urlImage,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(pageGameThunk()),
  saveScoreGlobal: (number) => dispatch(SetScoreBoard(number)),
});

Questions.propTypes = {
  requestToken: PropTypes.func.isRequired,
  saveScoreGlobal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  } ).isRequired,
  score: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

/* Requisito 8 com a ajuda do Samuel turma XP-B
  Requisito 9 com ajuda do Asafe, Lily, Caio, Samuel, Higor todos da XP-B;
  Restante do projeto com ajuda do André Horman e Bruno Alves */
