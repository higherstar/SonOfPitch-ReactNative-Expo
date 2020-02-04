import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

class AwardPlayer extends React.Component {

  static navigationOptions =
  {
    header: null,
  };

  state = {
      winner: 0
  };

  componentWillMount() {
      if (this.props.clientIndex === 0)
          this.setState({
              winner: 1
          });
  }

  goToNext = () => {
      const { navigation } = this.props;

      navigation.navigate("ComeUpWaiting");
  };

  setWinner = (index) => {
      this.setState({
          winner: index
      })
  };

  award = () => {
      const { winner } = this.state;
      const { game, videos, navigation } = this.props;
      console.log(videos);

      game.players.forEach((player) => {
         let index = game.players.indexOf(player);
          player.videos.push(videos[index]);
         if (index === winner) player.countOfWin += 1;
      });

      this.props.updateGame(game);
      navigation.navigate("Scores");
  };

  renderPlayers = () => {
      const { winner } = this.state;
      const { game, videos, navigation } = this.props;
      let res = [];

      game.players.forEach(player => {
          let index = game.players.indexOf(player);
          if (videos[index] !== null)
              res.push(
                  <Block flex key={index} space="between" row>
                      <Block width={(width - theme.SIZES.BASE * 6) * 0.3} height={65} style={styles.playerRow}>
                          {
                              index === winner && (
                                  <Image source={Images.cupLogo} style={styles.cupLogo} />
                              )
                          }
                      </Block>
                      <Block width={(width - theme.SIZES.BASE * 6) * 0.4} height={65} style={styles.playerRow}>
                          <Text color="black" size={20} onPress={() => {
                              this.setWinner(index);
                          }}>
                              {player.name}
                          </Text>
                      </Block>
                      <Block width={(width - theme.SIZES.BASE * 6) * 0.3} height={65} style={styles.playerRow}>
                          <Text color="black" size={20} onPress={() => navigation.navigate('VideoOverview', {id: index})}>
                              view video
                          </Text>
                      </Block>
                  </Block>
              );
      });

      return res;
  };

  render() {
      console.log('Award Players Videos:', this.props.videos);
      console.log('Award Players Winner:', this.state.winner);
    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.header}>
            <Text color="black" size={25}>
              The best pitch award goes to...
            </Text>
          </Block>
          <ScrollView style={styles.content}>
              <Block center>
                  {this.renderPlayers()}
              </Block>
          </ScrollView>
          <Block center>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={this.award}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Award!
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
    playerRow: {
      display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
    fontWeight: "700"
  },
  header: {
    marginTop: 50
  },
  content: {
    paddingVertical: 50
  },
  cupLogo: {
    width: 65,
    height: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
    const { videos, game, clientIndex } = state;
    return {
        videos,
        game,
        clientIndex
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGame: bindActionCreators(actions.updateGame, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AwardPlayer);
