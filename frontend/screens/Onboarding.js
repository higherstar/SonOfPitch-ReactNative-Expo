import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { Theaim, Instructions, Example } from "../components/Onboarding";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

class Onboarding extends React.Component {

  state = {
      step: 0,
      progress: 25
  }

  goToNext = () => {
    const { navigation } = this.props;
    let { step, progress } = this.state;

    if (step === 3)
      navigation.navigate("Home");
    else
      this.setState({
        step: step + 1,
        progress: progress + 25
      });
  }

  render() {
    const barWidth = width - theme.SIZES.BASE * 6;
    const { navigation } = this.props;
    let { step, progress } = this.state;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex space="between" style={styles.padded}>
          { step === 0 && <Theaim /> }
          { (step === 1 || step === 2) && <Instructions step={step - 1} /> }
          { step === 3 && <Example /> }
          <Block center>
            <ProgressBarAnimated
              width={barWidth}
              backgroundColorOnComplete={argonTheme.COLORS.SECONDARY}
              value={progress}
            />
            { step === 0 && (
              <Button
                style={styles.button}
                color={argonTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate("Home")}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
              >
                Skip instructions
              </Button>
            )}
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={this.goToNext}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Next
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
  title: {
    marginTop: 30
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 3,
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
  logo: {
    width: 250,
    height: 120,
    zIndex: 2,
    position: 'relative',
    marginTop: '30%'
  },
  context: {
    marginTop: 5
  }
});

export default Onboarding;
