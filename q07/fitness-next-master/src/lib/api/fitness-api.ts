import { Program, Client, LoginCredentials, CreateProgramData, Exercise, Trainer } from '@/lib/types';

const API_BASE_URL = 'https://swafe24fitness.azurewebsites.net/api';

export class FitnessAPI {
  public static getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  static setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', token);
    }
  }

  static clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
  }

  private static async fetch(endpoint: string, options: RequestInit = {}) {
    const token = this.getStoredToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken(); // Clear invalid token
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Return null for 204 No Content
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  // Auth
  static async login(credentials: LoginCredentials) {
    const response = await this.fetch('/Users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.jwt) {
      this.setToken(response.jwt);
    }

    return response;
  }

  // Clients
  static async getClients(): Promise<Client[]> {
    return this.fetch('/Users/Clients');
  }

  // Programs
  static async getTrainerPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms/trainer');
  }

  static async createProgram(data: CreateProgramData): Promise<Program> {
    return this.fetch('/WorkoutPrograms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getProgramById(id: string): Promise<Program> {
    return this.fetch(`/WorkoutPrograms/${id}`);
  }

  // New function to get client programs
  static async getClientPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Get exercises for a programId
  static async addExerciseToProgram(programId: string, exerciseData: Partial<Exercise>) {
    return this.fetch(`/Exercises/Program/${programId}`, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  // Get unassigned exercises
  static async getUnassignedExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises/unassigned');
  }

  static async getAllExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises');
  }

  static async removeExercise(exerciseId: number): Promise<void> {
    await this.fetch(`/Exercises/${exerciseId}`, {
      method: 'DELETE',
    });
  }

  // Get trainers
  static async getTrainers(): Promise<Trainer[]> {
    return this.fetch('/Users');
  }

  // Create User (Trainer or Client)
  static async createUser(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: string;
    personalTrainerId?: number; // Optional, only for clients
  }): Promise<void> {
    await this.fetch('/Users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  static async createTrainer(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    const payload = {
      ...data,
      accountType: 'PersonalTrainer',
    };
    await this.createUser(payload);
  }

  static async createNewClient(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId?: number;
  }): Promise<void> {
    const payload = {
      ...data,
      accountType: 'Client',
      personalTrainerId: data.personalTrainerId,
    };
    await this.createUser(payload);
  }

  static getUserIdFromToken(): number | null {
    const token = this.getStoredToken();
    if (!token) return null;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return parseInt(decodedToken.UserId, 10);
  }
}
