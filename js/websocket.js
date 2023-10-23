// Tạo kết nối WebSocket
// Kết nối tới WebSocket endpoint
const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function() {
    // Đăng ký nhận thông báo khi có lời mời kết bạn mới
    stompClient.subscribe('/user/topic/friendRequests', function(message) {
        // Xử lý thông báo khi có lời mời kết bạn mới
        const notification = JSON.parse(message.body);
        // Hiển thị thông báo lên giao diện người dùng
        alert(notification);
    });
});
