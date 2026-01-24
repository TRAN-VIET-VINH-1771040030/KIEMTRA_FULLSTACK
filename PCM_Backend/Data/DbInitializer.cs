using PCM_Backend.Models;

namespace PCM_Backend.Data
{
    public static class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Courts.Any()) return; // Nếu có dữ liệu rồi thì thôi

            var courts = new Court[]
            {
                new Court { Name = "Center Court 030", Description = "Sân trung tâm, mái che, đèn LED", IsActive = true },
                new Court { Name = "Sunset Arena", Description = "View hướng Tây, thích hợp đánh chiều", IsActive = true },
                new Court { Name = "VIP Glass Court", Description = "Sân kính chuyên nghiệp", IsActive = true },
                new Court { Name = "Junior Playzone", Description = "Dành cho tập luyện cơ bản", IsActive = true }
            };

            context.Courts.AddRange(courts);
            context.SaveChanges();
        }
    }
}