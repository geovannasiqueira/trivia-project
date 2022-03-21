import React, { Component } from 'react';
import './pages.css'

class NotFound extends Component {
  homePage = () => {
    const { history } = this.props;
    history.push('/');
  }

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
              onClick={ this.homePage }
              className="btn btn-answers btn-wide "
            >
              Home Page
            </button>
        </div>
      </div>
      </div>
    )
  }
}

export default NotFound;
