export type IssueStatus =
  | 'pending'
  | 'under_verification'
  | 'published'
  | 'escalated'
  | 'authority_responded'
  | 'in_progress'
  | 'resolved'
  | 'archived';

export type IssueCategory =
  | 'infrastructure'
  | 'safety'
  | 'sanitation'
  | 'corruption'
  | 'environment'
  | 'public_services'
  | 'other';

export type IssueUrgency =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  urgency: IssueUrgency;

  location: {
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };

  images: string[];

  author: {
    name: string;
    avatar?: string;
    isAnonymous: boolean;
  };

  createdAt: string;
  supporters: number;
  comments: number;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  status: IssueStatus;
  description: string;
  createdAt: string;
  author: string;
}

export const CATEGORIES: Record<
  IssueCategory,
  {
    label: string;
    color: string;
    icon: string;
  }
> = {
  infrastructure: {
    label: 'Infrastructure',
    color: '#f37320',
    icon: 'Road',
  },

  safety: {
    label: 'Safety',
    color: '#ef4444',
    icon: 'ShieldAlert',
  },

  sanitation: {
    label: 'Sanitation',
    color: '#22c55e',
    icon: 'Trash2',
  },

  corruption: {
    label: 'Corruption',
    color: '#f37320',
    icon: 'Scale',
  },

  environment: {
    label: 'Environment',
    color: '#146c17',
    icon: 'TreePine',
  },

  public_services: {
    label: 'Public Services',
    color: '#06b6d4',
    icon: 'Building2',
  },

  other: {
    label: 'Other',
    color: '#9f9f9f',
    icon: 'CircleDot',
  },
};

export const STATUS_LABELS: Record<IssueStatus, string> = {
  pending: 'Pending Review',
  under_verification: 'Under Verification',
  published: 'Published',
  escalated: 'Escalated',
  authority_responded: 'Authority Responded',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  archived: 'Archived',
};

export const STATUS_COLORS: Record<IssueStatus, string> = {
  pending: '#f37320',
  under_verification: '#f37320',
  published: '#06b6d4',
  escalated: '#ef4444',
  authority_responded: '#06b6d4',
  in_progress: '#f37320',
  resolved: '#146c17',
  archived: '#9f9f9f',
};

/* =========================================================
   RESETTED DATA
========================================================= */

export const mockIssues: Issue[] = [];

/* =========================================================
   DASHBOARD STATS
========================================================= */

export const dashboardStats = {
  totalReports: 0,
  resolvedPercentage: 0,
  avgResponseTime: 0,
  activeVolunteers: 0,

  weeklyReports: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  weeklyResolved: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

/* =========================================================
   DEPARTMENT SCORES
========================================================= */

export const departmentScores = [
  { name: 'Municipal Corporation', score: 0, total: 100 },
  { name: 'Public Works Dept', score: 0, total: 100 },
  { name: 'Traffic Police', score: 0, total: 100 },
  { name: 'Electricity Board', score: 0, total: 100 },
  { name: 'Water Supply Dept', score: 0, total: 100 },
  { name: 'Sanitation Dept', score: 0, total: 100 },
];