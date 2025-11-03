// Import React để sử dụng JSX và các hook/component của React
import React from 'react';
// Import các thành phần định tuyến từ thư viện react-router-dom (quản lý route SPA)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import Navbar custom của app
import AppNavbar from './Navbar.jsx';
// Import CSS của Bootstrap để dùng giao diện đẹp, responsive
import 'bootstrap/dist/css/bootstrap.min.css';

// Sử dụng React.lazy để load các page component khi cần (code splitting, tăng tốc load ban đầu)
const Home = React.lazy(() => import('./pages/Home'));
const AllLessons = React.lazy(() => import('./pages/AllLessons'));
const CompletedLessons = React.lazy(() => import('./pages/CompletedLessons'));
const LessonDetail = React.lazy(() => import('./pages/LessonDetail'));
const AddLesson = React.lazy(() => import('./pages/AddLesson'));
const EditLesson = React.lazy(() => import('./pages/EditLesson'));

// Biến rollNumber dùng để cấu hình prefix cho các route (theo yêu cầu đề bài)
const rollNumber = 'SE193986';

// Component App là root của toàn bộ ứng dụng
function App() {
  return (
    // Router bọc toàn bộ app, cho phép sử dụng route động
    <Router>
      {/* Navbar luôn hiển thị trên mọi trang */}
      <AppNavbar />
      {/* React.Suspense giúp hiển thị fallback khi các component page đang được load động */}
      <React.Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          {/* Định nghĩa các route chính của app, mỗi route tương ứng 1 page */}
          <Route path={`/${rollNumber}`} element={<Home />} /> {/* Trang chủ, hiển thị các lesson chưa hoàn thành */}
          <Route path={`/${rollNumber}/all-lessons`} element={<AllLessons />} /> {/* Trang danh sách tất cả lesson */}
          <Route path={`/${rollNumber}/completed-lessons`} element={<CompletedLessons />} /> {/* Trang lesson đã hoàn thành */}
          <Route path={`/${rollNumber}/lessons/:id`} element={<LessonDetail />} /> {/* Trang chi tiết lesson */}
          <Route path={`/${rollNumber}/add-lesson`} element={<AddLesson />} /> {/* Trang thêm lesson mới */}
          <Route path={`/${rollNumber}/edit-lesson/:id`} element={<EditLesson />} /> {/* Trang sửa lesson */}
          {/* Route wildcard: nếu không khớp route nào thì chuyển về trang chủ */}
          <Route path="*" element={<Navigate to={`/${rollNumber}`} replace />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

// Export App để sử dụng ở file main.jsx (render ra #root)
export default App;
