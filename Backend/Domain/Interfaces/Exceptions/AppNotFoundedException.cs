﻿using Domain.Constant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class AppNotFoundedException : Exception
    {
        public AppNotFoundedException() : base(ErrorMessage.NotFounded) { }
    }
}
