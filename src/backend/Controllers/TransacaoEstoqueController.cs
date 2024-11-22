using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoEstoqueController : ControllerBase
    {
        private readonly DataBD _context;

        public TransacaoEstoqueController(DataBD context)
        {
            _context = context;
        }

        // GET: api/TransacaoEstoque
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_TRASACAO_ESTOQUE>>> GetTransacoes()
        {
            return await _context.Set<TB_TRASACAO_ESTOQUE>().ToListAsync();
        }

        // GET: api/TransacaoEstoque/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_TRASACAO_ESTOQUE>> GetTransacao(int id)
        {
            var transacao = await _context.Set<TB_TRASACAO_ESTOQUE>().FindAsync(id);

            if (transacao == null)
            {
                return NotFound();
            }

            return transacao;
        }

        // POST: api/TransacaoEstoque
        [HttpPost]
        public async Task<ActionResult<TB_TRASACAO_ESTOQUE>> PostTransacao(TB_TRASACAO_ESTOQUE transacao)
        {
            if (string.IsNullOrEmpty(transacao.qtd_transacao))
            {
                return BadRequest("A quantidade da transação é obrigatória.");
            }

            if (transacao.data == default)
            {
                return BadRequest("A data da transação é obrigatória.");
            }

            _context.Set<TB_TRASACAO_ESTOQUE>().Add(transacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransacao), new { id = transacao.transacao }, transacao);
        }

        // PUT: api/TransacaoEstoque/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransacao(int id, TB_TRASACAO_ESTOQUE transacao)
        {
            if (id != transacao.transacao)
            {
                return BadRequest("O ID da transação não corresponde ao fornecido.");
            }

            if (string.IsNullOrEmpty(transacao.qtd_transacao))
            {
                return BadRequest("A quantidade da transação é obrigatória.");
            }

            if (transacao.data == default)
            {
                return BadRequest("A data da transação é obrigatória.");
            }

            _context.Entry(transacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransacaoExists(id))
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

        // DELETE: api/TransacaoEstoque/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransacao(int id)
        {
            var transacao = await _context.Set<TB_TRASACAO_ESTOQUE>().FindAsync(id);
            if (transacao == null)
            {
                return NotFound();
            }

            _context.Set<TB_TRASACAO_ESTOQUE>().Remove(transacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransacaoExists(int id)
        {
            return _context.Set<TB_TRASACAO_ESTOQUE>().Any(e => e.transacao == id);
        }
    }
}
