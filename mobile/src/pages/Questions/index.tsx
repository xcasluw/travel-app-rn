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
import api from "../../services/api";

interface Params {
  question_id: number;
}

interface Data {
  question: {
    id: number;
    image: string;
    image_url: string;
    title: string;
  };
  options: {
    id: number;
    id_question: number;
    value: string;
    description: string;
  }[];
}

const Questions = () => {
  const [data, setData] = useState<Data>({} as Data);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`questions/${routeParams.question_id}`).then((response) => {
      setData(response.data);
    });
  }, [selectedItems]);

  function handleSelectItem(id: number, idQuestion: number) {
    const idSum = idQuestion + 1;

    console.log(id, idQuestion);

    setSelectedItems([...selectedItems, id]);

    console.log(selectedItems);

    if (idSum > 4) {
      navigation.navigate("Recommendations", { userOptions: selectedItems });
    } else {
      navigation.navigate("Questions", { question_id: idSum });
    }
  }

  if (!data.question) {
    return null;
  }

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

        <Text style={styles.title}>Questão {data.question.id} / 4</Text>
        <ProgressBar
          style={{ marginTop: 5 }}
          progress={data.question.id / 4}
          color={Colors.orange700}
        />

        <Image
          style={
            data.question.image_url ===
            "http://192.168.0.109:3333/uploads/da26f4850bd6-aviao2.png"
              ? styles.imageQuestionAirplane
              : data.question.image_url ===
                "http://192.168.0.109:3333/uploads/4a81be06c361-praia1.png"
              ? styles.imageQuestionBeach
              : data.question.image_url ===
                "http://192.168.0.109:3333/uploads/bac73b1c93b5-aviaopessoa.png"
              ? styles.peopleAirplane
              : styles.imageQuestion
          }
          source={{
            uri: data.question.image_url,
          }}
        />

        <View style={styles.questionContainer}>
          <View style={styles.questionInsideContainer}>
            <Text style={styles.titleQuestion}>{data.question.title}</Text>

            {data.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.item}
                onPress={() => handleSelectItem(option.id, option.id_question)}
                activeOpacity={0.5}
              >
                <Text style={styles.description}>{option.description}</Text>
              </TouchableOpacity>
            ))}
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

  selectedItem: {
    borderColor: "#6066D0",
    borderWidth: 2,
  },

  item: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E9E9E9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    marginBottom: 10,
    textAlign: "center",
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
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
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

export default Questions;
