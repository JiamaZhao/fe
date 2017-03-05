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

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageArray[i] = singleImageData;
    }
    return imageArray;
})(imageDatas);

var ImgFigure = React.createClass({
    render: function() {
        return ( 
            < figure className = "image-figure" >
              < img height="280" width="240" src = {this.props.data.imageURL} alt ={this.props.data.title}/>
              < figcaption >
                  <h2 className = "img-title">title</h2>
              </figcaption>
            < /figure>
        );
    }
});

var GallerByReactApp = React.createClass({
            render: function() {
                var controlllerUnits = [];
                var ImgFigures = [];

                imageDatas.forEach(function(value) {
                        ImgFigures.push( <ImgFigure data={value}/> );

                        });
                    return ( 
                    <section className = "stage" >
                        < section className = "img-sec"> {ImgFigures} </section> 
                        < nav className = "controller-nav"> {controlllerUnits} </nav>
                    </section >
                    );
                }
            }); React.render( < GallerByReactApp / >, document.getElementById('content')); // jshint ignore:line

        module.exports = GallerByReactApp;
