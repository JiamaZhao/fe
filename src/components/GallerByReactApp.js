'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

var imageDatas = require('../data/imageDatas.json');

//一个自执行函数来把json信息转化为路径
imageDatas = (function(imageArray) {
    for (var i = 0; i < imageArray.length; i++) {
        var singleImageData = imageArray[i];

        singleImageData.image = require('../images/' + singleImageData.fileName);

        imageArray[i] = singleImageData;
    }
    return imageArray;
})(imageDatas);


var GallerByReactApp = React.createClass({
    render: function() {
        return ( < section className = "stage" >
            < section className = "img-sec" >
            img - sec < /section> aa22< nav className = "controller-nav" >
            controller - nav < /nav> < /section >
        );
    }
});
React.render( < GallerByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GallerByReactApp;
