namespace Domain.Models
{
    public class BranchModel
    {
        public int BranchId { get; set; } = default!;
        public string BranchName { get; set; } = default!;
        public string Adress { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Opened { get; set; } = default!;
    }
}