'use server';

const API_BASE_URL = 'https://swafe24fitness.azurewebsites.net/api';

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(`${API_BASE_URL}/Users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: 'Invalid credentials' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }
}