using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private readonly DataBD _context;

        public FuncionarioController(DataBD context)
        {
            _context = context;
        }

        // GET: api/Funcionario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_FUNCIONARIO>>> GetFuncionarios()
        {
            return await _context.Set<TB_FUNCIONARIO>().ToListAsync();
        }

        // GET: api/Funcionario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_FUNCIONARIO>> GetFuncionario(int id)
        {
            var funcionario = await _context.Set<TB_FUNCIONARIO>().FindAsync(id);

            if (funcionario == null)
            {
                return NotFound();
            }

            return funcionario;
        }

        // POST: api/Funcionario
        [HttpPost]
        public async Task<ActionResult<TB_FUNCIONARIO>> PostFuncionario(TB_FUNCIONARIO funcionario)
        {
            // Garantindo que os dados estejam válidos
            if (funcionario.senha_funcionario.Length > 10)
            {
                return BadRequest("A senha não pode ter mais que 10 caracteres.");
            }

            _context.Set<TB_FUNCIONARIO>().Add(funcionario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFuncionario), new { id = funcionario.funcionario_id }, funcionario);
        }

        // PUT: api/Funcionario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncionario(int id, TB_FUNCIONARIO funcionario)
        {
            if (id != funcionario.funcionario_id)
            {
                return BadRequest();
            }

            if (funcionario.senha_funcionario.Length > 10)
            {
                return BadRequest("A senha não pode ter mais que 10 caracteres.");
            }

            _context.Entry(funcionario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FuncionarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Funcionario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(int id)
        {
            var funcionario = await _context.Set<TB_FUNCIONARIO>().FindAsync(id);
            if (funcionario == null)
            {
                return NotFound();
            }

            _context.Set<TB_FUNCIONARIO>().Remove(funcionario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FuncionarioExists(int id)
        {
            return _context.Set<TB_FUNCIONARIO>().Any(e => e.funcionario_id == id);
        }
    }
}
