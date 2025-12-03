import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../hooks/useLibraryDataWithMock";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      // Find user by email
      const usersResponse = await fetch(`${BASE_URL}/users?email=${email}`);
      
      if (!usersResponse.ok) {
        throw new Error("Failed to connect to server. Please ensure the mock server is running.");
      }
      
      const users = await usersResponse.json();
      const user = Array.isArray(users) ? users[0] : users;

      if (!user || (Array.isArray(users) && users.length === 0)) {
        throw new Error("User not found");
      }

      // In a real app, we'd verify the password hash
      // For mock purposes, we'll do simple comparison
      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message || "Sign in failed. Please try again." };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

