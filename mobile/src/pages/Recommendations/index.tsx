import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../services/api";

interface Params {
  userOptions: [0];
}

const Recommendations = () => {
  const route = useRoute();
  const routeParams = route.params as Params;

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.navigate("Home");
  }

  function handlePlaces() {
    navigation.navigate("Results");
  }

  setTimeout(() => {
    handlePlaces();
  }, 5000);

  return (
    <KeyboardAvoidingView
      style={styles.avoid}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchOp} onPress={handleNavigateBack}>
          <Icon name="x" size={20} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.main}>
          <Image
            style={styles.imageLogo}
            source={require("../../assets/loading.gif")}
          />
          <View>
            <Text style={styles.description}>
              Estamos procurando opções para sua próxima viagem ...
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  avoid: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  imageLogo: {
    width: 320,
    height: 320,
    marginTop: -90,
    marginLeft: 10,
  },

  title: {
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
    marginTop: 24,
    color: "white",
  },

  touchOp: {
    marginTop: 20,
  },

  icon: {
    color: "#FCA82F",
  },

  description: {
    color: "#6C6C80",
    fontSize: 20,
    marginTop: 14,
    fontFamily: "Ubuntu_700Bold",
    textAlign: "center",
  },

  questionContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 30,
    backgroundColor: "#FFF",
  },

  imageQuestion: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 9999,
    left: 60,
    top: 125,
  },

  imageQuestionAirplane: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 9999,
    left: 30,
    top: 95,
  },

  imageQuestionBeach: {
    width: 110,
    height: 110,
    position: "absolute",
    zIndex: 9999,
    left: 50,
    top: 120,
  },

  peopleAirplane: {
    width: 130,
    height: 130,
    position: "absolute",
    zIndex: 9999,
    left: 50,
    top: 105,
  },

  questionInsideContainer: {
    padding: 20,
    marginTop: 70,
  },

  titleQuestion: {
    fontSize: 18,
    lineHeight: 25,
    color: "#000",
    fontFamily: "Ubuntu_700Bold",
    marginBottom: 30,
  },

  button: {
    width: "48%",
    backgroundColor: "#FCA82F",
    height: 85,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    right: -10,
    overflow: "hidden",
    borderRadius: 10,
  },

  buttonText: {
    marginTop: -10,
    marginLeft: -10,
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Ubuntu_700Bold",
  },
});

export default Recommendations;
