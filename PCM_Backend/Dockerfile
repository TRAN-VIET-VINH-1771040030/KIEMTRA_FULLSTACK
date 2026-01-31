# Sử dụng SDK .NET 8 để build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy file dự án và khôi phục thư viện
COPY *.csproj ./
RUN dotnet restore

# Copy toàn bộ code và build
COPY . ./
RUN dotnet publish -c Release -o out

# Sử dụng Runtime .NET 8 để chạy ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Cổng chạy ứng dụng (thường là 80 hoặc 8080)
EXPOSE 80
ENTRYPOINT ["dotnet", "PCM_Backend.dll"]