import React, { useEffect, useState } from 'react'; // Import React và hooks
import { Table, Container, Spinner } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom'; // Hook chuyển trang
import getImageUrl from '../utils/getImageUrl'; // Hàm lấy link ảnh

const API_URL = 'https://68e3c1f38e14f4523dae90d6.mockapi.io/api/SE193986'; // Link API

export default function CompletedLessons() {
  const [lessons, setLessons] = useState([]); // State lưu danh sách lesson
  const [loading, setLoading] = useState(true); // State loading
  const navigate = useNavigate(); // Hook chuyển trang

  // Lấy dữ liệu từ API khi trang load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setLessons(data.filter(l => l.isCompleted).sort((a, b) => b.id - a.id)); // Lọc lesson đã hoàn thành và sắp xếp giảm dần
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>; // Hiển thị loading

  return (
    <Container>
      <h2 className="mb-4">Completed Lessons</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map(lesson => (
            <tr key={lesson.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/SE193986/lessons/${lesson.id}`)}> {/* Click để xem chi tiết */}
              <td>{lesson.lessonTitle}</td>
              <td>{lesson.level}</td>
              <td>
                <div style={{ width: 60, height: 40, background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                  {getImageUrl(lesson) ? <img src={getImageUrl(lesson)} alt={lesson.lessonTitle} style={{ maxHeight: 38, maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} /> : <span style={{ color: '#bbb', fontSize: 12 }}>Không có ảnh</span>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}