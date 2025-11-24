import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getReminders() {
  const response = await fetch(`${apiUrl}/reminders`);

  if (!response.ok) throw new Error("Failed to fetch reminders");

  return response.json();
}

export async function completeReminder(id: number, isCompleted: boolean) {
  const response = await fetch(`${apiUrl}/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !isCompleted }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update reminder with id ${id}`);
  }

  return response.json();
}

export async function createReminder(newReminder: InsertReminder) {
  const response = await fetch(`${apiUrl}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReminder),
  });

  if (!response.ok) {
    throw new Error("Failed create new reminder");
  }

  return response.json();
}

export async function getReminderById(id: number) {
  const response = await fetch(`${apiUrl}/reminders/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to get reminder with id ${id}`);
  }

  return response.json();
}

export async function updateOldReminder(
  id: number,
  newReminder: UpdateReminder
) {
  const response = await fetch(`${apiUrl}/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReminder),
  });

  if (!response.ok) {
    throw new Error(`Failed to update reminder with id ${id}`);
  }

  return response.json();
}

export async function deleteReminder(id: number) {
  const response = await fetch(`${apiUrl}/reminders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete reminder with id ${id}`);
  }

  return response.json();
}
