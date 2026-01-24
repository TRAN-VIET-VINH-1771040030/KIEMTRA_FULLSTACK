namespace PCM_Backend.Models
{
    public class Tournament
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public string Status { get; set; } = "Upcoming";
    }
}