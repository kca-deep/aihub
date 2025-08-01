export interface AIProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: AICategory;
  tags: string[];
  thumbnail: string;
  images: string[];
  video?: string;
  tech: string[];
  team: TeamMember[];
  results: ProjectResult[];
  links: ProjectLink[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  status: 'Completed' | 'In Progress' | 'Planning';
}

export type AICategory = 
  | 'Computer Vision'
  | 'Natural Language Processing'
  | 'Machine Learning'
  | 'Deep Learning'
  | 'Robotics'
  | 'Healthcare AI'
  | 'Finance AI'
  | 'Creative AI'
  | 'Autonomous Systems'
  | 'AI Ethics';

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'demo' | 'github' | 'paper' | 'blog' | 'video';
}

// 샘플 AI 프로젝트 데이터
export const aiProjects: AIProject[] = [
  {
    id: '1',
    title: 'AI-Powered Medical Diagnosis System',
    description: '딥러닝을 활용한 의료 영상 분석 시스템으로 정확도 95% 달성',
    longDescription: '이 프로젝트는 X-ray, CT, MRI 영상을 분석하여 다양한 질병을 조기 진단하는 AI 시스템입니다. CNN과 Transformer 아키텍처를 결합하여 높은 정확도를 달성했으며, 실제 병원에서 임상 시험을 진행 중입니다.',
    category: 'Healthcare AI',
    tags: ['Computer Vision', 'Deep Learning', 'Medical AI', 'CNN', 'Transformer'],
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop'
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Docker', 'AWS'],
    team: [
      {
        name: '김의사',
        role: 'Lead AI Engineer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/kim-doctor',
        github: 'https://github.com/kim-doctor'
      },
      {
        name: '박연구',
        role: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/park-researcher',
        github: 'https://github.com/park-researcher'
      }
    ],
    results: [
      {
        metric: '정확도',
        value: '95.2%',
        description: '테스트 데이터셋에서 달성한 정확도'
      },
      {
        metric: '처리 속도',
        value: '2.3초',
        description: '단일 영상 분석 시간'
      },
      {
        metric: '감지 가능 질병',
        value: '12종',
        description: '현재 진단 가능한 질병 수'
      }
    ],
    links: [
      {
        label: 'Live Demo',
        url: 'https://demo.example.com',
        type: 'demo'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example/medical-ai',
        type: 'github'
      },
      {
        label: 'Research Paper',
        url: 'https://arxiv.org/abs/example',
        type: 'paper'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
    featured: true,
    difficulty: 'Advanced',
    estimatedTime: '6개월',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Real-time Language Translation App',
    description: '실시간 음성 번역을 지원하는 모바일 애플리케이션',
    longDescription: '이 프로젝트는 실시간 음성 인식과 번역을 결합한 모바일 애플리케이션입니다. 사용자가 말하는 내용을 실시간으로 인식하고, 50개 언어로 즉시 번역해주는 기능을 제공합니다.',
    category: 'Natural Language Processing',
    tags: ['NLP', 'Speech Recognition', 'Translation', 'Mobile App', 'Real-time'],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
    ],
    tech: ['React Native', 'TensorFlow Lite', 'Google Cloud Speech API', 'Firebase', 'Node.js'],
    team: [
      {
        name: '이번역',
        role: 'Mobile Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/lee-translator',
        github: 'https://github.com/lee-translator'
      }
    ],
    results: [
      {
        metric: '지원 언어',
        value: '50개',
        description: '번역 지원 언어 수'
      },
      {
        metric: '번역 정확도',
        value: '92.1%',
        description: '평균 번역 정확도'
      },
      {
        metric: '응답 시간',
        value: '0.8초',
        description: '평균 번역 응답 시간'
      }
    ],
    links: [
      {
        label: 'App Store',
        url: 'https://apps.apple.com/app/example',
        type: 'demo'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example/translation-app',
        type: 'github'
      }
    ],
    createdAt: '2024-02-10',
    updatedAt: '2024-03-15',
    featured: true,
    difficulty: 'Intermediate',
    estimatedTime: '4개월',
    status: 'Completed'
  },
  {
    id: '3',
    title: 'Autonomous Drone Navigation',
    description: 'AI 기반 자율주행 드론으로 복잡한 환경에서 안전한 비행',
    longDescription: '이 프로젝트는 컴퓨터 비전과 강화학습을 결합하여 복잡한 환경에서 자율적으로 비행할 수 있는 드론 시스템을 개발했습니다. 장애물 회피, 경로 계획, 안전 착륙 등의 기능을 포함합니다.',
    category: 'Robotics',
    tags: ['Computer Vision', 'Reinforcement Learning', 'Robotics', 'Autonomous Systems', 'Drone'],
    thumbnail: 'https://images.unsplash.com/photo-1579829366248-204fe8413fde?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413fde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
    ],
    tech: ['Python', 'ROS', 'OpenCV', 'TensorFlow', 'Gazebo', 'Pytorch'],
    team: [
      {
        name: '최드론',
        role: 'Robotics Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/choi-drone',
        github: 'https://github.com/choi-drone'
      },
      {
        name: '정비행',
        role: 'AI Researcher',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/jung-flight',
        github: 'https://github.com/jung-flight'
      }
    ],
    results: [
      {
        metric: '비행 시간',
        value: '45분',
        description: '최대 연속 비행 시간'
      },
      {
        metric: '장애물 회피율',
        value: '98.5%',
        description: '성공적인 장애물 회피율'
      },
      {
        metric: '정확도',
        value: '±2cm',
        description: '착륙 정확도'
      }
    ],
    links: [
      {
        label: 'Demo Video',
        url: 'https://youtube.com/watch?v=example',
        type: 'video'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example/autonomous-drone',
        type: 'github'
      }
    ],
    createdAt: '2024-01-20',
    updatedAt: '2024-03-10',
    featured: false,
    difficulty: 'Advanced',
    estimatedTime: '8개월',
    status: 'In Progress'
  },
  {
    id: '4',
    title: 'AI-Powered Stock Prediction',
    description: '머신러닝을 활용한 주식 가격 예측 시스템',
    longDescription: '이 프로젝트는 LSTM, GRU, Transformer 모델을 활용하여 주식 가격을 예측하는 시스템입니다. 기술적 지표, 뉴스 감정 분석, 시장 데이터를 종합하여 높은 정확도의 예측을 제공합니다.',
    category: 'Finance AI',
    tags: ['Machine Learning', 'LSTM', 'Time Series', 'Finance', 'Prediction'],
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop'
    ],
    tech: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
    team: [
      {
        name: '한투자',
        role: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/han-investment',
        github: 'https://github.com/han-investment'
      }
    ],
    results: [
      {
        metric: '예측 정확도',
        value: '78.3%',
        description: '1일 후 가격 예측 정확도'
      },
      {
        metric: '수익률',
        value: '+15.2%',
        description: '백테스팅 결과 수익률'
      },
      {
        metric: '분석 종목',
        value: '500개',
        description: '동시 분석 가능 종목 수'
      }
    ],
    links: [
      {
        label: 'Live Demo',
        url: 'https://demo.example.com/stock-prediction',
        type: 'demo'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example/stock-prediction',
        type: 'github'
      }
    ],
    createdAt: '2024-02-05',
    updatedAt: '2024-03-18',
    featured: false,
    difficulty: 'Intermediate',
    estimatedTime: '5개월',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'AI Art Generator',
    description: '텍스트 프롬프트를 기반으로 고품질 이미지를 생성하는 AI',
    longDescription: '이 프로젝트는 Stable Diffusion과 DALL-E 모델을 기반으로 한 AI 아트 생성기입니다. 사용자가 텍스트로 설명한 내용을 바탕으로 고품질의 이미지를 생성하며, 다양한 스타일과 해상도를 지원합니다.',
    category: 'Creative AI',
    tags: ['Generative AI', 'Computer Vision', 'Stable Diffusion', 'DALL-E', 'Art'],
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
    tech: ['Python', 'PyTorch', 'Diffusers', 'Hugging Face', 'React', 'FastAPI'],
    team: [
      {
        name: '김아트',
        role: 'AI Artist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/kim-art',
        github: 'https://github.com/kim-art'
      },
      {
        name: '박생성',
        role: 'ML Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        linkedin: 'https://linkedin.com/in/park-generator',
        github: 'https://github.com/park-generator'
      }
    ],
    results: [
      {
        metric: '생성 시간',
        value: '3.2초',
        description: '평균 이미지 생성 시간'
      },
      {
        metric: '해상도',
        value: '2048x2048',
        description: '최대 지원 해상도'
      },
      {
        metric: '스타일',
        value: '25개',
        description: '지원하는 아트 스타일 수'
      }
    ],
    links: [
      {
        label: 'Try It Now',
        url: 'https://art.example.com',
        type: 'demo'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/example/ai-art-generator',
        type: 'github'
      }
    ],
    createdAt: '2024-01-30',
    updatedAt: '2024-03-25',
    featured: true,
    difficulty: 'Advanced',
    estimatedTime: '7개월',
    status: 'Completed'
  }
];

export const categories: AICategory[] = [
  'Computer Vision',
  'Natural Language Processing',
  'Machine Learning',
  'Deep Learning',
  'Robotics',
  'Healthcare AI',
  'Finance AI',
  'Creative AI',
  'Autonomous Systems',
  'AI Ethics'
];

export const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const statuses = ['Completed', 'In Progress', 'Planning'] as const; 