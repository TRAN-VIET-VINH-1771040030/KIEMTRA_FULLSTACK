using System;

namespace PCM_Backend.Models
{
    public class Tournament
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Upcoming";
        // Trường này cực kỳ quan trọng để lưu tiền thưởng
        public decimal Prize { get; set; } = 0; 
    }
}