import React from "react";
import {
  StyleSheet,
  Dimensions,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import VideoPlayer from 'expo-video-player';
// import VideoPlayer from '@expo/videoplayer';
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width, height } = Dimensions.get("screen");
const base_url = "https://sonofpitch.uptoworld.com/api/videos/";

class VideoOverview extends React.Component {

    static navigationOptions =
    {
        header: null,
    };

  goToShare = () => {

  };

  goToBack = () => {
    this.props.navigation.navigate("AwardPlayer");
  };

  openVideo = () => {
      let { navigation, videos } = this.props;
      let id = JSON.stringify(navigation.getParam('id'));
      Linking.openURL(base_url + videos[id]).catch(err =>
          console.error("An error occurred opening the link", err)
      );
  };

  render() {
    let { navigation } = this.props;
    let video = navigation.getParam('video');
    let name = navigation.getParam('name');

    return (
      <Block flex style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.header}>
            <Text color="black" size={25}>
                {name}'s pitch!
            </Text>
          </Block>
          <Block style={styles.videoContainer}>
            {
              video && (
                <VideoPlayer
                  videoProps={{
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: `${FileSystem.documentDirectory}SonOfPitch-Videos/demo_${video}.mov`
                    }
                  }}
                  style = {styles.video}
                  width = {width - theme.SIZES.BASE * 3}
                  height = {height - theme.SIZES.BASE * 4 - 150}
                />
              )
            }
          </Block>
          <Block center>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={this.goToShare}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Share
            </Button>
            <Button
                style={styles.button}
                color={argonTheme.COLORS.PRIMARY}
                onPress={this.goToBack}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              Back
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
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    paddingVertical: theme.SIZES.BASE * 1,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 10
  },
  context: {
    fontWeight: "700"
  },
  header: {
    marginTop: 30
  },
  videoContainer: {
    flex: 1,
    marginTop: 20
  },
  videoInnerContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1
  },
  video: {
      width: width - theme.SIZES.BASE * 6,
      height: '100%'
  },
  recordButton: {
    width: width / 7,
    height: width / 7,
    borderRadius: width / 7,
    backgroundColor: argonTheme.COLORS.SECONDARY,
    alignSelf: 'flex-end',
    marginBottom: theme.SIZES.BASE *3
  },
  stopButton: {
      width: width / 7,
      height: width / 7,
      borderRadius: width / 7,
      backgroundColor: argonTheme.COLORS.ERROR,
      alignSelf: 'flex-end',
      marginBottom: theme.SIZES.BASE *3
  }
});

function mapStateToProps(state) {
    const { game, videos } = state;
    return {
        game,
        videos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addVideo: bindActionCreators(actions.addVideo, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverview);
