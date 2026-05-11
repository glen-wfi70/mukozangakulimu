export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Hassan', role: 'Manager', avatar: '👨‍💼', email: 'hassan@mukozangakulimu.org' },
  { id: '2', name: 'Hussein', role: 'Developer', avatar: '👨‍💻', email: 'hussein@mukozangakulimu.org' },
  { id: '3', name: 'Rema', role: 'Developer', avatar: '👩‍💻', email: 'rema@mukozangakulimu.org' },
  { id: '4', name: 'Shamin', role: 'Volunteer', avatar: '👤', email: 'shamin@mukozangakulimu.org' },
  { id: '5', name: 'Nema', role: 'Volunteer', avatar: '👩', email: 'nema@mukozangakulimu.org' },
  { id: '6', name: 'Bashir', role: 'Developer', avatar: '👨‍💻', email: 'bashir@mukozangakulimu.org' },
  { id: '7', name: 'Madina', role: 'Volunteer', avatar: '👩', email: 'madina@mukozangakulimu.org' },
  { id: '8', name: 'Hakim', role: 'Developer', avatar: '👨‍💻', email: 'hakim@mukozangakulimu.org' },
  { id: '9', name: 'Ssedin', role: 'Volunteer', avatar: '👤', email: 'ssedin@mukozangakulimu.org' }
];
