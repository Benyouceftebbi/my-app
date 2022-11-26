import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = (props) => {
  const { coordinate,longitude,latitude, onPress, isSelected ,icon} = props;
  return (
    <Marker coordinate={{latitude: coordinate.latitude, longitude:coordinate.longitude}} onPress={onPress} icon={icon} 
    >
     
    </Marker>
  );
};

export default CustomMarker;