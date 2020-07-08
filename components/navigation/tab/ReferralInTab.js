import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import {
  ReferralInPoliStack,
  ReferralInEmergencyStack,
  ReferralInMaternalNeonatalStack
} from "../stack";

const ReferralInTab = createMaterialTopTabNavigator(
  {
    Poli: {
      screen: ReferralInPoliStack
    },
    Emergency: {
      screen: ReferralInEmergencyStack
    },
    Maternal_Neonatal: {
      screen: ReferralInMaternalNeonatalStack
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#00818c",
      inactiveTintColor: "#aeaeae",
      style: {
        backgroundColor: "#ffffff"
      },
      indicatorStyle: {
        backgroundColor: "#00818c"
      }
    }
  }
);

ReferralInTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (
    navigation.state.routes[0].index > 0 ||
    navigation.state.routes[1].index > 0 ||
    navigation.state.routes[2].index > 0
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ReferralInTab;
