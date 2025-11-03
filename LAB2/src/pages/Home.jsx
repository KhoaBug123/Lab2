import React, { useEffect, useState } from 'react'; // Import React và hooks
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom'; // Hook để chuyển trang
import getImageUrl from '../utils/getImageUrl'; // Hàm lấy link ảnh

const API_URL = 'https://68e3c1f38e14f4523dae90d6.mockapi.io/api/SE193986'; // Link API mockapi

export default function Home() {
  const [lessons, setLessons] = useState([]); // State lưu danh sách lesson
  const [loading, setLoading] = useState(true); // State loading
  const navigate = useNavigate(); // Hook để chuyển trang

  // Lấy dữ liệu từ API khi trang load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setLessons(data.filter(l => !l.isCompleted)); // Lọc lesson chưa hoàn thành
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>; // Hiển thị loading

  return (
    <Container>
      <h2 className="mb-4">Lessons To Complete</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4"> {/* Grid responsive 1-2-3-4 cột */}
        {lessons.map(lesson => (
          <Col key={lesson.id}>
            <Card className="h-100 shadow-sm"> {/* Card chiều cao đồng đều */}
              {/* Khung ảnh cố định 180px */}
              <div style={{ height: 180, background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #eee', overflow: 'hidden', cursor: 'pointer' }}
                   onClick={() => navigate(`/SE193986/lessons/${lesson.id}`)}>
                {getImageUrl(lesson) ? ( // Nếu có ảnh thì hiển thị
                  <img src={getImageUrl(lesson)} alt={lesson.lessonTitle} style={{ maxHeight: 170, maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
                ) : (
                  <span style={{ color: '#bbb', fontSize: 14 }}>Không có ảnh</span> // Không có ảnh thì hiện text
                )}
              </div>
              <Card.Body>
                <Card.Title>{lesson.lessonTitle}</Card.Title> {/* Tên lesson */}
                <Card.Text>
                  <strong>Level:</strong> {lesson.level}<br /> {/* Cấp độ */}
                  <strong>Estimated Time:</strong> {lesson.estimatedTime} min {/* Thời gian */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}