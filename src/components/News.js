import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general' // default category if not provided
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capFirstLetter(this.props.category)} - News24`;
  }

  capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews() {
    this.props.setProgress(10); // Start loading bar
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=d19de84c3b8a47e885d99629d7496b11&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30); // Mid-way progress
    let data = await fetch(url);
    this.props.setProgress(50); // Further progress
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
    this.props.setProgress(100); // Complete loading bar
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const { country, category, pageSize } = this.props;
    this.setState({ page: this.state.page + 1 }, async () => {
      const { page } = this.state;
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=d19de84c3b8a47e885d99629d7496b11&page=${page}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
        loading: false
      });
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center mt-5 pt-4">News - Top Headlines</h2> 
        <div className="container">
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
export default News;
