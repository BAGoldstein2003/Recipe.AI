import { useState, useEffect} from 'react'
import { GoGear } from "react-icons/go";
import './Alertbox.css'

export default function AlertBox({isActive}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive) {
            setIsVisible(true);
        } else {
            timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
        }
        return () => clearTimeout(timer);
    }, [isActive]);

    if (!isActive && !isVisible) return null;

    return (
        <div className={`alert-overlay ${isVisible ? "active" : ""}`}>
            <div className= "alert-box">
                <h3>Generating Recipe...</h3>
                <GoGear 
                    size={40}
                    className="gear"
                    color="#333"
                />
            </div>
        </div>
    )
}