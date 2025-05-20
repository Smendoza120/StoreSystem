import type { UserData } from "../interfaces/user";

const API_URL = 'http://localhost:3000/api/users';

export const createUser = async (userData: UserData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear el usuario');
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error al llamar a la API para crear usuario:', error);
        throw error;
    }
};