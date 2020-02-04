import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// screens
import GetStarted from "../screens/GetStarted";
import OnBoarding from "../screens/OnBoarding";
import ClientInfo from "../screens/ClientInfo";
import ComeUpStart from "../screens/ComeUpStart";
import ComeUpWaiting from "../screens/ComeUpWaiting";
import AddPlayer from "../screens/AddPlayer";
import AwardPlayer from "../screens/AwardPlayer";
import VideoRecord from "../screens/VideoRecord";
import VideoOverview from "../screens/VideoOverview";
import Scores from "../screens/Scores";

// drawer
import Menu from "./Menu";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createStackNavigator(
  {
    GetStarted: {
      screen: GetStarted,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    OnBoarding: {
      screen: OnBoarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    AddPlayer: {
        screen: AddPlayer,
        navigationOptions: {
            drawerLabel: () => {}
        }
    },
    ClientInfo: {
        screen: ClientInfo,
        navigationOptions: {
            drawerLabel: () => {}
        }
    },
    ComeUpStart: {
        screen: ComeUpStart,
        navigationOptions: {
            drawerLabel: () => {}
        }
    },
    ComeUpWaiting: {
      screen: ComeUpWaiting,
      navigationOptions: {
          drawerLabel: () => {}
      }
    },
    VideoRecord: {
      screen: VideoRecord,
      navigationOptions: {
          drawerLabel: () => {}
      }
    },
    AwardPlayer: {
      screen: AwardPlayer,
      navigationOptions: {
          drawerLabel: () => {}
      }
    },
    VideoOverview: {
      screen: VideoOverview,
      navigationOptions: {
          drawerLabel: () => {}
      }
    },
    Scores: {
      screen: Scores,
      navigationOptions: {
          drawerLabel: () => {}
      }
    },
  },
  {
    transitionConfig
  }
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
