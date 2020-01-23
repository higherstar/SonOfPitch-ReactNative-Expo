import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../../constants/Theme";

class Theaim extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <Block center style={styles.title}>
          <Text color="black" size={40}>
            The aim
          </Text>
        </Block>
        <Block flex>
          <Block style={styles.context}>
            <Text color="black" size={20}>
              To play you will need a minimum of 3 players or teams.
            </Text>
          </Block>
          <Block style={styles.context}>
            <Text color="black" size={20}>
              The aim of the game is to pitch hilarious creative concepts, their names and taglines.
            </Text>
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
  title: {
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "bold"
  },
  context: {
    marginBottom: 15
  }
});

export default Theaim;
