import React, { Component } from 'react';

export class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img 
            src={!imageUrl ? "https://th.bing.com/th/id/R.ed87496d5cd5ddcd2adbfb7b0536d5cd?rik=%2bJYHGS%2bBFDfZoA&pid=ImgRaw&r=0" : imageUrl} 
            style={{height: '180px'}} 
            className="card-img-top" 
            alt="..." 
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'>
              <small className='text-muted'>
                By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem;
