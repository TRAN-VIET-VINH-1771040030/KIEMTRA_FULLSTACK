using Microsoft.EntityFrameworkCore;
using PCM_Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Chuyển sang In-Memory Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("PCM_Database"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", 
        p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// 2. Tự động tạo cấu trúc RAM và Seed Data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated(); // Quan trọng: Tạo Database trong RAM
    DbInitializer.Seed(context);
}

// 3. Mở Swagger cho mọi môi trường (để Render hiện Swagger)
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll"); 
app.UseAuthorization();
app.MapControllers();

app.Run();