import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

export default function Background() {
  const [color, setColor] = useState<string[]>([]);

  useEffect(() => {
    const getColor = () => {
      let r = 0;
      let g = 0;
      let b = 0;
      let colorLevel = 0;
      while (colorLevel < 200) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        colorLevel = r * 0.299 + g * 0.587 + b * 0.114;
      }
      return `rgb(${r},${g},${b})`;
    };
    setColor([getColor(), getColor()]);
  }, []);

  return (
    <LinearGradient
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.3,
        flex: 1,
        width: "100vw",
        height: "100vh",
      }}
      colors={color}
    />
  );
}
