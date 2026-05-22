export type IssueStatus = 'pending' | 'under_verification' | 'published' | 'escalated' | 'authority_responded' | 'in_progress' | 'resolved' | 'archived';
export type IssueCategory = 'infrastructure' | 'safety' | 'sanitation' | 'corruption' | 'environment' | 'public_services' | 'other';
export type IssueUrgency = 'low' | 'medium' | 'high' | 'urgent';

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

export const CATEGORIES: Record<IssueCategory, { label: string; color: string; icon: string }> = {
  infrastructure: { label: 'Infrastructure', color: '#f37320', icon: 'Road' },
  safety: { label: 'Safety', color: '#ef4444', icon: 'ShieldAlert' },
  sanitation: { label: 'Sanitation', color: '#22c55e', icon: 'Trash2' },
  corruption: { label: 'Corruption', color: '#f37320', icon: 'Scale' },
  environment: { label: 'Environment', color: '#146c17', icon: 'TreePine' },
  public_services: { label: 'Public Services', color: '#06b6d4', icon: 'Building2' },
  other: { label: 'Other', color: '#9f9f9f', icon: 'CircleDot' },
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

export const mockIssues: Issue[] = [
  {
    id: 'JVN-2026-0042',
    title: 'Large Potholes on Main Road Causing Accidents',
    description: 'Multiple deep potholes have developed on the main connecting road between Sector 4 and Sector 7. Two-wheeler riders are particularly at risk, especially during monsoon season when the potholes are filled with water and become invisible until too late.',
    category: 'infrastructure',
    status: 'in_progress',
    urgency: 'high',
    location: { address: 'Sector 4 Main Road', city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.8777 },
    images: ['/issue-pothole.jpg'],
    author: { name: 'Rahul M.', isAnonymous: false },
    createdAt: '2026-05-18T08:30:00Z',
    supporters: 342,
    comments: 28,
    timeline: [
      { id: 't1', status: 'pending', description: 'Issue reported by citizen', createdAt: '2026-05-18T08:30:00Z', author: 'Rahul M.' },
      { id: 't2', status: 'under_verification', description: 'Report verified by ground volunteer', createdAt: '2026-05-18T14:00:00Z', author: 'Volunteer Team' },
      { id: 't3', status: 'published', description: 'Issue published and visible to public', createdAt: '2026-05-18T16:00:00Z', author: 'Moderator' },
      { id: 't4', status: 'escalated', description: 'Escalated to Municipal Corporation', createdAt: '2026-05-19T10:00:00Z', author: 'System' },
      { id: 't5', status: 'in_progress', description: 'Repair work started by PWD', createdAt: '2026-05-21T09:00:00Z', author: 'PWD Office' },
    ],
  },
  {
    id: 'JVN-2026-0041',
    title: 'Streetlights Not Working for 3 Weeks',
    description: 'All 12 streetlights on LBS Marg between Kurla and Sion have been non-functional for three weeks. The area becomes extremely dark after sunset, creating safety concerns for residents, especially women returning from work.',
    category: 'infrastructure',
    status: 'resolved',
    urgency: 'high',
    location: { address: 'LBS Marg, Kurla', city: 'Mumbai', state: 'Maharashtra', lat: 19.065, lng: 72.889 },
    images: ['/issue-streetlight.jpg'],
    author: { name: 'Sneha K.', isAnonymous: false },
    createdAt: '2026-05-10T18:00:00Z',
    supporters: 567,
    comments: 45,
    timeline: [
      { id: 't1', status: 'pending', description: 'Issue reported', createdAt: '2026-05-10T18:00:00Z', author: 'Sneha K.' },
      { id: 't2', status: 'under_verification', description: 'Verified by local volunteer', createdAt: '2026-05-11T09:00:00Z', author: 'Volunteer' },
      { id: 't3', status: 'escalated', description: 'Escalated to Electricity Board', createdAt: '2026-05-12T10:00:00Z', author: 'System' },
      { id: 't4', status: 'in_progress', description: 'Repair crew dispatched', createdAt: '2026-05-15T08:00:00Z', author: 'Electricity Board' },
      { id: 't5', status: 'resolved', description: 'All streetlights repaired and operational', createdAt: '2026-05-20T19:00:00Z', author: 'Electricity Board' },
    ],
  },
  {
    id: 'JVN-2026-0040',
    title: 'Illegal Garbage Dumping Near School',
    description: 'Construction debris and household garbage is being dumped illegally on the vacant plot adjacent to City Pride School. The stench is unbearable and poses health risks to nearly 800 school children. Multiple complaints to local authorities have been ignored.',
    category: 'sanitation',
    status: 'escalated',
    urgency: 'urgent',
    location: { address: 'Near City Pride School, Baner', city: 'Pune', state: 'Maharashtra', lat: 18.559, lng: 73.7868 },
    images: ['/issue-garbage.jpg'],
    author: { name: 'Anonymous', isAnonymous: true },
    createdAt: '2026-05-15T06:00:00Z',
    supporters: 892,
    comments: 67,
    timeline: [
      { id: 't1', status: 'pending', description: 'Anonymous report submitted with photo evidence', createdAt: '2026-05-15T06:00:00Z', author: 'Anonymous' },
      { id: 't2', status: 'under_verification', description: 'Verified by 3 ground volunteers', createdAt: '2026-05-15T12:00:00Z', author: 'Volunteer Team' },
      { id: 't3', status: 'published', description: 'Published - High priority due to school proximity', createdAt: '2026-05-15T14:00:00Z', author: 'Moderator' },
      { id: 't4', status: 'escalated', description: 'Escalated to PMC Health Department + Media', createdAt: '2026-05-16T09:00:00Z', author: 'System' },
    ],
  },
  {
    id: 'JVN-2026-0039',
    title: 'Broken Water Pipeline Flooding Street',
    description: 'A major water supply pipeline burst on FC Road near Good Luck Chowk, causing significant water wastage and flooding the street. Traffic has been diverted and local businesses are affected.',
    category: 'infrastructure',
    status: 'authority_responded',
    urgency: 'urgent',
    location: { address: 'FC Road, Good Luck Chowk', city: 'Pune', state: 'Maharashtra', lat: 18.5167, lng: 73.8433 },
    images: ['/issue-water.jpg'],
    author: { name: 'Amit P.', isAnonymous: false },
    createdAt: '2026-05-20T07:00:00Z',
    supporters: 234,
    comments: 19,
    timeline: [
      { id: 't1', status: 'pending', description: 'Reported with video evidence', createdAt: '2026-05-20T07:00:00Z', author: 'Amit P.' },
      { id: 't2', status: 'under_verification', description: 'Verified within 2 hours', createdAt: '2026-05-20T09:00:00Z', author: 'Auto-Verified' },
      { id: 't3', status: 'escalated', description: 'Emergency escalation to Water Department', createdAt: '2026-05-20T09:30:00Z', author: 'System' },
      { id: 't4', status: 'authority_responded', description: 'Water Department acknowledged - team dispatched', createdAt: '2026-05-20T11:00:00Z', author: 'Water Dept' },
    ],
  },
  {
    id: 'JVN-2026-0038',
    title: 'Damaged Footpath with Exposed Rebars',
    description: 'The footpath along Marine Drive near Chowpatty has severely damaged concrete slabs with exposed steel reinforcement bars. This creates a serious tripping hazard for pedestrians, especially elderly persons and children.',
    category: 'safety',
    status: 'published',
    urgency: 'medium',
    location: { address: 'Marine Drive, Chowpatty', city: 'Mumbai', state: 'Maharashtra', lat: 18.9543, lng: 72.8115 },
    images: ['/issue-sidewalk.jpg'],
    author: { name: 'Priya S.', isAnonymous: false },
    createdAt: '2026-05-17T10:00:00Z',
    supporters: 178,
    comments: 23,
    timeline: [
      { id: 't1', status: 'pending', description: 'Issue reported', createdAt: '2026-05-17T10:00:00Z', author: 'Priya S.' },
      { id: 't2', status: 'under_verification', description: 'Photo verified by moderator', createdAt: '2026-05-17T14:00:00Z', author: 'Moderator' },
      { id: 't3', status: 'published', description: 'Published to public feed', createdAt: '2026-05-17T15:00:00Z', author: 'System' },
    ],
  },
  {
    id: 'JVN-2026-0037',
    title: 'Bribery Demand at RTO Office',
    description: 'Official at RTO Andheri demanding Rs. 500 "fast-track fee" for license renewal despite online appointment. When refused, the application was deliberately delayed with excuse of "system down".',
    category: 'corruption',
    status: 'under_verification',
    urgency: 'high',
    location: { address: 'RTO Office, Andheri West', city: 'Mumbai', state: 'Maharashtra', lat: 19.1364, lng: 72.8296 },
    images: [],
    author: { name: 'Anonymous', isAnonymous: true },
    createdAt: '2026-05-19T14:00:00Z',
    supporters: 1205,
    comments: 89,
    timeline: [
      { id: 't1', status: 'pending', description: 'Anonymous corruption report submitted', createdAt: '2026-05-19T14:00:00Z', author: 'Anonymous' },
      { id: 't2', status: 'under_verification', description: 'Under review by legal team', createdAt: '2026-05-19T16:00:00Z', author: 'Legal Team' },
    ],
  },
];

export const dashboardStats = {
  totalReports: 12453,
  resolvedPercentage: 68,
  avgResponseTime: 4.2,
  activeVolunteers: 2847,
  weeklyReports: [120, 145, 132, 168, 190, 210, 185, 220, 195, 240, 210, 235],
  weeklyResolved: [80, 95, 110, 125, 140, 155, 148, 170, 160, 185, 175, 190],
};

export const departmentScores = [
  { name: 'Municipal Corporation', score: 72, total: 100 },
  { name: 'Public Works Dept', score: 58, total: 100 },
  { name: 'Traffic Police', score: 64, total: 100 },
  { name: 'Electricity Board', score: 45, total: 100 },
  { name: 'Water Supply Dept', score: 38, total: 100 },
  { name: 'Sanitation Dept', score: 52, total: 100 },
];
