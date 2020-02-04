import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from "../redux/actions";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class ComeUpStart extends React.Component {
  static navigationOptions =
  {
      header: null,
  };

  componentWillMount() {
    this.props.getCard();
  }

  goToNext = () => {
      const { navigation } = this.props;

      navigation.navigate("ComeUpWaiting");
  };

  reloadType = () => {
    this.props.getCard();
  };

  render() {
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

function mapStateToProps(state) {
  const { card } = state;
  return {
    card
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCard: bindActionCreators(actions.getCard, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComeUpStart);
