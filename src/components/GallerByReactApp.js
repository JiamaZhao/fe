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


//获取区间内的一个随机值
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

var ImgFigure = React.createClass({
    render: function() {
        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        return ( < figure className = "image-figure"
            styles = { styleObj } >
            < img height = "280" width = "240" src = { this.props.data.imageURL } alt = { this.props.data.title } /> < figcaption >
             < h2 className = "img-title" > title < /h2 >
             < /figcaption > < /figure >
        );
    }
});

var GallerByReactApp = React.createClass({
            constant: {
                centerPos: {
                    left: 0,
                    right: 0
                },
                hPosRange: {
                    leftSecX: [0, 0],
                    rightSecX: [0, 0],
                    y: [0, 0]
                },
                vPosRange: {
                    x: [0, 0],
                    topY: [0, 0]
                }
            },

            //重新所有布局图片
            rearrange: function(centerIndex) {
                var imgsArrangeArr = this.state.imgsArrangeArr,
                    constant = this.constant,
                    centerPos = constant.centerPos,
                    hPosRange = constant.hPosRange,
                    vPosRange = constant.vPosRange,
                    hPosRangeLeftSecX = hPosRange.leftSecX,
                    hPosRangeRightSecx = hPosRange.rightSecX,
                    hPosRangeY = hPosRange.y,
                    vPosRangeTopY = vPosRange.topY,
                    vPosRangeX = vPosRange.x,
                    imgsArrangeTopArr = [],
                    topImgNum = Math.ceil((Math.random() * 2)), //取一个或者不取
                    topImgSpliceIndex = 0,
                    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
                    console.log(centerPos);
                    //首先居中的centerIndex图片
                    imgsArrangeCenterArr[0].pos = centerPos,

                    //取出要布局上侧的图片的状态信息
                    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
                    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

                    //布局位于上侧的图片
                    imgsArrangeTopArr.forEach(function(value, index) {
                    imgsArrangeTopArr[index].pos = {
                        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                    };
                });

                //布局两侧的图片信息
                for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
                    var hPosRangeLORX = null;
                    if (i < k) {
                        hPosRangeLORX = hPosRangeLeftSecX;
                    } else {
                        hPosRangeLORX = hPosRangeRightSecx;
                    }

                    imgsArrangeArr[i].pos = {
                        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                    };
                }

                if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                    imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
                }
                imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

                this.setState({
                    imgsArrangeArr: imgsArrangeArr
                });

            },

            getInitialState: function() {
                return {
                    imgsArrangeArr: [
                        // {
                        //     pos: {
                        //         left: '0',
                        //         top: '0'
                        //     }
                        // }
                    ]
                };
            },



            //组件加载以后为每张图片计算其位置的范围
            componentDidMount: function() {

                //首先拿到舞台的大小
                var stageDOM = React.findDOMNode(this.refs.stage);
                var stageW = stageDOM.scrollWidth,
                    stageH = stageDOM.scrollHeight,
                    halfStageW = Math.ceil(stageW / 2),
                    halfStageH = Math.ceil(stageH / 2);
                    console.log(stageDOM.offsetWidth);//0
                    console.log(stageH);//3025

                //拿到imgFigure大小
                var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
                    imgW = imgFigureDOM.scrollWidth,
                    imgH = imgFigureDOM.scrollHeight,
                    halfImgW = Math.ceil(imgW / 2),
                    halfImgH = Math.ceil(imgH / 2);
                    
                //中间图片的位置
                this.constant.centerPos = {
                    left: halfStageW - halfImgW,
                    top: halfStageH - halfImgH
                };

                //计算左右区域图片位置的取值范围
                this.constant.hPosRange.leftSecX[0] = -halfImgW;
                this.constant.hPosRange.leftSecX[1] = halfImgW - halfImgW * 3;
                this.constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
                this.constant.hPosRange.rightSecX[1] = stageW - halfImgW;
                this.constant.hPosRange.y[0] = -halfImgH;
                this.constant.hPosRange.y[1] = stageH - halfImgH;

                //计算上侧区域图片排布的取值范围
                this.constant.vPosRange.topY[0] = -halfImgH;
                this.constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
                this.constant.vPosRange.x[0] = halfStageW - imgW;
                this.constant.vPosRange.x[1] = halfImgW;

                this.rearrange(0);
            },
            render: function() {
                var controlllerUnits = [];
                var ImgFigures = [];

                imageDatas.forEach(function(value, index) {
                        if (!this.state.imgsArrangeArr[index]) {
                            this.state.imgsArrangeArr[index] = {
                                pos: {
                                    left: 0,
                                    top: 0
                                }
                            };
                        }
                        ImgFigures.push( < ImgFigure data = { value }
                            ref = { 'imgFigure' + index }
                            arrange = { this.state.imgsArrangeArr[index] }
                            />);
                        }.bind(this));
                    return ( < section className = "stage" ref = "stage" >
                                 < section className = "img-sec">{ ImgFigures }</section>
                                 < nav className = "controller-nav" >{controlllerUnits }</nav>
                             < /section >
                    );
                }
            });

        React.render( < GallerByReactApp / >,
            document.getElementById('content')
        ); // jshint ignore:line

        module.exports = GallerByReactApp;
