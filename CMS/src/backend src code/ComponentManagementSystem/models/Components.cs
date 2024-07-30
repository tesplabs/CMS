namespace ComponentManagementSystem.models
{
    public class Components
    {
        public int SerialNo { get; set; }
        public string ManufacturerPartNo { get; set; }
        public string ComponentType { get; set; }
        public string PackageSize { get; set; }
        public int QtyAvailable { get; set; }
        public DateTime EntryDate { get; set; }
        public string BinNo { get; set; }
        public string RackNo { get; set; }
        public string ProjectUsed { get; set; }
    }
}
