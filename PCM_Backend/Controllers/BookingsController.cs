using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data; // Kiểm tra lại tên namespace này cho đúng với dự án của bạn
using PCM_Backend.Models;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        // 1. Khai báo biến context
        private readonly ApplicationDbContext _context;

        // 2. Tạo constructor để nhận context từ hệ thống
        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 3. Hàm GET: Để Admin lấy dữ liệu hiển thị (Sửa lỗi trang Admin trắng)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings.ToListAsync();
        }

        // 4. Hàm POST: Để khách hàng đặt sân
        [HttpPost]
        public async Task<IActionResult> BookCourt([FromBody] Booking request)
        {
            if (request == null) return BadRequest();
            _context.Bookings.Add(request);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đặt sân thành công!" });
        }
    }
}