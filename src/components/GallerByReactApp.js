'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

var GallerByReactApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
          <span>hello world</span>
        </ReactTransitionGroup>
      </div>
    );
  }
});
React.render(<GallerByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GallerByReactApp;
