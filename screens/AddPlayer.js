import React from "react";
import {
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  BackHandler
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { Icon } from 'react-native-elements';
import Slider from "react-native-slider";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";

import argonTheme from "../constants/Theme";

const { height, width } = Dimensions.get("screen");

class AddPlayer extends React.Component {

  static navigationOptions =
  {
      header: null,
  };

  state = {
    players: [],
    isPlayable: false,
    time: 0,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, isLoading, errorMsg } = this.props;

    if (isLoading && !nextProps.isLoading && !errorMsg)
      navigation.navigate("ClientInfo");
  }

  onSubmit = () => {
    const { createGame, uiLoading } = this.props;
    const { players, time } = this.state;

    if (players.length < 3)
      Alert.alert('Error', 'There should be 3 players at least');
    else {
      uiLoading();
      createGame(players, Math.round(time * 60));
    }
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

  validateForm = () => {
    const { players, time } = this.state;
    let isPlayable = true;

    if (time === 0 || players.length === 0)
      isPlayable = false;

    for (let player of players) {
      if (player.name === ""){
        isPlayable = false;
        return;
      }
    }

    this.setState({
        isPlayable
    });
  };

  changePlayerName = (index, name) => {
    let { players } = this.state;

    players[index].name = name;

    this.setState({
        players
    }, () => {
        this.validateForm();
    });
  };

  renderPlayers = () => {
    let { players } = this.state;
    let res = [];
    let index = 0;
    for (let player of players) {
      res.push(
          <Block flex key={index} space="between" row>
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
      );
      index++;
    }
    return res;
  };

  render() {
    const { time, isPlayable } = this.state;

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
                      onValueChange={value => {
                        this.setState({ time: value }, () => {
                            this.validateForm();
                        });
                      }}
                    />
                  </Block>
              </Block>
              <Button
                  style={styles.button}
                  color={isPlayable ? argonTheme.COLORS.SECONDARY : argonTheme.COLORS.MUTED}
                  onPress={this.onSubmit}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                  disabled={!isPlayable}
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

function mapStateToProps(state) {
  const { isLoading, isFailed, errorMsg } = state;

  return {
    isLoading,
    isFailed,
    errorMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiLoading: bindActionCreators(actions.uiLoading, dispatch),
    createGame: bindActionCreators(actions.createGame, dispatch)
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPlayer);
