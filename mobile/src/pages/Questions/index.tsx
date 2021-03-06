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
  const [idSum, setIdSum] = useState<number>(1);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const routeParams = route.params as Params;

  useEffect(() => {
    setTimeout(() => {
      if (idSum <= 4) {
        api.get(`questions/${idSum}`).then((response) => {
          setData(response.data);
        });
      }
    }, 500);
  }, [idSum]);

  function handleSelectItem(id: number, idQuestion: number) {
    const alrearySelected = selectedItems.findIndex((item) => item === id);
    const idRoute = idQuestion + 1;
    if (alrearySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
      setIdSum(idRoute);
    }
  }

  if (idSum > 4) {
    navigation.navigate("Results", { userOptions: selectedItems });
  }

  function goStart() {
    navigation.navigate("Home");
  }

  if (!data.question) {
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text style={styles.backOffline}>Backend Offline</Text>
    //     <RectButton style={styles.buttonErr} onPress={goStart}>
    //       <Text style={styles.buttonTextErr}>Voltar</Text>
    //     </RectButton>
    //   </View>
    // );
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.avoid}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        style={styles.closeIcon}
        source={require("../../assets/close-icon-2.png")}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchOp} onPress={goStart}>
          <Icon name="x" size={35} style={styles.icon} />
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
            "http://192.168.0.109:3333/uploads/b3f2d639f6fd-aviao2.png"
              ? styles.imageQuestionAirplane
              : data.question.image_url ===
                "http://192.168.0.109:3333/uploads/53125381aec5-praia1.png"
              ? styles.imageQuestionBeach
              : data.question.image_url ===
                "http://192.168.0.109:3333/uploads/1a9c51a4dd84-aviaopessoa.png"
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
                style={[
                  styles.item,
                  selectedItems.includes(option.id) ? styles.selectedItem : {},
                ]}
                onPress={() => handleSelectItem(option.id, option.id_question)}
                activeOpacity={0.5}
              >
                <Text
                  style={[
                    styles.description,
                    selectedItems.includes(option.id)
                      ? styles.textSelectedItem
                      : {},
                  ]}
                >
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
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

  closeIcon: {
    position: "absolute",
    width: 80,
    height: 71,
    top: 20,
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

  description: {
    color: "#6C6C80",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    fontFamily: "Roboto_500Medium",
  },

  selectedItem: {
    borderColor: "#FCA82F",
    borderWidth: 2,
    backgroundColor: "#FCA82F",
  },

  textSelectedItem: {
    color: "#fff",
    fontFamily: "Roboto_500Medium",
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
    color: "#FFF",
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
    top: 142,
  },

  imageQuestionAirplane: {
    width: 200,
    height: 200,
    transform: [{ rotate: "-15deg" }],
    position: "absolute",
    zIndex: 9999,
    left: 30,
    top: 110,
  },

  imageQuestionBeach: {
    width: 110,
    height: 110,
    position: "absolute",
    zIndex: 9999,
    left: 50,
    top: 135,
  },

  peopleAirplane: {
    width: 130,
    height: 130,
    position: "absolute",
    zIndex: 9999,
    left: 50,
    top: 120,
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
    right: 187,
    overflow: "hidden",
    borderRadius: 10,
  },

  noButton: {
    display: "none",
  },

  buttonText: {
    marginTop: -10,
    marginLeft: -10,
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Ubuntu_700Bold",
  },

  backOffline: {
    fontSize: 30,
  },

  buttonErr: {
    width: "48%",
    backgroundColor: "#FCA82F",
    height: 50,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },

  buttonTextErr: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
  },
});

export default Questions;
