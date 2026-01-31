using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;
using PCM_Backend.Models;

namespace PCM_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TournamentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tournaments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
            return await _context.Tournaments.ToListAsync();
        }

        // POST: api/Tournaments - FIX LỖI KHÔNG THÊM ĐƯỢC
        [HttpPost]
        public async Task<ActionResult<Tournament>> PostTournament(Tournament tournament)
        {
            try 
            {
                _context.Tournaments.Add(tournament);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTournaments), new { id = tournament.Id }, tournament);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Lỗi lưu Database", detail = ex.Message });
            }
        }

        // DELETE: api/Tournaments/5 - FIX LỖI KHÔNG XÓA ĐƯỢC
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
            {
                return NotFound();
            }

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}