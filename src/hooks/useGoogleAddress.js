import { useState, useEffect } from 'react';
import axios from 'axios'

const useGoogleAddress = (address) => {
    const [map, setMap] = useState({});
    const API_KEY = 'AIzaSyBXxGjdlvHZhMuvhBAVnc8vhUJBRycrVH0'
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`

    useEffect(async () => {
        const response = await axios(API);
        setMap(response.data.results[0].geometry.location);
    }, [])

    return map;
}

export default useGoogleAddress;