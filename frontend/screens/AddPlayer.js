import React from "react";
import {
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";

import argonTheme from "../constants/Theme";

const { height, width } = Dimensions.get("screen");

class AddPlayer extends React.Component {

  state = {
    players: [],
    isPlayable: false,
    time: 0
  };

  goToNext = () => {
    const { navigation } = this.props;

    navigation.navigate("ClientInfo");
  };

  addNewPlayer = () => {
    let { players, isPlayable } = this.state;
    players.push({
      name: ''
    });
    isPlayable = false;

    this.setState({
        players,
        isPlayable
    });
  };

  removePlayer = (index) => {
    let { players } = this.state;
    players.splice(index, 1);
    this.setState({
      players
    });
  };

  changePlayerName = (index, name) => {
    let { players } = this.state;

    players[index].name = name;

    this.setState({
        players
    });
  };

  renderPlayers = () => {
    let { players } = this.state;
    let res = [];

    for (let player of players) {
      res.push(
          <Block flex space="between" row>
            <Block width={(width - theme.SIZES.BASE * 6) * 0.8}>
              <TextInput
                style={styles.textInput}
                placeholder="Player"
                value={player.name}
                onChangeText={text => this.changePlayerName(players.indexOf(player), text)}
              />
            </Block>
            <Block style={styles.icon}>
              <TouchableOpacity onPress={() => this.removePlayer(players.indexOf(player))}>
                <Icon
                    name="remove-circle-outline"
                    color='red'
                />
              </TouchableOpacity>
            </Block>
          </Block>
      )
    }
    return res;
  };

  render() {
    const { navigation } = this.props;
    const { time } = this.state;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex space="between" style={styles.padded}>
          <Block center style={styles.title}>
            <Text center color="black" size={30}>
              Add players or teams
            </Text>
          </Block>
          <Block flex space="between">
            <ScrollView>
              <Block center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  {this.renderPlayers()}
                </KeyboardAvoidingView>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.PRIMARY}
                  onPress={this.addNewPlayer}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  Add New Player
                </Button>
              </Block>
            </ScrollView>
            <Block center>
              <Block row>
                  <Block style={styles.timerIcon}>
                    <Icon
                      name="timer"
                    />
                  </Block>
                  <Block center style={styles.timerSlider}>
                    <Text>Timer {Math.round(time * 60)} seconds</Text>
                    <Slider
                      style={styles.slider}
                      value={this.state.time}
                      onValueChange={value => this.setState({ time: value })}
                    />
                  </Block>
              </Block>
              <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={this.goToNext}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
              >
                Play!
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
    height: height
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "bold"
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 3,
    paddingVertical: theme.SIZES.BASE * 3,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  progressbar: {
    width: width - theme.SIZES.BASE * 6
  },
  button: {
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20
  },
  slider: {
    width: '100%'
  },
  timerIcon: {
    width: (width - theme.SIZES.BASE * 6) * 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerSlider: {
      width: (width - theme.SIZES.BASE * 6) * 0.8
  },
  icon: {
    width: (width - theme.SIZES.BASE * 6) * 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 44,
    borderColor: argonTheme.COLORS.BORDER,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5
  },
  context: {
    marginTop: 5
  }
});

export default AddPlayer;
