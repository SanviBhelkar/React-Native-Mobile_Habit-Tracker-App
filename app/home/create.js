import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const colors = [
    "#FF0000", //red
    "#FFD700", //orange
    "#0000FF", //blue
    "#FF69B4", //hotpink
    "#5D76A9", //dark blue
    "#FF00FF", //magenta
    "#32CD32", //lime green
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: "daily",
        remainder: true,
      };

      const response = await axios.post(
        "http://192.168.11.69:3000/habits",
        habitDetails
      );

      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit created successfully", "Enjoy Practicing");
      }

      console.log("Habit added", response);
    } catch (error) {
      console.log("error while adding Habit", error);
    }
  }
  return (
    <View style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />

      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          backgroundColor: "#E1EBEE",
          borderRadius: 10,
        }}
        placeholder="Title"
      />
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            borderRadius: 6,
            flex: 1,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            borderRadius: 6,
            flex: 1,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>On theses days</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {days?.map((item, index) => (
          <Pressable
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#E0E0E0",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>
          Yes
        </Text>
      </View>

      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
