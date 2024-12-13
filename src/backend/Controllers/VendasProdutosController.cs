using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
using sonhopadaria.Data;

namespace sonhopadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendasProdutosController : ControllerBase
    {
        private readonly DataBD _context;

        public VendasProdutosController(DataBD context)
        {
            _context = context;
        }

        // GET: api/VendasProdutos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TB_VENDAS_PRODUTOS>>> GetVendasProdutos()
        {
            return await _context.Set<TB_VENDAS_PRODUTOS>().ToListAsync();
        }

        // GET: api/VendasProdutos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TB_VENDAS_PRODUTOS>> GetVendaProduto(int id)
        {
            var vendaProduto = await _context.Set<TB_VENDAS_PRODUTOS>().FindAsync(id);

            if (vendaProduto == null)
            {
                return NotFound();
            }

            return vendaProduto;
        }

        // GET: api/VendasProdutos/byVenda/{vendaId}
        [HttpGet("byVenda/{vendaId}")]
        public async Task<ActionResult<IEnumerable<TB_VENDAS_PRODUTOS>>> GetProdutosByVendaId(int vendaId)
        {
            var produtos = await _context.Set<TB_VENDAS_PRODUTOS>()
                                         .Where(p => p.venda_id == vendaId)
                                         .ToListAsync();

            if (!produtos.Any())
            {
                return NotFound($"Nenhum produto encontrado para a venda com ID {vendaId}.");
            }

            return produtos;
        }

        // POST: api/VendasProdutos
        [HttpPost]
        public async Task<ActionResult<TB_VENDAS_PRODUTOS>> PostVendaProduto(TB_VENDAS_PRODUTOS vendaProduto)
        {
            if (vendaProduto.preco <= 0)
            {
                return BadRequest("O preço deve ser maior que zero.");
            }

            if (vendaProduto.quantidade <= 0)
            {
                return BadRequest("A quantidade deve ser maior que zero.");
            }

            _context.Set<TB_VENDAS_PRODUTOS>().Add(vendaProduto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVendaProduto), new { id = vendaProduto.venda_prod_id }, vendaProduto);
        }

        // PUT: api/VendasProdutos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendaProduto(int id, TB_VENDAS_PRODUTOS vendaProduto)
        {
            if (id != vendaProduto.venda_prod_id)
            {
                return BadRequest("O ID fornecido não corresponde ao ID do registro.");
            }

            if (vendaProduto.preco <= 0)
            {
                return BadRequest("O preço deve ser maior que zero.");
            }

            if (vendaProduto.quantidade <= 0)
            {
                return BadRequest("A quantidade deve ser maior que zero.");
            }

            _context.Entry(vendaProduto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendaProdutoExists(id))
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

        // DELETE: api/VendasProdutos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendaProduto(int id)
        {
            var vendaProduto = await _context.Set<TB_VENDAS_PRODUTOS>().FindAsync(id);
            if (vendaProduto == null)
            {
                return NotFound();
            }

            _context.Set<TB_VENDAS_PRODUTOS>().Remove(vendaProduto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendaProdutoExists(int id)
        {
            return _context.Set<TB_VENDAS_PRODUTOS>().Any(e => e.venda_prod_id == id);
        }
    }
}
