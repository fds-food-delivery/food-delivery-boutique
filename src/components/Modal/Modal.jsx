import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomModal = ({ show, onClose, children, title }) => {
    return (
        <Modal show={show} onHide={onClose} centered title={title}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;