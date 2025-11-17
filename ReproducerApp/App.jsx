import { StyleSheet, View, Text } from "react-native";

const App = () => {
  return (
    <View style={{ marginTop: 100, backgroundColor: "#ccc" }}>
      <View style={{marginBottom: 50}}><Text>parent container width: 300</Text></View>
      {/* parent container contains padding */}
      <View><Text>paddingHorizontal 50 + left 50% + translateX: -50%</Text></View>
      <View style={{ ...styles.warp, ...styles.p30 }}>
        <View style={styles.child}>
          <Text>unexpected behavior</Text>
        </View>
      </View>
      {/* parent container doesn’t contain padding */}
      <View style={{ marginTop: 100}}><Text>paddingHorizontal 0 + left 50% + translateX: -50%</Text></View>
      <View style={{ ...styles.warp }}>
        <View style={styles.child}>
          <Text>expected behavior</Text>
        </View>
      </View>
      {/* parent container contains padding */}
      <View style={{ marginTop: 100}}><Text>paddingHorizontal 50 + left 150 + translateX: -50%</Text></View>
      <View style={{ ...styles.warp, ...styles.p30 }}>
        <View style={styles.child2}>
          <Text>expected behavior</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warp: {
    height: 100,
    width: 300,
    backgroundColor: "#ccc",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#f00",
    position: "relative",
  },
  child: {
    position: "absolute",
    left: '50%',
    width: 150,
    height: 40,
    textAlign: "center",
    backgroundColor: "red",
    transform: [{ translateX: '-50%' }],
  },
  child2: {
    position: "absolute",
    left: 150,
    width: 150,
    height: 40,
    textAlign: "center",
    backgroundColor: "#f00",
    transform: [{ translateX: '-50%' }],
  },
  p30: { paddingHorizontal: 50, boxSizing: "border-box" },
});

export default App;
