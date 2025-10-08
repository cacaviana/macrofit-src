/**
 * Mock Data - Meals
 * Dados simulados para refeições
 */

export const mockMeals = [
  {
    id: 'meal-1',
    userId: 'user-1',
    mealType: 'breakfast',
    timestamp: '2024-10-06T08:15:00Z',
    source: 'text',
    description: 'Aveia com banana e mel',
    foods: [
      {
        id: 'food-1',
        name: 'Aveia em flocos',
        quantity: 50,
        unit: 'g',
        calories: 190,
        protein: 6.9,
        carbs: 32.8,
        fat: 3.4
      },
      {
        id: 'food-2',
        name: 'Banana nanica',
        quantity: 120,
        unit: 'g',
        calories: 105,
        protein: 1.3,
        carbs: 26.9,
        fat: 0.4
      },
      {
        id: 'food-3',
        name: 'Mel',
        quantity: 20,
        unit: 'g',
        calories: 65,
        protein: 0.1,
        carbs: 17.3,
        fat: 0
      }
    ],
    totalCalories: 360,
    totalProtein: 8.3,
    totalCarbs: 77.0,
    totalFat: 3.8
  },
  {
    id: 'meal-2',
    userId: 'user-1',
    mealType: 'lunch',
    timestamp: '2024-10-06T12:30:00Z',
    source: 'photo',
    description: 'Peito de frango grelhado com arroz integral',
    foods: [
      {
        id: 'food-4',
        name: 'Peito de frango grelhado',
        quantity: 150,
        unit: 'g',
        calories: 248,
        protein: 31,
        carbs: 0,
        fat: 12.8
      },
      {
        id: 'food-5',
        name: 'Arroz integral cozido',
        quantity: 100,
        unit: 'g',
        calories: 130,
        protein: 3,
        carbs: 28,
        fat: 1
      },
      {
        id: 'food-6',
        name: 'Brócolis refogado',
        quantity: 80,
        unit: 'g',
        calories: 22,
        protein: 2.4,
        carbs: 4.0,
        fat: 0.3
      }
    ],
    totalCalories: 400,
    totalProtein: 36.4,
    totalCarbs: 32.0,
    totalFat: 14.1
  },
  {
    id: 'meal-3',
    userId: 'user-1',
    mealType: 'snack',
    timestamp: '2024-10-06T15:45:00Z',
    source: 'text',
    description: 'Iogurte grego com granola',
    foods: [
      {
        id: 'food-7',
        name: 'Iogurte grego natural',
        quantity: 200,
        unit: 'ml',
        calories: 200,
        protein: 18,
        carbs: 12,
        fat: 10
      },
      {
        id: 'food-8',
        name: 'Granola',
        quantity: 30,
        unit: 'g',
        calories: 150,
        protein: 4.5,
        carbs: 18,
        fat: 6
      }
    ],
    totalCalories: 350,
    totalProtein: 22.5,
    totalCarbs: 30.0,
    totalFat: 16.0
  },
  {
    id: 'meal-4',
    userId: 'user-1',
    mealType: 'dinner',
    timestamp: '2024-10-06T19:20:00Z',
    source: 'audio',
    description: 'Salmão grelhado com batata doce',
    foods: [
      {
        id: 'food-9',
        name: 'Salmão grelhado',
        quantity: 100,
        unit: 'g',
        calories: 208,
        protein: 25.4,
        carbs: 0,
        fat: 12.4
      },
      {
        id: 'food-10',
        name: 'Batata doce assada',
        quantity: 100,
        unit: 'g',
        calories: 103,
        protein: 2.3,
        carbs: 24.3,
        fat: 0.1
      },
      {
        id: 'food-11',
        name: 'Aspargos',
        quantity: 80,
        unit: 'g',
        calories: 16,
        protein: 1.8,
        carbs: 3.2,
        fat: 0.1
      }
    ],
    totalCalories: 327,
    totalProtein: 29.5,
    totalCarbs: 27.5,
    totalFat: 12.6
  }
];

export const mockFoodDatabase = [
  { id: 'food-db-1', name: 'Banana nanica', calories: 87, protein: 1.1, carbs: 22.8, fat: 0.3, unit: '100g' },
  { id: 'food-db-2', name: 'Peito de frango grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
  { id: 'food-db-3', name: 'Arroz integral cozido', calories: 130, protein: 3, carbs: 28, fat: 1, unit: '100g' },
  { id: 'food-db-4', name: 'Aveia em flocos', calories: 380, protein: 13.8, carbs: 65.6, fat: 6.8, unit: '100g' },
  { id: 'food-db-5', name: 'Iogurte grego natural', calories: 100, protein: 9, carbs: 6, fat: 5, unit: '100ml' },
  { id: 'food-db-6', name: 'Salmão grelhado', calories: 208, protein: 25.4, carbs: 0, fat: 12.4, unit: '100g' },
  { id: 'food-db-7', name: 'Batata doce assada', calories: 103, protein: 2.3, carbs: 24.3, fat: 0.1, unit: '100g' },
  { id: 'food-db-8', name: 'Brócolis refogado', calories: 28, protein: 3, carbs: 5, fat: 0.4, unit: '100g' },
  { id: 'food-db-9', name: 'Granola', calories: 500, protein: 15, carbs: 60, fat: 20, unit: '100g' },
  { id: 'food-db-10', name: 'Mel', calories: 325, protein: 0.5, carbs: 86.5, fat: 0, unit: '100g' }
];

export const mockDailyNutrition = {
  date: '2024-10-06',
  totalCalories: 1437,
  totalProtein: 96.7,
  totalCarbs: 166.5,
  totalFat: 46.5,
  goals: {
    calories: 1850,
    protein: 140,
    carbs: 185,
    fat: 62
  },
  percentages: {
    calories: 78,
    protein: 69,
    carbs: 90,
    fat: 75
  },
  remaining: {
    calories: 413,
    protein: 43.3,
    carbs: 18.5,
    fat: 15.5
  }
};
