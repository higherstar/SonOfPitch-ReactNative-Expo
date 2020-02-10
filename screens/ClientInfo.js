import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";

import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class ClientInfo extends React.Component {

  static navigationOptions =
  {
      header: null,
  };

  state = {
    clientIndex: this.props.clientIndex
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.clientIndex !== nextProps.clientIndex) {
      this.setState({
        clientIndex: nextProps.clientIndex
      });
    }
  }

  componentWillMount() {
    const { game } = this.props;
    this.props.newRound();
    if (game)
      this.props.getGame(game._id);
  }

  goToNext = () => {
    const { navigation } = this.props;
    navigation.navigate("ComeUpStart");
  };

  render() {
    const { game } = this.props;
    const { clientIndex } = this.state;

    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.context}>
            <Text color="black" size={30}>
              {game.players[clientIndex].name},
            </Text>
            <Text color="black" size={30}>
              It's your turn
            </Text>
            <Text color="black" size={30}>
              to be the client
            </Text>
          </Block>
          <Block center>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={this.goToNext}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              OK!
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 3,
    paddingVertical: theme.SIZES.BASE * 3,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20
  },
  context: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 200
  }
});

function mapStateToProps(state) {
  const { clientIndex, game } = state;

  return {
    clientIndex,
    game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newRound: bindActionCreators(actions.newRound, dispatch),
    getGame: bindActionCreators(actions.getGame, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
