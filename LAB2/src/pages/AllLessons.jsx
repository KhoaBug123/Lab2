import React, { useEffect, useState } from 'react'; // Import React và hooks
import { Table, Button, Container, Spinner, Modal, Alert } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom'; // Hook chuyển trang
import getImageUrl from '../utils/getImageUrl'; // Hàm lấy link ảnh

const API_URL = 'https://68e3c1f38e14f4523dae90d6.mockapi.io/api/SE193986'; // Link API

export default function AllLessons() {
  const [lessons, setLessons] = useState([]); // State lưu danh sách lesson
  const [loading, setLoading] = useState(true); // State loading
  const [showModal, setShowModal] = useState(false); // State hiển thị modal xóa
  const [deleteId, setDeleteId] = useState(null); // ID lesson cần xóa
  const [alert, setAlert] = useState(''); // Thông báo sau khi xóa
  const navigate = useNavigate(); // Hook chuyển trang

  // Hàm lấy dữ liệu từ API
  const fetchLessons = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setLessons(data.sort((a, b) => b.id - a.id)); // Sắp xếp giảm dần theo id
        setLoading(false);
      });
  };

  useEffect(() => { fetchLessons(); }, []); // Gọi fetchLessons khi component mount

  // Xóa lesson
  const confirmDelete = () => {
    setShowModal(false);
    fetch(`${API_URL}/${deleteId}`, { method: 'DELETE' }) // Gọi API xóa
      .then(() => {
        setAlert('Xóa thành công!');
        fetchLessons(); // Load lại danh sách
        setTimeout(() => setAlert(''), 1500); // Ẩn alert sau 1.5s
      });
  };

  if (loading) return <div className="text-center mt-5"><Spinner /></div>; // Hiển thị loading

  return (
    <Container>
      <h2 className="mb-4">All Lessons</h2>
      {alert && <Alert variant="success">{alert}</Alert>} {/* Thông báo */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>Image</th>
            <th>Estimated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map(lesson => (
            <tr key={lesson.id}>
              <td style={{ cursor: 'pointer' }} onClick={() => navigate(`/SE193986/lessons/${lesson.id}`)}>{lesson.lessonTitle}</td> {/* Click để xem chi tiết */}
              <td>{lesson.level}</td>
              <td>
                <div style={{ width: 60, height: 40, background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                  {getImageUrl(lesson) ? <img src={getImageUrl(lesson)} alt={lesson.lessonTitle} style={{ maxHeight: 38, maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} /> : <span style={{ color: '#bbb', fontSize: 12 }}>Không có ảnh</span>}
                </div>
              </td>
              <td>{lesson.estimatedTime} min</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => navigate(`/SE193986/edit-lesson/${lesson.id}`)}>Edit</Button> {/* Nút Edit */}
                <Button variant="danger" size="sm" onClick={() => { setDeleteId(lesson.id); setShowModal(true); }}>Delete</Button> {/* Nút Delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Modal xác nhận xóa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Xác nhận xóa</Modal.Title></Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa lesson này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={confirmDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}