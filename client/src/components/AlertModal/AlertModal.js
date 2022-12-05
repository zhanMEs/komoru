import React, { useEffect, useState } from 'react';
import { Modal,Button } from 'react-bootstrap';
import './AlertModal.css'
// import BookingLoading from '../BookingLoading/BookingLoading';

export default function AlertModal(props) {

  // 0715 aki-顯示開關
  const [show, setShow] = useState(true);

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);



  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        className="w-100"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="AlertModal">
            <p className="AlertModal--text">{props.text}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className='bi bi-check-circle-fill text-success' viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
