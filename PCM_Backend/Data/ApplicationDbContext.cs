using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PCM_Backend.Models;

namespace PCM_Backend.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Member> Members { get; set; }
        public DbSet<Court> Courts { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Chỉ định chính xác tên bảng có tiền tố 030_ như trong SQL của bạn
            modelBuilder.Entity<Member>().ToTable("030_Members");
            modelBuilder.Entity<Court>().ToTable("030_Courts");
            modelBuilder.Entity<Booking>().ToTable("030_Bookings");
            
            // Bảng Tournaments không có tiền tố trong hình của bạn
            modelBuilder.Entity<Tournament>().ToTable("Tournaments"); 

            // Cấu hình tiền tệ để tránh lỗi Warning khi Migration
            modelBuilder.Entity<Member>().Property(m => m.AccountBalance).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Court>().Property(c => c.PricePerHour).HasColumnType("decimal(18,2)");
        }
    }
}