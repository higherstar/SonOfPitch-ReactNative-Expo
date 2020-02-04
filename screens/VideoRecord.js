import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");
const base_url = "http://192.168.1.130:8080/api/videos/";

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
    processing: false
  };

  componentWillMount() {
      const { clientIndex } = this.props;

      if (clientIndex === 0){
          let videos = this.state.videos;
          videos.push(null);
          this.setState({
              counter: 1,
              videos          });
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
                  const { uri, codec = "mp4" } = await this.cam.recordAsync();
                  this.setState({
                      recording: false,
                      processing: true
                  });
                  const type = `video/${codec}`;

                  const data = new FormData();
                  data.append("video", {
                      name: "mobile-video-upload",
                      game: game._id,
                      player: counter,
                      type,
                      uri
                  });

                  let video_response = await fetch(base_url, {
                      method: "post",
                      body: data
                  });
                  let video = await video_response.json();
                  videos.push(video._id);

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
      console.log('stop recording');
      this.cam.stopRecording();
  };

  render() {
    let { counter, hasPermission, recording, processing } = this.state;
    let { game } = this.props;

    let button = (
        <TouchableOpacity onPress={this._startRecording}>
            <Block style={ styles.recordButton } />
        </TouchableOpacity>
    );

    if (recording) {
        button = (
            <TouchableOpacity onPress={this._stopRecording}>
                <Block style={ styles.stopButton } />
            </TouchableOpacity>
        )
    }

    if (processing) {
        button = (
            <Block>
                <ActivityIndicator animating size={18} />
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
                  <ActivityIndicator animating size={18} />
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
