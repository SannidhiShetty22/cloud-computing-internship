import { useEffect, useState } from "react";
import api from "../../utils/api.js";

const useOfflineDetection = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const checkConnectivity = async (retries = 3, delay = 1000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    await fetch(`${api.defaults.baseURL}/status`, {
                        method: "GET",
                        cache: "no-store",
                    });
                    setIsOffline(false);
                    return;
                } catch {
                    if (i < retries - 1) {
                        await new Promise((res) => setTimeout(res, delay));
                    }
                }
            }
            setIsOffline(true);
        };

        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => checkConnectivity();

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        checkConnectivity();

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return isOffline;
};

export default useOfflineDetection;
