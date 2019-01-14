using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace VSTDesk.Models
{
    class QueryResult
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "path")]
        public string Path { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }

    public class WorkItemQueryResult
    {
        [JsonProperty(PropertyName = "queryType")]
        public string queryType { get; set; }
        [JsonProperty(PropertyName = "queryResultType")]
        public string QueryResultType { get; set; }
        [JsonProperty(PropertyName = "asOf")]
        public DateTime AsOf { get; set; }
        [JsonProperty(PropertyName = "columns")]
        public List<Column> Columns { get; set; }
        [JsonProperty(PropertyName = "workItems")]
        public List<Workitem> WorkItems { get; set; }
        [JsonProperty(PropertyName = "workItemRelations")]
        public List<WorkItemRelations> WorkItemRelations { get; set; }
    }

    public class Workitem
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }

    public class Column
    {
        [JsonProperty(PropertyName = "referenceName")]
        public string ReferenceName { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }


    public class WorkItemsNew
    {
        [JsonProperty(PropertyName = "count")]
        public int Count { get; set; }
        [JsonProperty(PropertyName = "value")]
        public List<Item> Value { get; set; }

    }
    public class Item
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "rev")]
        public int Rev { get; set; }
        [JsonProperty(PropertyName = "fields")]
        public Fields Fields { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }
   // [JsonObject(MemberSerialization.OptIn)]
    public class Fields
    {
        [JsonProperty(PropertyName = "System.Id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "System.State")]
        public string State { get; set; }
        [JsonProperty(PropertyName = "System.Title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "System.Description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "System.WorkItemType")]
        public string WorkItemType { get; set; }
        [JsonProperty(PropertyName = "Custom.ShowInNeela")]
        public bool ShowInNeela { get; set; }
        [JsonProperty(PropertyName = "System.ChangedDate")]
        public DateTime ChangedDate { get; set; }
        [JsonProperty(PropertyName = "System.TeamProject")]
        public string ProjectName { get; set; }

    }


    public class WorkItemRelations
    {
        [JsonProperty(PropertyName = "rel")]
        public string Rel { get; set; }
        [JsonProperty(PropertyName = "source")]
        public Workitem Source { get; set; }
        [JsonProperty(PropertyName = "target")]
        public Workitem Target { get; set; }
    }

    public class WorkItemGridModel
    {
        public int Count { get; set; }
        public List<Item> Item { get; set; } = new List<Item>();
    }

    public class WorkItemHierarchy
    {
        public int Count { get; set; }
        public List<WorkItemList> Items { get; set; } = new List<WorkItemList>();
    }


    public class WorkItemList
    {
        public Field Field { get; set; } 
        public int Count { get; set; }
        public List<Field> ChildList { get; set; } = new List<Field>();
    }

    public class WorkItemComments
    {
        public List<Comment> Comments { get; set; }
    }

    public class Comment
    {
        public string text { get; set; }
        public String revisedDate { get; set; }
        public RevisedBy revisedBy { get; set; }
    }
    
    public class RevisedBy
    {
        public string displayName { get; set; }
        public string name { get; set; }
    }

    public class Field
    {

        public int Id { get; set; }

        public string State { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string WorkItemType { get; set; }

        public bool ShowInNeela { get; set; }
    }



}
