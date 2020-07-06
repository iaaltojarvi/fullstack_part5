import React from 'react'
import './Notification.css'

const Notification = ({ notification, errorMessage}) => {
    console.log('message', notification, 'errorMessage', errorMessage)
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