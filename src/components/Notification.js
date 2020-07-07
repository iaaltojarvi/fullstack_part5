import React from 'react'
import './Notification.css'

const Notification = ({ notification, errorMessage}) => {
    if (notification === null && errorMessage === null) {
        return null
    }
    if (errorMessage !== null) {
        return < div className="error">
            {errorMessage}
        </div>
    } 
    if (notification !== null) {
        return <div className="notification">
            {notification}
        </div>

    }
}

export default Notification