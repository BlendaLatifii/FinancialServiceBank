using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class AppBadDataException : Exception
    {
        public Dictionary<string, string[]> Errors { get; } = new Dictionary<string, string[]>();

        public AppBadDataException(){ }
        public AppBadDataException(string messages) : base(messages) { }

        public AppBadDataException(string messages, string path, params string[]errors) : base(messages) 
        { 
            Errors.Add(path,errors);
        }
    }
}
