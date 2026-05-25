export interface Course {
  id: string;
  title: string;
  progress: number; // 0 to 100
  icon_name: string; // Lucide icon name string e.g. "Code2", "Layers"
  created_at: string;
}

export interface NavItemType {
  label: string;
  href: string;
  iconName: string;
}
