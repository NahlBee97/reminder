import {
  createReminder,
  deleteReminder,
  getReminderById,
  updateOldReminder,
} from "@/services/reminderService";
import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateUpdateReminder() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reminderId = parseInt(id);

  const [reminder, setReminder] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders", reminderId],
    queryFn: () => getReminderById(reminderId),
    enabled: !!reminderId,
  });

  useEffect(() => {
    if (data) {
      setReminder(data.reminder);
      setNotes(data.notes);
    }
  }, [data]);

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: () => {
      const newReminder: InsertReminder = {
        reminder,
        userId: 1,
      };

      if (notes) {
        newReminder.notes = notes;
      }

      return createReminder(newReminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: () => {
      const newReminder: UpdateReminder = {
        reminder,
        notes: notes ? notes : null,
      };

      return updateOldReminder(reminderId, newReminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: () => {
      return deleteReminder(reminderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
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
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Text
              style={{ color: "#0E7AFE" }}
              disabled={isPending || !reminder}
              onPress={() => (!!reminderId ? updateTask() : createTask())}
            >
              Done
            </Text>
          ),
        }}
      />
      <View style={styles.inputBox}>
        <TextInput
          placeholder="title"
          multiline
          value={reminder}
          onChangeText={setReminder}
        />
        <View style={styles.divider} />
        <TextInput
          placeholder="notes"
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </View>
      {!!reminderId && (
        <Pressable style={styles.inputBox} onPress={() => deleteTask()}>
          <Text
            style={{
              color: "red",
            }}
          >
            Delete
          </Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
  },
  inputBox: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
});
