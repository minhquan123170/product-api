# Sử dụng image Node.js chính thức phiên bản nhẹ (Alpine)
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json trước để tận dụng Docker cache
COPY package*.json ./

# Cài đặt các gói phụ thuộc cho ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn còn lại của dự án vào container
COPY . .

# Mở cổng 3000 của container
EXPOSE 3000

# Lệnh để chạy ứng dụng khi container khởi động
CMD ["npm", "start"]