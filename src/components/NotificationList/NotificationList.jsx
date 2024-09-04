import React from "react";
import { Button } from "react-bootstrap";
import "./NotificationList.css";
import {Link} from "react-router-dom";

const NotificationList = ({ notifications, onClose }) => {
    notifications = notifications.slice(0, 3); // Display only the first 3 notifications
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    }
    return (
        <div className="notification-list-container">
            <ul className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                            <span>{notification.message}</span>
                            <small className="text-muted d-block">{
                                formatDate(notification.date)
                            }</small>
                        </li>
                    ))
                ) : (
                    <li className="notification-item">Aucune nouvelle notification</li>
                )}
            </ul>
            <div className="text-center mt-2">
                <Link to="/notifications" onClick={onClose}>
                    <Button variant="link">See All Notifications</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotificationList;