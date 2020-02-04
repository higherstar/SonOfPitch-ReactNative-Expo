import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class ComeUpWaiting extends React.Component {

  static navigationOptions =
  {
      header: null,
  };

  state = {
    progress: 0,
    timer: 0
  };

  componentDidMount() {
      let { progress, timer } = this.state;
      const { navigation, time } = this.props;
      timer = time;
      let _this = this;
      let interval = setInterval(() => {
          progress += 100 / time;
          timer -= 1;

          if (progress > 100){
              _this.setState({
                  progress: 0
              });
              navigation.navigate("VideoRecord");
              clearInterval(interval);
          } else {
              this.setState({
                  progress,
                  timer
              });
          }
      }, 1000)
  }

  render() {
    const barWidth = width - theme.SIZES.BASE * 6;
    let { progress, timer } = this.state;
    const { card } = this.props;


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
                {
                    card && (
                        <Text style={styles.context} color="black" size={25}>
                            {card}
                        </Text>
                    )
                }
            </Block>
            <Block center style={styles.bottom}>
                <Text style={styles.progressTitle} color="black" size={15}>
                    {timer} seconds remaining
                </Text>
                <ProgressBarAnimated
                    width={barWidth}
                    backgroundColorOnComplete={argonTheme.COLORS.SECONDARY}
                    value={progress}
                />
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
    bottom: {
        height: theme.SIZES.BASE * 6 + 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    progressTitle: {
      marginVertical: 20
    },
    context: {
        fontWeight: "700"
    },
    header: {
        marginTop: 50
    }
});

function mapStateToProps(state) {
    const { game, card } = state;
    return {
        time: game.time,
        card
    };
}

export default connect(mapStateToProps)(ComeUpWaiting);
