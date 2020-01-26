import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

class Example extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <Block center style={styles.title}>
          <Text color="black" size={40}>
            Example
          </Text>
        </Block>
        <Block flex>
          <Block center style={styles.subtitle}>
            <Text color="black" size={30}>
              A restaurant for bald people...
            </Text>
          </Block>
          <Block center style={styles.header}>
            <Text color="#c9cccd" size={15}>
              Name
            </Text>
          </Block>
          <Block center style={styles.body}>
            <Text color="black" size={15}>
              Toupee or not to pay
            </Text>
          </Block>
          <Block center style={styles.header}>
            <Text color="#c9cccd" size={15}>
              Tagline
            </Text>
          </Block>
          <Block center style={styles.body}>
            <Text color="black" size={15}>
              We care for those without hair
            </Text>
          </Block>
          <Block center style={styles.header}>
            <Text color="#c9cccd" size={15}>
              Concept123
            </Text>
          </Block>
          <Block center style={styles.body}>
            <Text color="black" size={15}>
              Customers can pay for their meals with their toupee or by shaving their hair, which gets donated to a local charity for bald people who can not afford toupees.
            </Text>
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
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "bold"
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 15
  },
  header: {
    marginTop: 5,
    marginBottom: 5
  },
  body: {
    width: width - theme.SIZES.BASE * 6,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: '#c9cccd',
    padding: 15
  }
});

export default Example;
