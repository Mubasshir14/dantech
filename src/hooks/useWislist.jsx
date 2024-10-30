import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";




const useWislist = () => {
    const { user } = useAuth();
    const { refetch, data: wishList = [] } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://dantech-server.onrender.com/wishlist?email=${user.email}`);
            return res.data
        }
    })
    return [wishList, refetch]
};

export default useWislist;