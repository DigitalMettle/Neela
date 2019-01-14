using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
namespace VSTDesk.DB.Entities
{
    public partial class VSTDeskContext : DbContext
    {
        public virtual DbSet<AdminMasterSettings> AdminMasterSettings { get; set; }
        public virtual DbSet<CompanySettings> CompanySettings { get; set; }
        public virtual DbSet<CustomField> CustomField { get; set; }
        public virtual DbSet<CustomStatus> CustomStatus { get; set; }
        public virtual DbSet<Layout> Layout { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<RoleClaims> RoleClaims { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<UserAndProjects> UserAndProjects { get; set; }
        public virtual DbSet<UserClaims> UserClaims { get; set; }
        public virtual DbSet<UserLogins> UserLogins { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UserTokens> UserTokens { get; set; }
        public virtual DbSet<ViewStructure> ViewStructure { get; set; }
        public virtual DbSet<WorkItems> WorkItems { get; set; }
        public virtual DbSet<WorkItemsState> WorkItemsState { get; set; }
        public virtual DbSet<WorkItemTypes> WorkItemTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminMasterSettings>(entity =>
            {
                entity.Property(e => e.VstdeskActive).HasColumnName("VSTDeskActive");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.AdminMasterSettings)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK__AdminMast__Proje__0A9D95DB");
            });

            modelBuilder.Entity<CompanySettings>(entity =>
            {
                entity.Property(e => e.CompanyLogo).IsRequired();

                entity.Property(e => e.CompanyMessage).IsRequired();

                entity.Property(e => e.Smtpauthentication)
                    .HasColumnName("SMTPAuthentication")
                    .HasMaxLength(10);

                entity.Property(e => e.SmtpencrcyptionType)
                    .HasColumnName("SMTPEncrcyptionType")
                    .HasMaxLength(8);

                entity.Property(e => e.SmtpfromEmail).HasColumnName("SMTPFromEmail");

                entity.Property(e => e.SmtpfromName).HasColumnName("SMTPFromName");

                entity.Property(e => e.Smtphost).HasColumnName("SMTPHost");

                entity.Property(e => e.Smtppassword).HasColumnName("SMTPPassword");

                entity.Property(e => e.Smtpport).HasColumnName("SMTPPort");

                entity.Property(e => e.Smtpusername).HasColumnName("SMTPUsername");

                entity.Property(e => e.VstssettingOne).HasColumnName("VSTSSettingOne");

                entity.Property(e => e.VstssettingTwo).HasColumnName("VSTSSettingTwo");
            });

            modelBuilder.Entity<CustomField>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<CustomStatus>(entity =>
            {
                entity.HasOne(d => d.Project)
                    .WithMany(p => p.CustomStatus)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomSta__Proje__07C12930");
            });

            modelBuilder.Entity<Layout>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Projects>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<RoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<UserAndProjects>(entity =>
            {
                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.UserAndProjects)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__User_Proj__Proje__7D439ABD");

                //entity.HasOne(d => d.User)
                //    .WithMany(p => p.UserAndProjects)
                //    .HasForeignKey(d => d.UserId)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__User_Proj__UserI__7C4F7684");
            });

            modelBuilder.Entity<UserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<UserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<UserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Discriminator).IsRequired();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.FirstName).HasMaxLength(256);

                entity.Property(e => e.LastName).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<UserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<ViewStructure>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<WorkItems>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.WorkItems)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK__WorkItems__Proje__46B27FE2");
            });

            modelBuilder.Entity<WorkItemsState>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.WorkItemsState)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WorkItems__Proje__40F9A68C");
            });

            modelBuilder.Entity<WorkItemTypes>(entity =>
            {
                entity.Property(e => e.WorkItemName).HasMaxLength(100);
            });
        }
    }
}
