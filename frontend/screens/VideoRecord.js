import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Camera } from 'expo-camera';
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class VideoRecord extends React.Component {

  state = {
    players: ["Tom Shrive", "Kirsty Endfield"],
    counter: 0
  };

  goToNext = () => {
      const { navigation } = this.props;

      navigation.navigate("ComeUpWaiting");
  };

  render() {
    let { players, counter } = this.state;

    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.header}>
            <Text color="black" size={25}>
                {players[counter]}, It's your turn to pitch!
            </Text>
          </Block>
          <Block>
              {/*<RNCamera*/}
                  {/*ref={ref => {*/}
                      {/*this.camera = ref;*/}
                  {/*}}*/}
                  {/*style={styles.video}*/}
                  {/*type={RNCamera.Constants.Type.back}*/}
                  {/*flashMode={RNCamera.Constants.FlashMode.on}*/}
                  {/*permissionDialogTitle={"Permission to use camera"}*/}
                  {/*permissionDialogMessage={*/}
                      {/*"We need your permission to use your camera phone"*/}
                  {/*}*/}
              {/*/>*/}
              <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}></Camera>
          </Block>
          <Block center>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={this.goToNext}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Skip to next player
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
  },
  video: {
      width: width - theme.SIZES.BASE * 6
  }
});

export default VideoRecord;
