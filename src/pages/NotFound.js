import React, { Component } from 'react';
import './pages.css'

class NotFound extends Component {
  render() {
    return (
      <div className='notFound flex justify-center'>
        <div className=' flex font-bold justify-between flex-col'>
        <h1 className='mt-10 text-white text-7xl'>{`Página não encontrada`}
        <span role="img" aria-label="Crying emoji"> 😭</span>
        </h1>
        <div className="flex justify-center mb-16">
        <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
              className="btn btn-answers btn-wide "
            >
              Play Again
            </button>
        </div>
      </div>
      </div>
    )
  }
}

export default NotFound;
