import React, { useEffect, useState } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";  // Import Axios for API requests
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";  // Icons for actions
import "./NotificationAllList.css"; // Add CSS for styling

const NotificationAllList = ({ onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch notifications from backend API
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://your-backend-api.com/api/notifications"); // Replace with your API endpoint
                setNotifications(response.data);  // Set the notifications from the response
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch notifications.");  // Set error if fetching fails
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Function to mark a notification as read
    const markAsRead = async (id) => {
        try {
            await axios.patch(`https://your-backend-api.com/api/notifications/${id}/read`);  // Replace with your API endpoint for marking as read
            setNotifications(notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    // Function to delete a notification
    const deleteNotification = async (id) => {
        try {
            await axios.delete(`https://your-backend-api.com/api/notifications/${id}`);  // Replace with your API endpoint for deletion
            setNotifications(notifications.filter((notification) => notification.id !== id));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    return (
        <div className="notification-dropdown custom-container">
            <hr className="notification-hr" />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : (
                <ListGroup variant="flush">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <ListGroup.Item key={notification.id} className="notification-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className={notification.read ? "text-muted" : ""}>
                                            {notification.message}
                                        </span>
                                        <small className="text-muted d-block">{notification.date}</small>
                                    </div>
                                    <div className="notification-actions">
                                        {!notification.read && (
                                            <FaCheckCircle
                                                className="action-icon"
                                                onClick={() => markAsRead(notification.id)}
                                                title="Mark as Read"
                                            />
                                        )}
                                        <FaTimesCircle
                                            className="action-icon"
                                            onClick={() => deleteNotification(notification.id)}
                                            title="Delete Notification"
                                        />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center">
                            No new notifications
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )}

            <div className="text-center mt-2">
                {/* Navigate to the full notifications page */}
                <Link to="/notifications" onClick={onClose}>
                    <Button variant="link">See All Notifications</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotificationAllList;
