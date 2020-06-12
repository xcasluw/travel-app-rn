import React, { useEffect, useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { FontAwesome as FIcon } from "@expo/vector-icons";
import api from "../../services/api";

interface Place {
  id: number;
  image: string;
  title: string;
  description: string;
}
[];

const Results = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    api.get(`places`).then((response) => {
      setPlaces(response.data);
    });
  }, []);

  function goStart() {
    navigation.navigate("Home");
  }

  function handleDetail(id: number) {
    navigation.navigate("Detail", { place_id: id });
  }

  if (places.length < 1) {
    return (
      <KeyboardAvoidingView
        style={styles.avoidLoading}
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
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          Encontramos <Text style={{ color: "#FCA82F" }}>{places.length}</Text>{" "}
          opções para sua próxima viagem
        </Text>

        <View
          style={{
            marginTop: 5,
            marginLeft: -12,
            borderBottomColor: "#FFF",
            borderBottomWidth: 1,
            opacity: 0.2,
          }}
        />
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {places.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={styles.item}
              onPress={() => {
                handleDetail(item.id);
              }}
              activeOpacity={0.5}
            >
              <Image
                style={styles.imageLogo}
                source={{
                  uri: "http://192.168.0.109:3333/uploads/" + item.image,
                }}
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.viewRating}>
                <FIcon name="star" size={25} style={styles.iconRating} />
                <FIcon name="star" size={25} style={styles.iconRating} />
                <FIcon name="star" size={25} style={styles.iconRating} />
                <FIcon name="star" size={25} style={styles.iconRating} />
                <FIcon name="star" size={25} style={styles.iconRating} />
              </View>
              <View style={styles.viewHeart}>
                <Icon name="heart" size={40} style={styles.iconHeart} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

  main: {
    flex: 1,
    justifyContent: "center",
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
    marginLeft: -10,
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    color: "#eaeaea",
    textAlign: "center",
  },

  touchOp: {
    marginTop: 20,
  },

  icon: {
    color: "#FFF",
  },

  description: {
    color: "#6C6C80",
    fontSize: 20,
    marginTop: 14,
    fontFamily: "Ubuntu_700Bold",
    textAlign: "center",
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
});

export default Results;
