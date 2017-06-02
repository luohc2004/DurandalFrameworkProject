using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DurandalFrameworkProject.Model;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DurandalFrameworkProject.Controllers
{
    [Route("api/[controller]")]
    public class TodosController : Controller
    {
        private static List<Todo> datas=new List<Todo>()
        {
            new Todo {Id=Guid.NewGuid(),TaskName="基本任务",DeadLine=DateTime.Now }
        };
        // GET: api/values
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return datas;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Todo Get(Guid id)
        {
            return datas.Single(x=>x.Id==id);
        }
        

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Todo value)
        {
            var entity = datas.SingleOrDefault(x => x.Id == id);
            if (entity==null)
            {
                datas.Add(value);
            }
            else
            {
                entity = value;
            }
        }

        [HttpPost("{id}")]
        public void Post(Guid id,[FromBody] Todo value)
        {
            var entity = datas.SingleOrDefault(x => x.Id == id);
            if (entity != null)
            {
                datas.Remove(entity);
            }
            datas.Add(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
