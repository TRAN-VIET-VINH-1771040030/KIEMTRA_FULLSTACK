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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
            return await _context.Tournaments.ToListAsync();
        }
    }
}