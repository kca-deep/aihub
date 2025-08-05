// 프로젝트 관리 시스템을 위한 타입 정의

export interface TechStack {
  id: string;
  name: string;
  description?: string;
  category: 'language' | 'framework' | 'database' | 'cloud' | 'tool' | 'ai';
  color?: string;
  icon?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  skills: string[];
}

export interface ProjectStatus {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  overview: string; // 상세 개요
  
  // 기술 스택
  techStack: TechStack[];
  
  // 팀 정보
  teamName: string;
  members: TeamMember[];
  leaderId: string;
  
  // 진행 상황
  progress: number; // 0-100
  status: ProjectStatus;
  
  // 기대 효과
  expectedImpact: {
    description: string;
    metrics: {
      label: string;
      value: string;
      unit?: string;
    }[];
  };
  
  // 메타데이터
  startDate: Date;
  endDate?: Date;
  lastUpdated: Date;
  createdAt: Date;
  createdBy: string;
  
  // 디스플레이 정보
  image?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  
  // 추가 정보
  budget?: number;
  resources: string[];
  risks: string[];
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    completedAt?: Date;
  }[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  overview: string;
  techStack: string[];
  teamName: string;
  memberNames: string[];
  memberRoles: string[];
  progress: number;
  statusId: string;
  expectedImpact: string;
  impactMetrics: {
    label: string;
    value: string;
    unit?: string;
  }[];
  startDate: string;
  endDate?: string;
  image?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  budget?: number;
  resources: string[];
  risks: string[];
}

// 미리 정의된 상태
export const PROJECT_STATUSES: ProjectStatus[] = [
  {
    id: 'planning',
    name: '기획',
    color: '#6B7280',
    description: '프로젝트 기획 및 설계 단계'
  },
  {
    id: 'development',
    name: '개발',
    color: '#3B82F6',
    description: '개발 진행 중'
  },
  {
    id: 'testing',
    name: '테스트',
    color: '#F59E0B',
    description: '테스트 및 검증 단계'
  },
  {
    id: 'deployment',
    name: '배포',
    color: '#8B5CF6',
    description: '배포 및 런칭 준비'
  },
  {
    id: 'completed',
    name: '완료',
    color: '#10B981',
    description: '프로젝트 완료'
  },
  {
    id: 'on-hold',
    name: '보류',
    color: '#EF4444',
    description: '일시 중단 또는 보류'
  }
];

// 미리 정의된 기술 스택
export const TECH_STACKS: TechStack[] = [
  // AI/ML
  { id: 'python', name: 'Python', category: 'language', color: '#3776AB' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', color: '#FF6F00' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', color: '#EE4C2C' },
  { id: 'scikit-learn', name: 'Scikit-learn', category: 'ai', color: '#F7931E' },
  { id: 'nltk', name: 'NLTK', category: 'ai', color: '#4CAF50' },
  { id: 'opencv', name: 'OpenCV', category: 'ai', color: '#5C3EE8' },
  { id: 'chatgpt-api', name: 'ChatGPT API', category: 'ai', color: '#10A37F' },
  
  // 웹 개발
  { id: 'react', name: 'React', category: 'framework', color: '#61DAFB' },
  { id: 'nextjs', name: 'Next.js', category: 'framework', color: '#000000' },
  { id: 'vue', name: 'Vue.js', category: 'framework', color: '#4FC08D' },
  { id: 'angular', name: 'Angular', category: 'framework', color: '#DD0031' },
  { id: 'typescript', name: 'TypeScript', category: 'language', color: '#3178C6' },
  { id: 'javascript', name: 'JavaScript', category: 'language', color: '#F7DF1E' },
  
  // 백엔드
  { id: 'nodejs', name: 'Node.js', category: 'framework', color: '#339933' },
  { id: 'fastapi', name: 'FastAPI', category: 'framework', color: '#009688' },
  { id: 'django', name: 'Django', category: 'framework', color: '#092E20' },
  { id: 'flask', name: 'Flask', category: 'framework', color: '#000000' },
  { id: 'express', name: 'Express.js', category: 'framework', color: '#000000' },
  
  // 데이터베이스
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', color: '#336791' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '#4479A1' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '#47A248' },
  { id: 'redis', name: 'Redis', category: 'database', color: '#DC382D' },
  
  // 클라우드 & 인프라
  { id: 'aws', name: 'AWS', category: 'cloud', color: '#FF9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', color: '#4285F4' },
  { id: 'azure', name: 'Azure', category: 'cloud', color: '#0078D4' },
  { id: 'docker', name: 'Docker', category: 'tool', color: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'tool', color: '#326CE5' },
  
  // 도구
  { id: 'git', name: 'Git', category: 'tool', color: '#F05032' },
  { id: 'github', name: 'GitHub', category: 'tool', color: '#181717' },
  { id: 'gitlab', name: 'GitLab', category: 'tool', color: '#FC6D26' },
  { id: 'jira', name: 'Jira', category: 'tool', color: '#0052CC' },
  { id: 'tableau', name: 'Tableau', category: 'tool', color: '#E97627' },
  { id: 'powerbi', name: 'Power BI', category: 'tool', color: '#F2C811' }
];

export interface ProjectManagementState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string[];
    techStack: string[];
    priority: string[];
    teamName: string;
  };
  sortBy: 'createdAt' | 'lastUpdated' | 'progress' | 'title';
  sortOrder: 'asc' | 'desc';
}