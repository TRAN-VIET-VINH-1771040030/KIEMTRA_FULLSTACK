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

            // Mapping bảng theo cấu hình của Vinh
            modelBuilder.Entity<Member>().ToTable("030_Members");
            modelBuilder.Entity<Court>().ToTable("030_Courts");
            modelBuilder.Entity<Booking>().ToTable("030_Bookings");
            modelBuilder.Entity<Tournament>().ToTable("Tournaments"); 

            // Cấu hình kiểu dữ liệu decimal để tránh lỗi lưu trữ
            modelBuilder.Entity<Member>().Property(m => m.AccountBalance).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Court>().Property(c => c.PricePerHour).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Tournament>().Property(t => t.Prize).HasColumnType("decimal(18,2)");
        }
    }
}