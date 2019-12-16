import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Joke extends React.Component {
  render() {
    return (
      <div className="joke">
        <p className="setup">{this.props.joke.setup}</p>
        <p className="punchline">{this.props.joke.punchline}</p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: {
        setup: "",
        punchline: ""
      },
      isLoading: true
    };

    this.anotherOne = this.anotherOne.bind(this);
  }

  fetchJoke() {
    this.setState({ isLoading: true });
    fetch("https://official-joke-api.appspot.com/jokes/programming/random")
      .then(response => response.json())
      .then(data => this.setState({ joke: data[0], isLoading: false }));
  }

  componentDidMount() {
    this.fetchJoke();
  }

  anotherOne() {
    this.fetchJoke();
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading && <p>Loading...</p>}

        {!this.state.isLoading && (
          <>
            <Joke joke={this.state.joke} />
            <button className="btn" onClick={this.anotherOne}>
              another one
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${
                this.state.joke.setup
              } ${
                this.state.joke.punchline
              }&via=alioukahere&hashtags=alioukahere`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn tweet"
            >
              tweet
            </a>
          </>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
