import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "src/context/AuthProvider";
import { TabSheet } from 'src/component';

export const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <TabSheet />
    )
}

