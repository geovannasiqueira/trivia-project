import React from 'react';
import Questions from '../component/Questions';
import HeaderGame from '../component/HeaderGame';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <HeaderGame />
        <Questions />
      </div>
    );
  }
}

export default Game;
