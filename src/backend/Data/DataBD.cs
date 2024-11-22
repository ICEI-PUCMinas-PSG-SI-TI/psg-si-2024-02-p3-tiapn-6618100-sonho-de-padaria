using Microsoft.EntityFrameworkCore;
using sonhopadaria.Models;
namespace sonhopadaria.Data
{
    public class DataBD : DbContext
    {
        public DataBD(DbContextOptions<DataBD> options) : base(options) { }

        public DbSet<TB_ETIQUETAGEM> TB_ETIQUETAGEM { get; set; }
        public DbSet<TB_FUNCIONARIO> TB_FUNCIONARIO { get; set; }
        public DbSet<TB_PRODUTO> TB_PRODUTO { get; set; }
        public DbSet<TB_TRASACAO_ESTOQUE> TB_TRASACAO_ESTOQUE { get; set; }
        public DbSet<TB_VENDA> TB_VENDA { get; set; }
        public DbSet<TB_VENDAS_PRODUTOS> TB_VENDAS_PRODUTOS { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer(@"Server=BIO-000375;Database=SonhoPadaria;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }
}
