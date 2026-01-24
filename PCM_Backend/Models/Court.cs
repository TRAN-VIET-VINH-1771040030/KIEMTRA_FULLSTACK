namespace PCM_Backend.Models
{
    public class Court
    {
        public int Id { get; set; }
        // Thêm các trường này để khớp với DbInitializer và DashboardController
        public string Name { get; set; } = string.Empty; 
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        
        // Giữ lại các trường cũ nếu bạn muốn dùng cho Frontend sau này
        public string CourtName { get; set; } = string.Empty; 
        public string Status { get; set; } = "Available";
        public decimal PricePerHour { get; set; }
    }
}