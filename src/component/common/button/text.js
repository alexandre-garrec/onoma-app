import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { P } from "../../../styles/text";

const TextButton = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <P style={[{ textDecorationLine: "underline" }, style]}>{children}</P>
    </TouchableOpacity>
  );
};

export default TextButton;
