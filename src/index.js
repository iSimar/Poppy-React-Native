import React, { Component, cloneElement } from 'react';
import {  Modal, Animated, TouchableWithoutFeedback, View, Text, StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native';


export class PoppyContainer extends Component {

  state = {
    marginLeftRight: new Animated.Value(0),
    marginTop: new Animated.Value(0)
  }

  createAnimation(a, b) {
    const duration = this.props.animationDuration ? this.props.animationDuration : 300;
    const toObj = {
      toValue: b,
      duration,
    };
    if (this.props.animation && this.props.animation === "spring") {
      return Animated.spring(a, toObj);
    }
    return Animated.timing(a, toObj);
  }

  spreadOut(px, py, animations = []) {
    animations = animations.map(arr => this.createAnimation(arr[0], arr[1]));
    const xOffset = this.props.xOffset ? this.props.xOffset : 8;
    Animated.parallel([
      this.createAnimation(this.state.marginLeftRight, -px-xOffset),
      this.createAnimation(this.state.marginTop, -py-1),
      ...animations
    ]).start(); 
  }
  

  render() {
    return (
      <Animated.View ref={c => this.self = c}
                     style={{
                       flex: 1,
                       marginTop: this.state.marginTop,
                       marginLeft: this.state.marginLeftRight,
                       marginRight: this.state.marginLeftRight
                     }}>
        <StatusBar barStyle="light-content"/>
        {this.props.children}
      </Animated.View>
    );
  }

}

export class Poppy extends Component {

  state = {
    marginBottom: new Animated.Value(0)
  }

  componentWillMount(){
    const style = {};
    if (this.props.styleTransition) {
      for (const styleType in this.props.styleTransition){
        if (this.props.style[styleType]) {
          style[styleType] = new Animated.Value(this.props.style[styleType]);
        } else {
          style[styleType] = new Animated.Value(0);
        }
      }
    }
    
    for (const styleType in this.props.style){
      if (!this.props.styleTransition || !this.props.styleTransition[styleType]) {
        style[styleType] = this.props.style[styleType];
      }
    }

    const headerStyle = {};
    if (this.props.headerStyleTransition) {
      for (const styleType in this.props.headerStyleTransition){
        if (this.props.headerStyle[styleType]) {
          headerStyle[styleType] = new Animated.Value(this.props.headerStyle[styleType]);
        } else {
          headerStyle[styleType] = new Animated.Value(0);
        }
      }
    }
    for (const styleType in this.props.headerStyle){
      if (!this.props.headerStyleTransition || !this.props.headerStyleTransition[styleType]) {
        headerStyle[styleType] = this.props.headerStyle[styleType];
      }
    }

    this.setState({
      style,
      headerStyle
    });
  }

  onPress() {
    this.open = !this.open;
    this.self.getNode().measure((a, b, width, height, px, py) => {
        animations = [];
        animations.push(
          [ this.state.marginBottom, this.open ? Dimensions.get('window').height - height : 0 ]
        );
        for (styleType in this.props.styleTransition) {
          animations.push(
            [ this.state.style[styleType], this.open ? this.props.styleTransition[styleType] : this.props.style[styleType] ]
          );
        }
        for (styleType in this.props.headerStyleTransition) {
          animations.push(
            [ this.state.headerStyle[styleType], this.open ? this.props.headerStyleTransition[styleType] : this.props.headerStyle[styleType] ]
          );
        }
        this.props.rootRef.spreadOut(px, py, animations);

    });
  }

  renderChildern() {
    return React.Children.toArray(this.props.children).map((child, index) => {
      return cloneElement(child);
    });
  }

  render() {
    return (
        <Animated.View ref={c => this.self = c}
                       style={[{
                          marginBottom: this.state.marginBottom
                       }, this.state.style]}>
            <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
              {
                this.props.headerImage ?
                  <View style={{ flex: 1 }}>
                    <ImageBackground style={[{ flex: 1}]}
                                  imageStyle={this.props.headerImageStyle}
                                  source={this.props.headerImage}>
                      <Animated.View style={[{ flex: 1 }, this.state.headerStyle]}>
                        {this.renderChildern()}
                      </Animated.View>
                    </ImageBackground>
                  </View>
                : this.renderChildern()
              }   
            </TouchableWithoutFeedback>
        </Animated.View>
    );
  }

}