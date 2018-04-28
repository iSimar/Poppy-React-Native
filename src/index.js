import React, { Component } from 'react';
import {  Modal, Animated, TouchableWithoutFeedback, View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';


export class PoppyContainer extends Component {

  state = {
    marginLeftRight: new Animated.Value(0),
    marginTop: new Animated.Value(0)
  }

  spreadOut(px, py) {
    Animated.parallel([
      Animated.spring(
        this.state.marginLeftRight,
        {
          toValue: -px-2,
          duration: 300,
        }
      ),
      Animated.spring(
        this.state.marginTop,
        {
          toValue: -py-1,
          duration: 300,
        }
      )
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

  onPress() {
    this.open = !this.open;
    this.self.getNode().measure((a, b, width, height, px, py) => {
        this.props.rootRef.spreadOut(px, py);
        Animated.parallel([
          Animated.spring(
            this.state.marginBottom,
            {
              toValue: this.open ? Dimensions.get('window').height - height : 0,
              duration: 300,
            }
          )
        ]).start(); 
    });
  }

  render() {
    return (
        <Animated.View ref={c => this.self = c}
                       style={[{
                          marginBottom: this.state.marginBottom
                       }, this.props.style]}>
            <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
              <View>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
  }

}


const styles = StyleSheet.create({
});