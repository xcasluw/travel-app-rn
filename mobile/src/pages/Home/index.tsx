import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToQuiz(id: number) {
    navigation.navigate("Questions", { question_id: id });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <Image
            style={styles.imageLogo}
            source={require("../../assets/logo-travel.png")}
          />
          <View>
            <Text style={styles.title}>Qual é o seu próximo destino?</Text>
            <Text style={styles.description}>
              Respondendo essas questões, podemos te ajudar a encontrar a
              próxima viagem dos seus sonhos
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RectButton
            style={styles.button}
            onPress={() => handleNavigateToQuiz(1)}
          >
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Começar Quiz</Text>
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
    backgroundColor: "#FFF",
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  imageLogo: {
    width: 320,
    height: 320,
    marginTop: -40,
    marginLeft: 10,
  },

  title: {
    color: "#322153",
    fontSize: 35,
    fontFamily: "Ubuntu_700Bold",
    // maxWidth: 260,
    marginTop: 20,
    justifyContent: "center",
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    // maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#FCA82F",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    marginLeft: -50,
  },
});

export default Home;
