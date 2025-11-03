import React, { useEffect, useState } from 'react'; // Import React và hooks
import { useParams } from 'react-router-dom'; // Hook lấy tham số từ URL
import { Container, Card, Spinner, Badge } from 'react-bootstrap'; // Import Bootstrap components
import getImageUrl from '../utils/getImageUrl'; // Hàm lấy link ảnh

const API_URL = 'https://68e3c1f38e14f4523dae90d6.mockapi.io/api/SE193986'; // Link API

export default function LessonDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [lesson, setLesson] = useState(null); // State lưu lesson
  const [loading, setLoading] = useState(true); // State loading

  // Lấy dữ liệu lesson từ API
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>; // Hiển thị loading
  if (!lesson) return <Container className="mt-5">Lesson not found.</Container>; // Không tìm thấy

  return (
    <Container className="mt-4">
      <Card className="mx-auto shadow" style={{ maxWidth: 500 }}>
        {/* Hiển thị ảnh */}
        {getImageUrl(lesson) ? (
          <Card.Img src={getImageUrl(lesson)} alt={lesson.lessonTitle} style={{ height: 250, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
        ) : (
          <div style={{ height: 250, background: '#f1f1f1' }} /> // Khung trống nếu không có ảnh
        )}
        <Card.Body>
          <Card.Title className="mb-3">{lesson.lessonTitle}</Card.Title> {/* Tên lesson */}
          <Card.Text>
            <strong>Level:</strong> <Badge bg="info">{lesson.level}</Badge><br /> {/* Cấp độ */}
            <strong>Completed:</strong> {lesson.isCompleted ? <Badge bg="success">Yes</Badge> : <Badge bg="secondary">No</Badge>}<br /> {/* Trạng thái */}
            <strong>Estimated Time:</strong> {Number(lesson.estimatedTime).toLocaleString()} minutes {/* Thời gian với dấu phẩy */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}