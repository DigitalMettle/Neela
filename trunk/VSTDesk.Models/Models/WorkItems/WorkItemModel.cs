using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class WorkItemModel
    {
        public int Id { get; set; }
        public string ProjectId { get; set; }
        public string Title { get; set; }
        public string State { get; set; }
        public string Priority { get; set; }
        public string Description { get; set; }
        public string Severity { get; set; }
        public string Comment { get; set; }
        public string AssignTo { get; set; }
        public List<Comments> CommentList { get; set; } = new List<Comments>();
        public int totalCount { get; set; }
        public int WorkItemId { get; set; }

    }

    public class Comments
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public string Email { get; set; }

    }


}
