import React, { useState, useEffect } from "react";
import { ProgressBar, Colors } from "react-native-paper";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { RectButton } from "react-native-gesture-handler";

const Questions = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.avoid}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchOp} onPress={handleNavigateBack}>
          <Icon name="x" size={20} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.title}>Questão 1 / 4</Text>
        <ProgressBar
          style={{ marginTop: 5 }}
          progress={0.25}
          color={Colors.orange700}
        />

        <Image
          style={styles.imageQuestion}
          source={require("../../assets/viagem1.png")}
        />

        <View style={styles.mapContainer}>
          <View style={styles.questionInsideContainer}>
            <Text style={styles.titleQuestion}>
              Quantas viagens você costuma fazer por ano?
            </Text>

            <CheckBox
              title="Uma vez por ano"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
            />

            <CheckBox
              title="Até 3 vezes por ano"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
            />

            <CheckBox
              title="Mais de 6 vezes por ano"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
            />

            <CheckBox
              title="Uma vez a cada mês"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
            />
          </View>
          <RectButton style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Próxima</Text>
          </RectButton>
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
    backgroundColor: "#6066D0",
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
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
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

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default Questions;
