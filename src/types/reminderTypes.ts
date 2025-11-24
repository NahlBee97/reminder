export type Reminder = {
  id: number;
  reminder: string;
  notes: string | null;
  completed: boolean;
  user_id: number;
  created_at: string;
};

export type InsertReminder = {
  reminder: string;
  notes?: string | null;
  userId: number;
};

export type UpdateReminder = {
  reminder?: string;
  notes?: string | null;
};
