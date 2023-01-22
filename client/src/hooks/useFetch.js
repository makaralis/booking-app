import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(url);

                setData(res.data);
                setLoading(false);
            } catch(err) {
                setError(err);
            }
        }

        fetchData();
    }, [url]);

    const reFetch = async () => {
        try {
            setLoading(true);
    
            const res = await axios.get(url);
    
            setData(res.data);
            setLoading(false);
        } catch(err) {
            setError(err);
        }
    }

    return { data, loading, error, reFetch };
}

export default useFetch;