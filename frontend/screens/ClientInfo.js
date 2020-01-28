import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class ClientInfo extends React.Component {

  goToNext = () => {
    const { navigation } = this.props;

    navigation.navigate("ComeUpStart");
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.context}>
            <Text color="black" size={30}>
              Dave Cabero,
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

export default ClientInfo;
