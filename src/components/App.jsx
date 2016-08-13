class App extends React.Component {
  constructor () {
    super();
    this.getVideo();
    this.state = {
      // Initialize the state of App to keep track of all the videos in the video list and the current video in the player. Pass this state down as props to its children components. Continue to use the example data.
      currentVideo: window.fakeVideoData[0],
      videoList: window.fakeVideoData
    };
  }

  getVideo () {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/channels',
      type: 'GET',
      data: {
        q: 'cats',
        part: 'snippet',
        key: window.YOUTUBE_API_KEY
      },
      success: data => {
        console.log(data);
      },
      error: err => {
        console.error(err);
      }
    });

  }

  onClickHandler (video) {
    this.setState({
      currentVideo: video
    });
  }

  render () {
    return (
      <div>
        <Nav />
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
