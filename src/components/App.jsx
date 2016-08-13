class App extends React.Component {
  constructor () {
    super();
    this.state = {
      // Initialize the state of App to keep track of all the videos in the video list and the current video in the player. Pass this state down as props to its children components. Continue to use the example data.
      videoList: window.exampleVideoData, 
      currentVideo: window.exampleVideoData[0]
    };
  }

  componentWillMount () {
    this.searchYouTube('cats', function(data) {
      this.setState({
        videoList: data,
        currentVideo: data[0]
      });
    }.bind(this));
  }

  searchYouTube (query, callback) {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      data: {
        key: window.YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        videoEmbeddable: true
      },
      success: data => {
        callback(data.items);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  searchHandler (event) {
    this.searchYouTube(event.target.value, function(data) {
      this.setState({
        videoList: data,
        currentVideo: data[0]
      });
    }.bind(this));
  }

  onClickHandler (video) {
    this.setState({
      currentVideo: video
    });
  }

  render () {
    return (
      <div>
        <Nav searchHandler={this.searchHandler.bind(this)}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo} />
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videoList} onClickHandler={this.onClickHandler.bind(this)}/>
        </div>
      </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
