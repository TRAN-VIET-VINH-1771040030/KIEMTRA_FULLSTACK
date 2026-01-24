using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;
using PCM_Backend.Models;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MembersController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetAll() => await _context.Members.ToListAsync();

        // API sáng tạo: Tự động tính toán lại Rank DUPR (giả lập)
        [HttpPost("{id}/update-rank")]
        public async Task<IActionResult> UpdateRank(int id, [FromBody] double matchScore)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null) return NotFound();
            
            member.DuprRank += (matchScore > 0) ? 0.1 : -0.05; // Thắng tăng 0.1, thua giảm 0.05
            await _context.SaveChangesAsync();
            return Ok(member);
        }
    }
}