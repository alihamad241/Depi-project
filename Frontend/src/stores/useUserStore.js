import { create } from "zustand";
import axios from "../libs/axios";
import { toast } from "react-hot-toast"; //notification that can be shown to the user
import { logout } from './../../../Backend/controllers/auth.controller';
import { to } from './../../node_modules/rollup/dist/es/shared/node-entry';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, consirmPassword }) => {
        set({ loading: true });
        if (password !== consirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", {
                name,
                email,
                password,
            });
            set({ user: res.data.user, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(
                error.response.data.message ||
                    "Something went wrong, please try again."
            );
        }  
    },

    login : async (email, password) => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/login", {
                email,
                password,
            });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(
                error.response.data.message ||
                    "Something went wrong, please try again."
            );
        }
    },
    checkAuth : async () => {
      set({ checkingAuth: true });
      try {
        const response = await axios.get("/auth/profile");
        set({ user: response.data, checkingAuth: false });
      } catch (error) {
        set({ user: null, checkingAuth: false });
      }
    },
    logout  : async () => {
      try {
        await axios.post("/auth/logout");
        set({user : null});
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Something went wrong, please try again."
        );
      }
    },
}));

// todo-->implement the axios interceptors for refreshing the access token
