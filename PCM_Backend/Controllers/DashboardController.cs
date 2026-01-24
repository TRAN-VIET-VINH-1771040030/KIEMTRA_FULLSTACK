using Microsoft.AspNetCore.Mvc;
using PCM_Backend.Data;
using System.Linq;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            // Lấy thông tin tổng quát từ Database 030
            var stats = new
            {
                TotalMembers = _context.Members.Count(),
                ActiveCourts = _context.Courts.Count(c => c.IsActive),
                SystemStatus = "Online",
                ServerTime = DateTime.Now,
                Developer = "Student_030" // Ghi dấu ấn cá nhân của bạn
            };

            return Ok(stats);
        }
    }
}