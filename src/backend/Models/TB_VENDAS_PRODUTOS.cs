using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_VENDAS_PRODUTOS
    {
        [Key]
        public int venda_prod_id { get; set; }

        [Required]
        public int produto_id { get; set; }

        [Required]
        public int venda_id { get; set; }

        [Required]
        public double preco { get; set; }

        [Required]
        public int quantidade { get; set; }

        [Required]
        public int etiqueta_id { get; set; }
    }
}
