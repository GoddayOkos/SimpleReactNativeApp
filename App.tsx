import React, { useState } from "react";
import { WToast } from "react-native-smart-tip";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialList: string[] = [];

export default function App() {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState(initialList);

  const showToast = (message: string) => {
    const toastOpts = {
      data: message,
      textColor: "red",
      backgroundColor: "white",
      duration: WToast.duration.SHORT,
      position: WToast.position.BOTTOM,
    };
    WToast.show(toastOpts);
  };

  const addText = (text: string) => {
    if (text == "" || text.match(/^[\s]+/)) {
      showToast("Invalid input format!");
    } else if (textList.includes(text)) {
      showToast("This entry already exist!");
    } else {
      const newList = textList.slice();
      newList.unshift(text);
      setTextList(newList)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textAndButtonContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your text here"
          onChangeText={(input) => setText(input)}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity style={styles.button} onPress={() => addText(text)}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={textList}
          keyExtractor={(text) => textList.indexOf(text).toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10,
  },
  textAndButtonContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  list: {
    flex: 6,
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "tomato",
    padding: 10,
    alignItems: "center",
  },
  listItemSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#d8d4d4",
  },
});
