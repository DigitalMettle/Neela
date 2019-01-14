using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using VSTDesk.Api;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.DB.Entities;
using VSTDesk.Logic;
using VSTDesk.Middleware;

namespace VSTDesk
{
    public class Startup
    {
        private const string SecretKey = "B9ECCD5C-E03F-44C9-A50A-736D5DEE6C3A"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public IHostingEnvironment HostingEnvironment { get; }
        public Startup(IConfiguration configuration, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            Configuration = configuration;
            //var builder = new ConfigurationBuilder()
            //   .SetBasePath(env.ContentRootPath);
            //   //.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            //   //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
            //builder.AddEnvironmentVariables();
            //Configuration = builder.Build();
            //HostingEnvironment = env;



        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
       .AddEntityFrameworkStores<ApplicationDbContext>()
       .AddDefaultTokenProviders();

            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IAccountData, AccountData>();
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddTransient<IProjectData, ProjectData>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserData, UserData>();
            services.AddTransient<IDataRepository, DataRepository>();
            services.AddTransient<IWorkItemsRepository, WorkItemsRepository>();
            services.AddTransient<EmailService>();

            //  services.AddTransient<IDataRepository, DataRepository>();


            // Add Appsettings configuration to AppSettings class
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            IConfigurationSection jwtAppSettingOptions = Configuration.GetSection("AppSettings").GetSection("JwtIssuerOptions");
            // var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });

            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()).AddMvcOptions(options =>
             options.Filters.Add(typeof(AccessResourceAttribute)));
            //        services.AddMvc()
            //.AddJsonOptions(options =>
            //{
            //    options.SerializerSettings.Formatting = Formatting.Indented;
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            try
            {
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                    .CreateScope())
                {
                    // serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
                    //serviceScope.ServiceProvider.GetService<ISeedService>().SeedDatabase().Wait();
                   // serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
                    var RoleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                    string[] roleNames = { "Admin", "User" };
                    IdentityResult roleResult;
            foreach (var roleName in roleNames)
                    {
                        //creating the roles and seeding them to the database
                        var roleExist =  RoleManager.RoleExistsAsync(roleName);
                        if (!roleExist.Result)
                        {
                            roleResult =  RoleManager.CreateAsync(new IdentityRole(roleName)).Result;
                        }
                    }
                  
                }
            }
            catch (Exception ex)
            {
                // I'm using Serilog here, but use the logging solution of your choice.
                //Log.Error(ex, "Failed to migrate or seed database");
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseErrorHandlingMiddleware();
            app.UseValidationMessageMiddleware();
            app.UseFileServer(new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"VSTDeskApp"))
            });
            app.MapWhen(context => context.Request.Path.StartsWithSegments("/token"), appBuilder =>
            {
                appBuilder.UseTokenProviderMiddleware();
            });
            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Hello World!");
            //});
            app.UseMvc();
            app.UseNotFoundMiddleware();
        }
    }
}
