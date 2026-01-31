using PCM_Backend.Models;
using System;
using System.Linq;

namespace PCM_Backend.Data
{
    public static class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // 1. Seed dữ liệu Sân bãi (Courts)
            if (!context.Courts.Any())
            {
                var courts = new Court[]
                {
                    new Court { Name = "Center Court 030", Description = "Sân trung tâm, mái che, đèn LED", IsActive = true, PricePerHour = 200000 },
                    new Court { Name = "Sunset Arena", Description = "View hướng Tây, thích hợp đánh chiều", IsActive = true, PricePerHour = 150000 },
                    new Court { Name = "VIP Glass Court", Description = "Sân kính chuyên nghiệp", IsActive = true, PricePerHour = 300000 },
                    new Court { Name = "Junior Playzone", Description = "Dành cho tập luyện cơ bản", IsActive = true, PricePerHour = 100000 }
                };
                context.Courts.AddRange(courts);
            }

            // 2. Seed dữ liệu Hội viên (Members) để Dashboard không bị số 0
            if (!context.Members.Any())
            {
                var members = new Member[]
                {
                    new Member { 
                        FullName = "Nguyễn Văn Khách", 
                        Email = "khach@gmail.com", 
                        PhoneNumber = "0901234567", 
                        JoinDate = DateTime.Now, 
                        IsActive = true, 
                        AccountBalance = 2500000, // Khớp với hình ảnh ví của bạn
                        DuprRank = 3.5 
                    },
                    new Member { 
                        FullName = "Trần Việt Vinh", 
                        Email = "vinh@gmail.com", 
                        PhoneNumber = "0988888888", 
                        JoinDate = DateTime.Now, 
                        IsActive = true, 
                        AccountBalance = 0, 
                        DuprRank = 0 
                    }
                };
                context.Members.AddRange(members);
            }

            // 3. Seed dữ liệu Giải đấu (Tournaments)
            if (!context.Tournaments.Any())
            {
                var tournaments = new Tournament[]
                {
                    new Tournament { 
                        Name = "Pickleball Championship 2026", 
                        StartDate = DateTime.Now.AddMonths(1), 
                        Prize = 10000000, 
                        Status = "Upcoming" 
                    },
                    new Tournament { 
                        Name = "Giải Giao Lưu Nội Bộ 030", 
                        StartDate = DateTime.Now.AddDays(15), 
                        Prize = 2000000, 
                        Status = "Upcoming" 
                    }
                };
                context.Tournaments.AddRange(tournaments);
            }

            context.SaveChanges();
        }
    }
}