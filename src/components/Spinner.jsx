
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Layout from "./Layout/Layout";
// eslint-disable-next-line react/prop-types
const Spinner = ({ path = "" }) => {
    const [count, setCount] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname
            });

        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
    return (
        <Layout className="container">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", height: "90vh" }}>

                <div>
                    <p>The page is loading, please wait {count} second</p>
                    <ScaleLoader color="#2e5986" height={40} width={5} radius={2} margin={2} />
                </div>
            </div>
        </Layout>
    )
}

export default Spinner;











// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ScaleLoader from "react-spinners/ScaleLoader";

// function Spinner() {
//     const [count, setCount] = useState(2);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCount((prevValue) => {
//                 if (prevValue === 1) {
//                     clearInterval(interval);
//                     navigate('/dashboard', {
//                         state: location.state || "/dashboard",
//                     });
//                 }
//                 return prevValue - 1;
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [navigate, location]);

//     return (
//         <div className="container">
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", height: "90vh" }}>
//                 <div>
//                     <p>The page is loading, please wait {count} second{count > 1 ? 's' : ''}</p>
//                     <ScaleLoader color="#212529" height={40} width={5} radius={2} margin={2} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Spinner;
