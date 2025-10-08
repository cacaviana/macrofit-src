/**
 * Mock Data - Users
 * Dados simulados para desenvolvimento
 */

export const mockUsers = [
  {
    id: 'user-1',
    email: 'maria@macrofit.com',
    name: 'Maria Silva',
    premium: true,
    profile: {
      currentWeight: 68.5,
      targetWeight: 63.0,
      height: 165,
      age: 28,
      gender: 'female',
      activityLevel: 'moderate',
      goal: 'lose_weight',
      dailyCalories: 1850,
      dailyProtein: 140,
      dailyCarbs: 185,
      dailyFat: 62,
      dailyWater: 2500
    },
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-10-06T00:00:00Z'
  }
];

export const mockWeightHistory = [
  { date: '2024-10-01', weight: 69.2, notes: '' },
  { date: '2024-10-02', weight: 69.0, notes: '' },
  { date: '2024-10-03', weight: 68.8, notes: '' },
  { date: '2024-10-04', weight: 68.6, notes: '' },
  { date: '2024-10-05', weight: 68.5, notes: 'Ótimo progresso!' },
  { date: '2024-10-06', weight: 68.5, notes: '' }
];

export const mockWaterIntake = [
  { timestamp: '2024-10-06T08:00:00Z', amount: 250 },
  { timestamp: '2024-10-06T10:30:00Z', amount: 500 },
  { timestamp: '2024-10-06T12:00:00Z', amount: 250 },
  { timestamp: '2024-10-06T14:30:00Z', amount: 250 },
  { timestamp: '2024-10-06T16:00:00Z', amount: 100 }
];

export const mockExercises = [
  {
    id: 'ex-1',
    name: 'Corrida',
    duration: 30,
    intensity: 'moderate',
    caloriesBurned: 280,
    timestamp: '2024-10-06T07:30:00Z',
    notes: 'Corrida matinal no parque'
  },
  {
    id: 'ex-2',
    name: 'Musculação',
    duration: 45,
    intensity: 'high',
    caloriesBurned: 320,
    timestamp: '2024-10-05T18:00:00Z',
    notes: 'Treino de pernas'
  },
  {
    id: 'ex-3',
    name: 'Ciclismo',
    duration: 60,
    intensity: 'moderate',
    caloriesBurned: 450,
    timestamp: '2024-10-04T16:30:00Z',
    notes: 'Passeio de bike'
  }
];
