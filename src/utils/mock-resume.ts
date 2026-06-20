import type { Resume } from '@/types/resume'

export const MOCK_RESUME: Resume = {
  id: 'mock',
  title: 'Mock Resume',
  templateId: 'modern',
  sections: ['personalInfo', 'summary', 'experience', 'education', 'skills'],
  personalInfo: {
    fullName: 'Jane Doe',
    title: 'Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    website: 'janedoe.com',
    linkedin: '',
    github: '',
    avatar: '',
    summary: 'Experienced software engineer with a passion for building scalable web applications and intuitive user interfaces.',
    wechat: '',
    age: '',
    gender: '',
    hometown: '',
    maritalStatus: '',
    yearsOfExperience: '5',
    educationLevel: 'Bachelors',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Led frontend development for core products.',
      highlights: ['Improved performance by 40%']
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S.',
      field: 'Computer Science',
      location: 'CA',
      startDate: '2015-09',
      endDate: '2019-05',
      current: false,
      gpa: '3.8',
      highlights: []
    }
  ],
  skills: [
    { id: '1', category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind'] }
  ],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
