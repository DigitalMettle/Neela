using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Model
{
    public class BarChartModel
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "series")]
        public List<Series> Series { get; set; } = new List<Model.Series>();
    }
    public class Series
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "value")]
        public int Value { get; set; }
    }

    public class ChartModel
    {
        public List<int> data { get; set; } = new List<int>();  
        public string label { get; set; }   
    }


    public class DashboardChartModel
    {
        public List<ChartModel> BarChartModel { get; set; } = new List<ChartModel>();
        public List<ChartModel> FistLineChartModel { get; set; } = new List<ChartModel>();
        public List<ChartModel> SecondLineChartModel { get; set; } = new List<ChartModel>();
        public List<String> BarChartLabels { get; set; } = new List<String>();
        public string Description { get; set; }
    }

    public class ProjectSummary
    {
        public FPS fps { get; set; }
    }
    public class FPS
    {
        public DataProviders dataProviders { get; set; }
    }
    public class DataProviders
    {
        public Data data { get; set; }
    }
    public class Data
    {
        [JsonProperty(PropertyName = "ms.vss-tfs-web.project-overview-page-data-provider-verticals")]
        public Provider provider { get; set; }
        
    }
    public class Provider
    {
        public ProjectOverviewData projectOverviewPageData { get; set; }
    }
    public class ProjectOverviewData {
        public Info projectBasicData { get; set; }
    }
    public class Info
    {
        public string  description { get; set; }
    }




}
