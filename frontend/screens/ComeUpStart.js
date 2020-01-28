import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class ComeUpStart extends React.Component {

  goToNext = () => {
      const { navigation } = this.props;

      navigation.navigate("ComeUpWaiting");
  };

  reloadType = () => {

  };

  render() {
    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.header}>
            <Text color="black" size={25}>
              Come up with a
            </Text>
            <Text color="black" size={25}>
              name, tagline
            </Text>
            <Text color="black" size={25}>
              and concept for...
            </Text>
          </Block>
          <Block>
            <Text style={styles.context} color="black" size={25}>
              A new type of
            </Text>
            <Text style={styles.context} color="black" size={25}>
              pasta for dogs.
            </Text>
          </Block>
          <Block center>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={this.reloadType}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Request a new brief
            </Button>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.PRIMARY}
              onPress={this.goToNext}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Son Of A Pitch!
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
    fontWeight: "700"
  },
  header: {
    marginTop: 50
  }
});

export default ComeUpStart;
