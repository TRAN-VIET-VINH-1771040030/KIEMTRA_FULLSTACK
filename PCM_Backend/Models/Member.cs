namespace PCM_Backend.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime JoinDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
        public decimal AccountBalance { get; set; } = 0;
        public double DuprRank { get; set; } = 0;
    }
}