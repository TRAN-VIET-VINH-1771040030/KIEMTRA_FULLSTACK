using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Kết nối SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Đăng ký dịch vụ CORS (Phải đăng ký trước khi Build)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", 
        p => p.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// 3. Tự động Seed Data (Giữ nguyên của bạn)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    DbInitializer.Seed(context);
}

// 4. Cấu hình Middleware theo đúng thứ tự
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// QUAN TRỌNG: UseCors phải nằm sau UseRouting (nếu có) và TRƯỚC MapControllers
app.UseCors("AllowAll"); 

app.UseAuthorization();
app.MapControllers();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.Run();