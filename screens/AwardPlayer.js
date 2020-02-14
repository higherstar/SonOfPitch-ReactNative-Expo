import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  BackHandler
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  setWinner = (index) => {
      this.setState({
          winner: index
      })
  };

  award = () => {
      const { winner } = this.state;
      let win_index = winner;
      const { game, videos, navigation } = this.props;

      game.players.forEach((player) => {
         let index = game.players.indexOf(player);
          player.videos.push(videos[index]);
         if (index === winner) {
             player.countOfWin += 1;
             win_index = index;
         }
      });

      this.props.updateGame(game);
      navigation.navigate("Scores", {winner: win_index});
  };

  renderPlayers = () => {
      const { winner } = this.state;
      const { game, videos, navigation, clientIndex } = this.props;
      let res = [];

      game.players.forEach(player => {
        let index = game.players.indexOf(player);
        if (index !== clientIndex)
          res.push(
            <Block flex key={index} space="between" row>
              <TouchableOpacity onPress={() => {this.setWinner(index);}}>
                <Block flex space="between" row width={(width - theme.SIZES.BASE * 6) * 0.7}>
                  <Block width={(width - theme.SIZES.BASE * 6) * 0.2} height={65} style={styles.playerRow}>
                    {
                      index === winner && (
                        <Image source={Images.cupLogo} style={styles.cupLogo} />
                      )
                    }
                    {
                      index !== winner && (
                        <View style={styles.emptyView} onPress={() => {this.setWinner(index);}} />
                      )
                    }
                  </Block>
                  <Block width={(width - theme.SIZES.BASE * 6) * 0.5} height={65} style={styles.playerRow}>
                    <Text color="black" size={20}>
                      {player.name}
                    </Text>
                  </Block>
                </Block>
              </TouchableOpacity>
              <Block height={65} style={styles.playerRow} width={(width - theme.SIZES.BASE * 6) * 0.3}>
                  {
                    videos && videos[index] && (
                      <Text color="black" size={15} onPress={() => navigation.navigate('VideoOverview', {video: videos[index], name: player.name})}>
                        view video
                      </Text>
                    )
                  }
                </Block>
            </Block>
          );
      });

      return res;
  };

  render() {
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
  emptyView: {
    width: (width - theme.SIZES.BASE * 6) * 0.3,
    height: 65
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
    width: 50,
    height: 50,
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
