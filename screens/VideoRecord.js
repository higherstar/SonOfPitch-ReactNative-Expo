import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Block, Button, Text, theme } from "galio-framework";
import delay from 'delay';
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");
const base_url = "https://sonofpitch.uptoworld.com/api/videos/";

class VideoRecord extends React.Component {

  static navigationOptions =
  {
    header: null,
  };

  state = {
    videos: [],
    counter: 0,
    hasPermission: null,
    type: Camera.Constants.Type.back,
    recording: false,
    processing: false,
    duration: 0
  };

  componentWillMount() {
      const { clientIndex } = this.props;

      if (clientIndex === 0){
          let videos = this.state.videos;
          videos.push(null);
          this.setState({
              counter: 1,
              videos
          });
      }
  }

  async registerRecord() {
      const { recording, duration } = this.state;

      if (recording) {
          await delay(1000);
          this.setState(state => ({
              ...state,
              duration: state.duration + 1
          }));
          this.registerRecord();
      }
  }

  async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING);
      this.setState({ hasPermission: status === 'granted' });
  }

  goToNext = () => {
      const { navigation, clientIndex, game } = this.props;
      let { counter } = this.state;

      counter += 1;
      if(counter === clientIndex)
          counter +=1;

      if (counter === game.players.length)
        navigation.navigate("AwardPlayer");
      else
        this.setState({ counter });
  };

  _startRecording = async () => {
      const { game, navigation, clientIndex } = this.props;
      let { counter, videos } = this.state;
      console.log('start recording:', counter);

      if (this.cam) {
          this.setState({ recording: true }, async () => {
              try {
                  this.registerRecord();
                  const { uri } = await this.cam.recordAsync();
                  this.setState({
                      recording: false,
                      duration: 0,
                      processing: true
                  });
                  console.log('Video URL:', uri);
                  videos.push(uri);

                  counter += 1;
                  if (counter === clientIndex){
                      counter += 1;
                      videos.push(null);
                  }

                  this.setState({
                      processing: false,
                      counter,
                      videos
                  }, () => {
                      if (counter === game.players.length) {
                          this.props.addVideo(videos);
                          navigation.navigate("AwardPlayer");
                      }
                  });
              } catch (e) {
                  console.error(e);
              }
          });
      }
  };

  _stopRecording = async () => {
      this.cam.stopRecording();
  };

  printChronometer = seconds => {
      const minutes = Math.floor(seconds / 60);
      const remseconds = seconds % 60;
      return '' + (minutes < 10 ? '0' : '') + minutes + ':' + (remseconds < 10 ? '0' : '') + remseconds;
  };

  render() {
    let { counter, hasPermission, recording, processing, duration } = this.state;
    let { game } = this.props;

    let button = (
        <TouchableOpacity onPress={this._startRecording}>
            <Block style={ styles.recordButton }>
                <Icon name="videocam" size={30} color={argonTheme.COLORS['WHITE']} />
            </Block>
        </TouchableOpacity>
    );

    if (recording) {
        button = (
            <TouchableOpacity onPress={this._stopRecording}>
                <Block style={ styles.stopButton }>
                    <Icon name="stop" size={30} color={argonTheme.COLORS['WHITE']} />
                    <Text>{this.printChronometer(duration)}</Text>
                </Block>
            </TouchableOpacity>
        )
    }

    if (processing) {
        button = (
            <Block>
                <ActivityIndicator animating size="large" />
            </Block>
        )
    }

    return (
      <Block flex style={styles.container}>
          {
              counter < game.players.length ? (
                  <Block flex space="between" style={styles.padded}>
                      <Block style={styles.header}>
                          <Text color="black" size={25}>
                              {game.players[counter].name}, It's your turn to pitch!
                          </Text>
                      </Block>
                      <Block style={styles.videoContainer}>
                          {
                              hasPermission && (
                                  <Camera ref={cam => (this.cam = cam)} style={styles.video} type={Camera.Constants.Type.back}>
                                      <Block style={styles.videoInnerContainer}>
                                          {
                                              button
                                          }
                                      </Block>
                                  </Camera>
                              )
                          }
                          {
                              !hasPermission && <Text>No access to camera</Text>
                          }
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
              ) : (
                  <ActivityIndicator animating size="large" />
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
    marginBottom: theme.SIZES.BASE *3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stopButton: {
      width: width / 7,
      height: width / 7,
      borderRadius: width / 7,
      backgroundColor: argonTheme.COLORS.ERROR,
      alignSelf: 'flex-end',
      marginBottom: theme.SIZES.BASE *3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }
});

function mapStateToProps(state) {
    const { game, clientIndex } = state;
    return {
        game,
        clientIndex
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addVideo: bindActionCreators(actions.addVideo, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoRecord);
