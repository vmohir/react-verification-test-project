export interface CheckListItem {
  id: string;
  priority: number;
  description: string;
  value?: 'Yes' | 'No' | null;
}
