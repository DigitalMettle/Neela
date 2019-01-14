using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class ProjectSettingsModel
    {
        

        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Project Id
        /// </summary>
        public int? ProjectId { get; set; }

        /// <summary>
        /// User can edit which fields.
        /// </summary>
        public EditableFields EditableFields { get; set; }

        /// <summary>
        /// Which type of work item will show to user.
        /// </summary>
        // public WorkItems WorkItems { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public List<WorkItemsModel> WorkItemsState { get; set; }

        /// <summary>
        /// Display Type.
        /// </summary>
        public Layout Layout { get; set; }

        /// <summary>
        /// Is VSTDesk.
        /// </summary>
        public bool VSTDeskActive { get; set; }

        /// <summary>
        /// User created item status.
        /// </summary>
        public string CreatedItemStatus { get; set; }

        /// <summary>
        /// User created item type.
        /// </summary>
        public string CreatedItemType { get; set; }

        /// <summary>
        /// User Created item default assignment.
        /// </summary>
        public string DefaultAssignment { get; set; }

        /// <summary>
        /// WorkItem Grid Visible Fields
        /// </summary>
        public GridVisibleFieldsModel GridVisibleFields { get; set; }

        /// <summary>
        /// CustomStatus
        /// </summary>
        public List<CustomStatusModel> CustomStatus { get; set; }

        public List<WorkItemsModel> WorkItemsList { get; set; }

        public List<string> MemberList { get; set; }



    }

    public class StatusModel
    {
        public bool InProgress { get; set; }
        public bool InternalQA { get; set; }
        public bool Questions { get; set; }
        public bool InCustomerReview { get; set; }
        public bool InProduction { get; set; }
    }

    public class WorkItems
    {
        public bool Epic { get; set; }
        public bool Feature { get; set; }
        public bool UserStory { get; set; }
        public bool Task { get; set; }
        public bool Bug { get; set; }
    }

    public class EditableFields
    {
        public bool Title { get; set; }
        public bool Details { get; set; }
        public bool CustomerFeedback { get; set; }
        //public bool Assignment { get; set; }

    }

    public class Layout
    {
        public bool Flat { get; set; }
        public bool Hierarchical { get; set; }
    }

    public class CustomStatusModel
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string StatusName { get; set; }
        public string DisplayName { get; set; }
    }

    public class GridVisibleFieldsModel
    {
        public bool WorkItemId { get; set; }
        public bool WorkItemType { get; set; }
        public bool Title { get; set; }
        public bool State { get; set; }
    }

}
