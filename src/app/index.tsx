import { SafeAreaView } from "react-native-safe-area-context";
import { ReminderItemList } from "../components/reminderItemList";
import { getReminders } from "../services/reminderService";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReminderItemList reminderItem={item} />}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 27,
              letterSpacing: 0.5,
              fontWeight: "bold",
              color: "#FF8C00",
              marginBottom: 12,
            }}
          >
            Reminders
          </Text>
        }
      />
      <Link href={"/createUpdateReminder"} asChild>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginTop: 10,
          }}
        >
          <Entypo name="circle-with-plus" size={24} color="#FF8C00" />
          <Text
            style={{
              fontWeight: "600",
              color: "#FF8C00",
              fontSize: 16,
            }}
          >
            New Reminder
          </Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
