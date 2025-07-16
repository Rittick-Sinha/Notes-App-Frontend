const API_URL = import.meta.env.VITE_API_URL;

/**
 * Login API call
 * @param email - user's email
 * @param password - user's password
 */
export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Register API call
 * @param name - user's name
 * @param mobile - user's mobile
 * @param email - user's email
 * @param password - user's password
 */
export const register = async (
  name: string,
  mobile: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, mobile, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

/**
 * Fetch all notes for the logged-in user
 */
export const fetchNotes = async (token: string) => {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Create a new note
 */
export const createNote = async (
  token: string,
  title: string,
  content: string
) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};

/**
 * Delete a note by ID
 */
export const deleteNote = async (token: string, id: string) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Update a note by ID
 */
export const updateNote = async (
  token: string,
  id: string,
  title: string,
  content: string
) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};
