import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";
import * as MailComposer from "expo-mail-composer";

interface Params {
  place_id: number;
}

interface Data {
  place: {
    id: number;
    image: string;
    image_url: string;
    title: string;
    description: string;
  };
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`places/${routeParams.place_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.navigate("Results");
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: ["email@email.com"],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=5511969398424&text=Tenho interesse em saber mais sobre viagens para ${data.place.title}`
    );
  }

  if (!data.place) {
    return (
      <View>
        <Text>Sem Itens</Text>
      </View>
    );
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
        <TouchableOpacity style={styles.touchOp} onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={35} style={styles.icon} />
        </TouchableOpacity>
        <View>
          <Image
            style={styles.pointImage}
            source={{ uri: data.place.image_url }}
          />
          <Text style={styles.title}>{data.place.title}</Text>
        </View>
        <ScrollView>
          <Text style={styles.description}>{data.place.description}</Text>
        </ScrollView>
      </View>

      <Text style={styles.consulting}>Falar com um Consultor de Viagens</Text>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF">
            <Text style={styles.buttonText}> WhatsApp</Text>
          </FontAwesome>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF">
            <Text style={styles.buttonText}> E-mail</Text>
          </Icon>
        </RectButton>
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

  pointImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  consulting: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
    textAlign: "center",
    marginBottom: 5,
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },

  viewHeart: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },

  iconHeart: {
    color: "red",
  },

  iconRating: {
    color: "#FCA82F",
    paddingHorizontal: 1,
  },

  viewRating: {
    flexDirection: "row",
    position: "absolute",
    bottom: 65,
    left: 20,
  },

  itemTitle: {
    position: "absolute",
    top: 350,
    left: 20,
    fontFamily: "Ubuntu_700Bold",
    textAlign: "left",
    fontSize: 20,
  },

  item: {
    backgroundColor: "#dadada",
    borderWidth: 2,
    borderColor: "#dfdfdf",
    borderRadius: 8,
    height: 500,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },

  itemsContainer: {
    flex: 12,
  },

  closeIcon: {
    position: "absolute",
    width: 80,
    height: 71,
    top: 20,
  },

  avoid: {
    flex: 1,
    backgroundColor: "#6066D0",
  },

  avoidLoading: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  imageLogo: {
    width: 320,
    height: 320,
    borderRadius: 20,
  },

  title: {
    backgroundColor: "#FCA82F",
    padding: 10,
    position: "absolute",
    top: 40,
    borderRadius: 10,
    right: 5,
    fontSize: 15,
    fontFamily: "Ubuntu_700Bold",
    color: "#eaeaea",
  },

  touchOp: {
    marginTop: 20,
  },

  icon: {
    color: "#FFF",
  },

  description: {
    color: "#fff",
    fontSize: 13,
    marginTop: 14,
    fontFamily: "Roboto_500Medium",
  },

  imageQuestion: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 9999,
    left: 60,
    top: 125,
  },

  button: {
    width: "48%",
    backgroundColor: "#FCA82F",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Detail;
