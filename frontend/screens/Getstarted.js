import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Getstarted extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block center>
          <Image source={Images.Logo} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.context}>
              <Text color="black" size={18}>
                The hilarious
              </Text>
              <Text color="black" size={18}>
                quick-pitch game
              </Text>
              <Text color="black" size={18}>
                for the self-proclaimed
              </Text>
              <Text color="black" size={18}>
                creative
              </Text>
            </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("Onboarding")}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  New Game
                </Button>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  Continue Game
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
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width / 2,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20
  },
  logo: {
    width: 250,
    height: 120,
    zIndex: 2,
    position: 'relative',
    marginTop: '30%'
  },
  context: {
    marginTop: 10
  }
});

export default Getstarted;
