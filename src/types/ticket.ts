interface MenuItem {
  icon: string;
  label: string;
  active: boolean;
  submenu?: string[];
}

interface ReportItem {
  label: string;
  active: boolean;
}

interface StatsCardProps {
  title: string;
  count: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface StatusBadgeProps {
  status: string;
}

interface Ticket {
  docketNo: string;
  task: string;
  source: string;
  mt: string;
  type: string;
  disposition: string;
  subDisposition: string;
  departments: string;
  assignTo: string;
  status: 'New' | 'Resolved' | 'Inprogress';
  person: string;
  sourceInfo: string;
}

interface StatsData {
  title: string;
  count: string;
  icon: string;
  color: string;
  bgColor: string;
}
export type { MenuItem, ReportItem, StatsCardProps, StatusBadgeProps, Ticket, StatsData };