import React, { useEffect, useState } from 'react'; // Import React và hooks
import { useParams, useNavigate } from 'react-router-dom'; // Hook lấy id và chuyển trang
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap'; // Import Bootstrap components

const API_URL = 'https://68e3c1f38e14f4523dae90d6.mockapi.io/api/SE193986'; // Link API
const LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5']; // Danh sách level

export default function EditLesson() {
  const { id } = useParams(); // Lấy id từ URL
  const [form, setForm] = useState({ lessonTitle: '', lessonImage: '', level: '', estimatedTime: '', isCompleted: false }); // State form
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(''); // State lỗi
  const [success, setSuccess] = useState(''); // State thành công
  const navigate = useNavigate(); // Hook chuyển trang

  // Lấy dữ liệu lesson từ API
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({ lessonTitle: data.lessonTitle || '', lessonImage: data.lessonImage || '', level: data.level || '', estimatedTime: data.estimatedTime || '', isCompleted: !!data.isCompleted }); // Set form với data từ API
        setLoading(false);
      });
  }, [id]);

  // Hàm validate
  const validate = () => {
    const words = form.lessonTitle.trim().split(/\s+/).filter(w => w.length > 0); // Tách từ
    if (words.length <= 1) return 'Lesson title phải có hơn 1 từ.'; // Kiểm tra > 1 từ
    if (!/^https?:\/\/.+\..+/.test(form.lessonImage)) return 'Lesson image phải là URL hợp lệ.'; // Kiểm tra URL
    if (!form.level) return 'Level là bắt buộc.'; // Kiểm tra level
    if (!form.estimatedTime || isNaN(form.estimatedTime)) return 'Estimated time phải là số.'; // Kiểm tra số
    return '';
  };

  // Xử lý thay đổi input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value }); // Cập nhật form
  };

  // Xử lý submit
  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err); // Hiển thị lỗi nếu có
    
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, estimatedTime: Number(form.estimatedTime) }) // Gửi data lên API
    }).then(() => {
      setSuccess('Cập nhật thành công!');
      setTimeout(() => navigate('/SE193986/all-lessons'), 1000); // Chuyển trang sau 1s
    });
  };

  if (loading) return <div className="text-center mt-5"><Spinner /></div>; // Hiển thị loading

  return (
    <Container style={{ maxWidth: 600 }} className="mt-4">
      <h2 className="mb-4">Edit Lesson</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Hiển thị lỗi */}
      {success && <Alert variant="success">{success}</Alert>} {/* Hiển thị thành công */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Lesson Title</Form.Label>
          <Form.Control name="lessonTitle" value={form.lessonTitle} onChange={handleChange} required /> {/* Input tiêu đề */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Lesson Image (URL)</Form.Label>
          <Form.Control name="lessonImage" value={form.lessonImage} onChange={handleChange} required type="url" /> {/* Input link ảnh */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Level</Form.Label>
          <Form.Select name="level" value={form.level} onChange={handleChange} required> {/* Select level */}
            <option value="">-- Select Level --</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estimated Time (minutes)</Form.Label>
          <Form.Control name="estimatedTime" value={form.estimatedTime} onChange={handleChange} required type="number" min={1} /> {/* Input thời gian */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="switch" id="isCompleted" name="isCompleted" label="Completed (mặc định false)" checked={form.isCompleted} onChange={handleChange} /> {/* Switch hoàn thành */}
        </Form.Group>
        <Button type="submit" variant="primary">Update Lesson</Button> {/* Nút submit */}
      </Form>
    </Container>
  );
}