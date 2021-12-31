import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { themeColor } from "../../../utils/style";

export default function SoundProgressBar({
  soundPercent,
  onMoveDistance,
  width = 80,
}: any) {
  const progressRef = useRef<any>(null);
  const [left, setLeft] = useState(soundPercent);

  function onTouchMove(e: any) {
    const start = Number(progressRef.current.offsetLeft);
    const end = Number(e.nativeEvent.changedTouches[0].clientX);
    let dis = end - start;
    if (dis <= 0) {
      dis = 0;
    }
    if (dis >= width) {
      dis = width;
    }
    setLeft(dis);
    onMoveDistance && onMoveDistance((dis / width) * 100);
  }

  return (
    <View ref={progressRef} style={[styles.progressBarBox, { width }]}>
      <View style={[styles.progressBar]}>
        <View
          style={{
            width: left,
            height: "100%",
            backgroundColor: themeColor.primary,
          }}
        />
      </View>
      <View style={[styles.tounchBar, { left }]} onTouchMove={onTouchMove} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarBox: {
    position: "relative",
    alignItems: "center",
    height: 10,
    marginLeft: 10,
  },
  progressBar: {
    width: "100%",
    height: 4,
    marginTop: 2,
    backgroundColor: "#fff",
  },
  tounchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: themeColor.primary,
  },
});
