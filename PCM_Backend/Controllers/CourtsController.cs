using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;
using PCM_Backend.Models;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourtsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. LẤY DANH SÁCH (READ)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Court>>> GetCourts()
        {
            return await _context.Courts.ToListAsync();
        }

        // 2. THÊM MỚI (CREATE)
        [HttpPost]
        public async Task<ActionResult<Court>> PostCourt(Court court)
        {
            _context.Courts.Add(court);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourts), new { id = court.Id }, court);
        }

        // 3. CẬP NHẬT (UPDATE)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourt(int id, Court court)
        {
            if (id != court.Id) return BadRequest();

            _context.Entry(court).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!_context.Courts.Any(e => e.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        // 4. XÓA (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourt(int id)
        {
            var court = await _context.Courts.FindAsync(id);
            if (court == null) return NotFound();

            _context.Courts.Remove(court);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}