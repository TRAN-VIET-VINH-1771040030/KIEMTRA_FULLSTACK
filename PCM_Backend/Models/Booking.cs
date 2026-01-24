using System.ComponentModel.DataAnnotations;
using PCM_Backend.Models.Enums;

namespace PCM_Backend.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int CourtId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal TotalPrice { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Pending;
    }
}