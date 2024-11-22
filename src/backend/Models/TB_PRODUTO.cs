using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_PRODUTO
    {
        [Key]
        public int produto_id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? produto { get; set; }

        [MaxLength(100)]
        public string? tipo_prod { get; set; }

        [Required]
        public double preco_prod { get; set; }

        [Required]
        public double qtd_estoque_prod { get; set; }

        [Required]
        [MaxLength(50)]
        public string? unidade_prod { get; set; }

        [Required]
        [MaxLength(100)]
        public string? cod_produto { get; set; }
    }
}
