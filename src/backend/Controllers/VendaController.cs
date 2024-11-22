using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : ControllerBase
    {
        private readonly DataBD _context;

        public VendaController(DataBD context)
        {
            _context = context;
        }

        // GET: api/Venda
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_VENDA>>> GetVendas()
        {
            return await _context.Set<TB_VENDA>().ToListAsync();
        }

        // GET: api/Venda/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_VENDA>> GetVenda(int id)
        {
            var venda = await _context.Set<TB_VENDA>().FindAsync(id);

            if (venda == null)
            {
                return NotFound();
            }

            return venda;
        }

        // POST: api/Venda
        [HttpPost]
        public async Task<ActionResult<TB_VENDA>> PostVenda(TB_VENDA venda)
        {
            if (venda.total_venda <= 0)
            {
                return BadRequest("O valor total da venda deve ser maior que zero.");
            }

            _context.Set<TB_VENDA>().Add(venda);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenda), new { id = venda.venda_id }, venda);
        }

        // PUT: api/Venda/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenda(int id, TB_VENDA venda)
        {
            if (id != venda.venda_id)
            {
                return BadRequest("O ID da venda não corresponde ao fornecido.");
            }

            if (venda.total_venda <= 0)
            {
                return BadRequest("O valor total da venda deve ser maior que zero.");
            }

            _context.Entry(venda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendaExists(id))
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

        // DELETE: api/Venda/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenda(int id)
        {
            var venda = await _context.Set<TB_VENDA>().FindAsync(id);
            if (venda == null)
            {
                return NotFound();
            }

            _context.Set<TB_VENDA>().Remove(venda);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendaExists(int id)
        {
            return _context.Set<TB_VENDA>().Any(e => e.venda_id == id);
        }
    }
}
