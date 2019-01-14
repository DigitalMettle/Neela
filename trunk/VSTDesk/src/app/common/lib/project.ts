import { Injectable } from '@angular/core'


export class Project{
    Id : number;
    Name : string
}



export class Projects{
  static Project : Array<Project> = new Array<Project>();
  static selectedProjectId : number;
  static projectStatus : Array<string> = [];

  static setSelectedProject(projectId){
      let userObject = localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null;
      if(userObject){
          userObject['selectedProjectId'] = projectId;
          Projects.selectedProjectId = projectId;
          localStorage.setItem('authorization' , JSON.stringify(userObject))
      }
  }

  static resetProjectList(projectList: Project[]) {
      this.Project = projectList;
  }
}

export class UserProfile{
    static FirstName : string;
    static LastName : string;
    static ProfileImageUrl  : string;
    static UserId : string;
    static Role : string;
}
