using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly DataBD _context;

        public ProdutoController(DataBD context)
        {
            _context = context;
        }

        // GET: api/Produto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_PRODUTO>>> GetProdutos()
        {
            return await _context.Set<TB_PRODUTO>().ToListAsync();
        }

        // GET: api/Produto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_PRODUTO>> GetProduto(int id)
        {
            var produto = await _context.Set<TB_PRODUTO>().FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // POST: api/Produto
        [HttpPost]
        public async Task<ActionResult<TB_PRODUTO>> PostProduto(TB_PRODUTO produto)
        {
            // Validações extras, caso necessário
            if (string.IsNullOrEmpty(produto.produto))
            {
                return BadRequest("O nome do produto é obrigatório.");
            }

            if (string.IsNullOrEmpty(produto.cod_produto) || produto.cod_produto.Length > 100)
            {
                return BadRequest("O código do produto deve ser preenchido e ter até 100 caracteres.");
            }

            _context.Set<TB_PRODUTO>().Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduto), new { id = produto.produto_id }, produto);
        }

        // PUT: api/Produto/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto(int id, TB_PRODUTO produto)
        {
            if (id != produto.produto_id)
            {
                return BadRequest("O ID fornecido não corresponde ao produto.");
            }

            if (string.IsNullOrEmpty(produto.produto))
            {
                return BadRequest("O nome do produto é obrigatório.");
            }

            if (string.IsNullOrEmpty(produto.cod_produto) || produto.cod_produto.Length > 100)
            {
                return BadRequest("O código do produto deve ser preenchido e ter até 100 caracteres.");
            }

            _context.Entry(produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
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

        // DELETE: api/Produto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Set<TB_PRODUTO>().FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Set<TB_PRODUTO>().Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoExists(int id)
        {
            return _context.Set<TB_PRODUTO>().Any(e => e.produto_id == id);
        }
    }
}
