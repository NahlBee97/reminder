import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Reminder } from "@/types/reminderTypes";
import { useMutation } from "@tanstack/react-query";
import { completeReminder } from "@/services/reminderService";
import { Link } from "expo-router";

export const ReminderItemList = ({
  reminderItem,
}: {
  reminderItem: Reminder;
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    reminderItem.completed
  );

  const { mutate: completeTask } = useMutation({
    mutationFn: (isReminderCompleted: boolean) =>
      completeReminder(reminderItem.id, isReminderCompleted),
    onSuccess: (data) => {
      setIsCompleted(data.completed);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return (
    <TouchableOpacity
      onPress={() => completeTask(isCompleted)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey",
        paddingBottom: 10,
      }}
    >
      <MaterialCommunityIcons
        name={isCompleted ? "circle-slice-8" : "checkbox-blank-circle-outline"}
        size={22}
        color={isCompleted ? "#FF8C00" : "black"}
        style={{ alignSelf: "flex-start" }}
      />
      <View style={{ gap: 5, flexShrink: 1 }}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {reminderItem.reminder}
        </Text>
        {!!reminderItem.notes && (
          <Text
            style={{
              fontSize: 12,
              color: "grey",
            }}
          >
            {reminderItem.notes}
          </Text>
        )}
      </View>
      <Link href={`/createUpdateReminder?id=${reminderItem.id}`} asChild>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color="#FF8C00"
          style={{
            marginLeft: "auto",
            alignSelf: "flex-start",
          }}
        />
      </Link>
    </TouchableOpacity>
  );
};
