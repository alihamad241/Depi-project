import { create } from "zustand";
import axios from "../libs/axios";
import { toast } from "react-hot-toast"; //notification that can be shown to the user

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name, email, password, consirmPassword}) => {
      set({ loading: true });
      if(password !== consirmPassword) {
        set({ loading: false });
        return toast.error("Passwords do not match");
      }

      try{
        const res=await axios.post("/api/signup", { name, email, password });
        set({ user: res.data.user, loading: false });
      }catch(error){
        set({ loading: false });
        toast.error(error.response.data.message || "Something went wrong, please try again.");
      }
    },
}));
