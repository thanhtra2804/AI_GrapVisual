# Hướng dẫn Deploy lên Vercel

## Bước 1: Chuẩn bị GitHub Repository

### 1.1 Tạo repo trên GitHub (nếu chưa có)

- Vào [github.com](https://github.com)
- Click "New repository"
- Đặt tên (ví dụ: `mo_phong_ltdt`)
- Click "Create repository"

### 1.2 Đẩy code lên GitHub (từ máy tính của bạn)

```bash
cd e:\Downloads\Mo_Phong_LTDT\Mo_Phong_LTDT\mo_phong_ltdt

# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files (except .gitignore rules)
git add .

# Commit code
git commit -m "Initial commit: GraphVisualizer with Groq API"

# Thêm remote (thay YOUR_USERNAME và REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Đẩy lên GitHub
git branch -M main
git push -u origin main
```

## Bước 2: Deploy trên Vercel

### 2.1 Kết nối GitHub với Vercel

1. Vào [vercel.com](https://vercel.com)
2. Click "Sign Up" → chọn "Continue with GitHub"
3. Cho phép Vercel truy cập GitHub repos

### 2.2 Import Project

1. Dashboard Vercel → Click "Add New..." → "Project"
2. Tìm repo `mo_phong_ltdt` → Click "Import"

### 2.3 Cấu hình Environment Variables

**QUAN TRỌNG**: Thêm biến môi trường Groq API key:

Trong trang cấu hình Vercel, scroll xuống "Environment Variables":

- **Name**: `VITE_GROQ_API_KEY`
- **Value**: `[YOUR_GROQ_API_KEY]` (lấy từ https://console.groq.com)
- Click "Add"

### 2.4 Deploy

1. Kiểm tra "Framework Preset" → chọn "Vite"
2. Root Directory: `.` (mặc định)
3. Click "Deploy"
4. Chờ build hoàn thành (~2-3 phút)
5. Nhận URL live (ví dụ: `https://mo-phong-ltdt.vercel.app`)

## Bước 3: Kiểm tra & Cập nhật

### 3.1 Sau khi Deploy thành công

- Mở URL live từ Vercel
- Test chat AI để kiểm tra Groq API hoạt động

### 3.2 Cập nhật code trong tương lai

```bash
# Khi có thay đổi
git add .
git commit -m "Describe your changes"
git push origin main

# Vercel tự động rebuild + deploy (vài phút sau)
```

## Troubleshooting

| Vấn đề                  | Giải pháp                                               |
| ----------------------- | ------------------------------------------------------- |
| Build fails             | Check console logs ở Vercel → xem error                 |
| Chat AI không hoạt động | Verify `VITE_GROQ_API_KEY` đã set trong Vercel env vars |
| Module not found        | Run `npm install` locally, commit `package-lock.json`   |
| CORS error              | Groq API hỗ trợ CORS, không cần proxy                   |

## Quick Reference

```bash
# Local development
npm install
npm run dev
# Mở http://localhost:5173 hoặc 5174

# Build for production (kiểm tra trước deploy)
npm run build
npm run preview
```

---

**Chú ý**:

- `.env.local` được ignore (không push lên GitHub)
- Vercel lấy biến từ "Environment Variables" trong dashboard
- Không bao giờ commit API key vào git
