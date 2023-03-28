import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}