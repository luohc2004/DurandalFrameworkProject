using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurandalFrameworkProject.Model
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string TaskName { get; set; }
        public DateTime DeadLine { get; set; }
    }
}
