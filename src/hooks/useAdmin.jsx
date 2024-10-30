import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user } = useAuth();

    // UseQuery to check if the current user is an admin
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return null; // Make sure user is logged in
            
            const res = await axios.get(`https://dantech-server.onrender.com/users/${user.email}`);
            
            // Check if the fetched user has a role of 'admin'
            return res.data?.role === 'admin';
        }
    });
    
    return [isAdmin, isAdminLoading];
};

export default useAdmin;