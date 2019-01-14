using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Models;
using VSTDesk.DB.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using VSTDesk.Model;

namespace VSTDesk.Data
{
    public class ProjectData : IProjectData
    {
        private readonly ApplicationDbContext _appDbContext;

        public ProjectData(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> DeleteUserData(string id)
        {
            if (id != null)
            {
                var userData = _appDbContext.Users.FirstOrDefault(x => x.Id == id);
                _appDbContext.Remove(userData);
                return _appDbContext.SaveChanges() > 0 ? true : false;

            }

            return false;

        }

        public async Task<List<AdminMasterSettings>> GetProjectSettings(int projectId, string userId = null)
        {
            if (projectId > 0)
            {
                return await _appDbContext.AdminMasterSettings.Include(item => item.Project).Where(x => x.ProjectId == projectId).ToListAsync();
            }
            else if (!string.IsNullOrEmpty(userId) && projectId <= 0)
            {
                return await _appDbContext.AdminMasterSettings.Include(item => item.Project).Where(x => x.Project.UserAndProjects.Count(userAndProject => userAndProject.UserId == userId) > 0).ToListAsync();
            }
            else
            {
                return await _appDbContext.AdminMasterSettings.Include(item => item.Project).ToListAsync();
            }


        }

        public async Task<bool> UpdateProjects(List<ProjectModel> projectList)
        {
            var results = 0;
            var existingProject = _appDbContext.Projects.ToList();
            var projects = new List<Projects>();
            foreach (var item in projectList)
            {
                if (existingProject.Where(x => x.ProjectId == item.ProjectId).Count() == 0)
                {
                    Projects projectData = new Projects()
                    {
                        ProjectId = item.ProjectId,
                        Name = item.Name
                    };
                    projects.Add(projectData);
                }

            }
            if (projects.Count > 0)
            {
                _appDbContext.AddRange(projects);
                results = _appDbContext.SaveChanges();
                if (results > 0)
                {
                    var adminMasterSettings = new List<AdminMasterSettings>();
                    projects.ForEach(p =>
                            adminMasterSettings.Add(new AdminMasterSettings() { ProjectId = p.Id, Status = "Internal QA", Layout = "Flat", VstdeskActive = true, WorkItems = "User Story", CreatedItemStatus = "Assigned", CreatedItemType = "User Story", DefaultAssignment = "", EditableFields = "Status", GridVisibleFields = "WorkItemId,Title" })

                    );
                    _appDbContext.AddRange(adminMasterSettings);
                    _appDbContext.SaveChanges();
                    //var listcustomstatus = new List<DB.Entities.CustomStatus>();
                    //projects.ForEach(x =>
                    //{
                    //    listcustomstatus.Add(new DB.Entities.CustomStatus() { ProjectId = x.Id, StatusName = "InternalQA", DisplayName = "InternalQA" });
                    //    listcustomstatus.Add(new DB.Entities.CustomStatus() { ProjectId = x.Id, StatusName = "InternalQA", DisplayName = "InternalQA" });

                    //});
                    //_appDbContext.AddRange(listcustomstatus);
                    //_appDbContext.SaveChanges();
                }
            }
            else
            {
                results = 1;
            }

            return results > 0;

        }

        public async Task<List<ProjectModel>> FetchProjectsLists(string userId = null)
        {
            List<Projects> projectList;
            if (userId != null)
            {
                var assignedProject = _appDbContext.UserAndProjects.Where(u => u.UserId == userId).Select(p => p.ProjectId).ToList();
                projectList = await _appDbContext.Projects.Where(p => assignedProject.Contains(p.Id)).ToListAsync();
            }
            else
            {
                projectList = await _appDbContext.Projects.ToListAsync();
            }

            List<ProjectModel> listProjectModel = new List<ProjectModel>();
            foreach (var item in projectList)
            {
                ProjectModel project = new ProjectModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    IsSelected = false
                };
                listProjectModel.Add(project);

            }
            return listProjectModel.OrderBy(x => x.Name).ToList();
        }

        public async Task<List<DB.Entities.CustomStatus>> GetProjectCustomStatus(int projectId, string userId = null)
        {
            if (projectId > 0)
            {
                return await _appDbContext.CustomStatus.Include(item => item.Project).Where(x => x.ProjectId == projectId).ToListAsync();
            }
            else if (!string.IsNullOrEmpty(userId) && projectId <= 0)
            {
                return await _appDbContext.CustomStatus.Include(item => item.Project).Where(x => x.Project.UserAndProjects.Count(userAndProject => userAndProject.UserId == userId) > 0).ToListAsync();
            }
            else
            {
                return await _appDbContext.CustomStatus.Include(item => item.Project).ToListAsync();
            }

        }

        public async Task<bool> UpdateProjectSettings(AdminMasterSettings adminMasterSettings, List<DB.Entities.CustomStatus> customStatus)
        {
            var adminsettings = _appDbContext.AdminMasterSettings.FirstOrDefault(x => x.ProjectId == adminMasterSettings.ProjectId);

            if (adminsettings != null)
            {
                adminsettings.ProjectId = adminMasterSettings.ProjectId;
                adminsettings.Status = adminMasterSettings.Status;
                adminsettings.Layout = adminMasterSettings.Layout;
                adminsettings.VstdeskActive = adminMasterSettings.VstdeskActive;
                adminsettings.WorkItems = adminMasterSettings.WorkItems;
                adminsettings.EditableFields = adminMasterSettings.EditableFields;
                adminsettings.CreatedItemStatus = adminMasterSettings.CreatedItemStatus;
                adminsettings.CreatedItemType = adminMasterSettings.CreatedItemType;
                adminsettings.DefaultAssignment = adminMasterSettings.DefaultAssignment;
                adminsettings.GridVisibleFields = adminMasterSettings.GridVisibleFields;
                _appDbContext.Update(adminsettings);
                var listCustomStatus = _appDbContext.CustomStatus.Where(x => x.ProjectId == adminMasterSettings.ProjectId).ToList();

                listCustomStatus.ForEach(x =>
                {
                    var custom = customStatus.FirstOrDefault(y => y.StatusName == x.StatusName);
                    x.DisplayName = custom.DisplayName;
                }

                    );
                _appDbContext.UpdateRange(listCustomStatus);
                return await _appDbContext.SaveChangesAsync() > 0;
            }

            return false;



        }

        public async Task<List<string>> GetProjectName(int id, string userId = null)
        {
            if (id > 0)
            {
                var project = await _appDbContext.Projects.FirstOrDefaultAsync(x => x.Id == id);
                return new List<string>() { project.Name };
            }
            else if (!string.IsNullOrEmpty(userId) && id <= 0)
            {
                return await _appDbContext.Projects
                    .Where(x => x.UserAndProjects.Count(m => m.UserId == userId) > 0)
                    .Select(project => project.Name).ToListAsync();
            }
            else
            {
                return await _appDbContext.Projects.Select(item => item.Name).ToListAsync();
            }
        }

        public async Task<List<ProjectsAndCustomStatusModel>> GetUserProjetsAndCustomStatus(int projectId)
        {

            List<ProjectsAndCustomStatusModel> projectsAndCustomStatusModel = new List<ProjectsAndCustomStatusModel>();
            projectsAndCustomStatusModel.AddRange(_appDbContext.UserAndProjects
                                                   .Where(x => x.ProjectId == projectId)
                                                   .Select(y => new ProjectsAndCustomStatusModel()
                                                   {
                                                       Name = y.Project.Name,
                                                       Id = y.Project.Id,
                                                       CutomStatus = _appDbContext.CustomStatus.
                                                                    Where(c => c.ProjectId == y.Project.Id).
                                                                    Select(c => new CustomStatusModel()
                                                                    {
                                                                        Id = c.Id,
                                                                        ProjectId = c.ProjectId,
                                                                        DisplayName = c.DisplayName,
                                                                        StatusName = c.StatusName
                                                                    })
                                                                    .ToList(),
                                                       AdminMasterSettings = _appDbContext.AdminMasterSettings
                                                                             .Where(p => p.ProjectId == y.Project.Id)
                                                                             .FirstOrDefault()
                                                   })
                                                  .ToList());


            return projectsAndCustomStatusModel;

        }

        public Task<List<ProjectsAndCustomStatusModel>> GetUserProjetsById(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetProjectStatusById(int id)
        {
            List<String> customStatus = new List<String>();
            var status = _appDbContext.AdminMasterSettings.Where(a => a.ProjectId == id).FirstOrDefault().Status;
            customStatus = status.Split(",").ToList();

            return await _appDbContext.CustomStatus.Where(x => x.ProjectId == id && customStatus.Count(cs => cs == x.StatusName) > 0).Select(y => y.DisplayName).Distinct().ToListAsync();

           
        }

        public async Task<List<WorkItemsModel>> GetProjectWorkItems()
        {
            //return null;//new WorkItemsModel();
            return await _appDbContext.WorkItemTypes.Select(x => new WorkItemsModel() { Id = x.Id, Name = x.WorkItemName }).ToListAsync();
        }

        public async Task<bool> insertAndUpdateWorkItemState(List<WorkItemsModel> listWorkItem)
        {
            List<WorkItemsState> workItems = listWorkItem.Select(x => new WorkItemsState() { Name = x.Name, ProjectId = x.Id }).ToList();
            List<CustomStatus> customStatus = listWorkItem.Select(x => new CustomStatus() { DisplayName = x.Name, StatusName = x.Name, ProjectId = x.Id }).ToList();
            await _appDbContext.AddRangeAsync(workItems);
            var result = await _appDbContext.SaveChangesAsync();
            await _appDbContext.AddRangeAsync(customStatus);
            result = await _appDbContext.SaveChangesAsync();
            return result > 0;
        }

        public Task<List<WorkItemsState>> GetWorkItemsState()
        {
            return _appDbContext.WorkItemsState.ToListAsync();
        }

        public async Task<List<Series>> GetUsersByProject()
        {
            List<Series> usersByProject = null;
            usersByProject = _appDbContext.Projects.Select(x => new Series { Name = x.Name, Value = x.UserAndProjects.Count() }).OrderBy(x => x.Name).ToList();
            return usersByProject;
        }

        public async Task<string> GetProjectId(int projectId)
        {
            var project = await _appDbContext.Projects.FirstOrDefaultAsync(x => x.Id == projectId);
            return project.ProjectId.ToString();
        }
    }
}