import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../../constants/Theme";

class Instructions extends React.Component {
  render() {
    const { navigation, step } = this.props;

    return (
      <Block flex style={styles.container}>
        <Block center style={styles.title}>
          <Text color="black" size={40}>
            { step == 2 ? 'Example' : 'Instructions' }
          </Text>
        </Block>
        {
          step === 0 && (
            <Block flex>
              <Block style={styles.context}>
                <Text color="black" size={20}>
                  Every round one player or team is selected to be the 'client'. The first of the remaining players or teams to come up with their pitch, tps the 'Son of a pitch' button.
                </Text>
              </Block>
              <Block style={styles.context}>
                <Text color="black" size={20}>
                  Pressing this triggers a count down. The faster you can come up with a pitch, the more pressure you put on the other players.
                </Text>
              </Block>
            </Block>
          )
        }
        {
          step === 1 && (
            <Block flex>
              <Block style={styles.context}>
                <Text color="black" size={20}>
                  Once the countdown hits zero, players or teams will be randomly selected one by one to pitch the client.
                </Text>
              </Block>
              <Block style={styles.context}>
                <Text color="black" size={20}>
                  The winner is the person who the client decides has made the best pitch!
                </Text>
              </Block>
            </Block>
          )
        }
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

export default Instructions;
