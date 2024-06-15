using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class TransactionTypePercentageModel
    {
        public TranType TransactionType { get; set; }
        public int Count { get; set; }
        public double Percentage { get; set; }
    }
}