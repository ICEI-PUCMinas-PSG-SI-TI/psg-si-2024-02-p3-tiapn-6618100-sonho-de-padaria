using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtiquetagemController : ControllerBase
    {
        private readonly DataBD _context;

        public EtiquetagemController(DataBD context)
        {
            _context = context;
        }

        // GET: api/Etiquetagem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_ETIQUETAGEM>>> GetEtiquetas()
        {
            return await _context.Set<TB_ETIQUETAGEM>().ToListAsync();
        }

        // GET: api/Etiquetagem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_ETIQUETAGEM>> GetEtiqueta(int id)
        {
            var etiqueta = await _context.Set<TB_ETIQUETAGEM>().FindAsync(id);

            if (etiqueta == null)
            {
                return NotFound();
            }

            return etiqueta;
        }

        // POST: api/Etiquetagem
        [HttpPost]
        public async Task<ActionResult<TB_ETIQUETAGEM>> PostEtiqueta(TB_ETIQUETAGEM etiqueta)
        {
            _context.Set<TB_ETIQUETAGEM>().Add(etiqueta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEtiqueta), new { id = etiqueta.etiqueta_id }, etiqueta);
        }

        // PUT: api/Etiquetagem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtiqueta(int id, TB_ETIQUETAGEM etiqueta)
        {
            if (id != etiqueta.etiqueta_id)
            {
                return BadRequest();
            }

            _context.Entry(etiqueta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtiquetaExists(id))
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

        // DELETE: api/Etiquetagem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEtiqueta(int id)
        {
            var etiqueta = await _context.Set<TB_ETIQUETAGEM>().FindAsync(id);
            if (etiqueta == null)
            {
                return NotFound();
            }

            _context.Set<TB_ETIQUETAGEM>().Remove(etiqueta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EtiquetaExists(int id)
        {
            return _context.Set<TB_ETIQUETAGEM>().Any(e => e.etiqueta_id == id);
        }
    }
}
