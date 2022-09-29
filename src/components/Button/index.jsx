import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: props.backgroundColor,}]}
      onPress={props.onPress}
    >
      <Text style={{ color: props.textColor, fontSize: 16, fontWeight: 'bold' }} >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
    borderRadius: 4,
  },
});
