import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

class Scores extends React.Component {
    static navigationOptions =
    {
        header: null,
    };

  finish = () => {
      const { navigation } = this.props;

      navigation.navigate("GetStarted");
  };

  replay = () => {
      const { navigation } = this.props;

      navigation.navigate("ClientInfo");
  };

  renderPlayers = () => {
      const { game, navigation } = this.props;
      let winner = parseInt(JSON.stringify(navigation.getParam('winner')));
      let res = [];

      game.players.forEach(player => {
          let index = game.players.indexOf(player);
          res.push(
              <Block flex key={index} space="between" row>
                  <Block width={(width - theme.SIZES.BASE * 6) * 0.3} height={65} style={styles.playerRow}>
                      {
                          index === winner && (
                              <Image source={Images.cupLogo} style={styles.cupLogo} />
                          )
                      }
                  </Block>
                  <Block width={(width - theme.SIZES.BASE * 6) * 0.5} height={65} style={styles.playerRow}>
                      <Text color="black" size={20}>
                          {player.name}
                      </Text>
                  </Block>
                  <Block width={(width - theme.SIZES.BASE * 6) * 0.2} height={65} style={styles.playerRow}>
                      <Text color="black" size={20}>
                          {player.countOfWin}
                      </Text>
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
            <Text color="black" size={35}>
              The scores
            </Text>
            <Text color="black" size={35}>
              so far...
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
                onPress={this.replay}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Play another round!
            </Button>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.PRIMARY}
                onPress={this.finish}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
                Finish game
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
    const { game, videos } = state;
    return {
        game,
        videos
    };
}

export default connect(mapStateToProps)(Scores);
