using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;
using PCM_Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetAll()
        {
            return await _context.Members.ToListAsync();
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetById(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null) return NotFound();
            return member;
        }

        // POST: api/Members (Dùng cho Đăng ký thành viên) 📝
        [HttpPost]
        public async Task<ActionResult<Member>> Register(Member member)
        {
            _context.Members.Add(member);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = member.Id }, member);
        }

        // PUT: api/Members/5 (Dùng cho Nạp tiền & Trừ tiền khi đặt sân) 💰
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, Member member)
        {
            if (id != member.Id) return BadRequest();

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Members.Any(e => e.Id == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // API cập nhật Rank DUPR (Giữ lại logic cũ của bạn) 📈
        [HttpPost("{id}/update-rank")]
        public async Task<IActionResult> UpdateRank(int id, [FromBody] double matchScore)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null) return NotFound();
            
            member.DuprRank += (matchScore > 0) ? 0.1 : -0.05;
            await _context.SaveChangesAsync();
            return Ok(member);
        }
    }
}