using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.DB.Entities
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<UserAndProjects> UserAndProjects { get; set; }
        public virtual DbSet<CustomStatus> CustomStatus { get; set; }
        public virtual DbSet<CustomField> CustomField { get; set; }
        public virtual DbSet<WorkItemsState> WorkItemsState { get; set; }
        public virtual DbSet<Layout> Layout { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<AdminMasterSettings> AdminMasterSettings { get; set; }
        public virtual DbSet<WorkItemTypes> WorkItemTypes { get; set; }
        public virtual DbSet<CompanySettings> CompanySettings { get; set; }
        public ApplicationDbContext(DbContextOptions options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>().ToTable("Users");
            builder.Entity<IdentityRole>().ToTable("Roles");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            builder.Entity<IdentityUser<string>>().ToTable("Users");
            
            
            
            
        }
    }
}
