using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_ETIQUETAGEM
    {
        [Key]
        public int etiqueta_id { get; set; }

        [Required]
        public int produto_id { get; set; }

        [Required]
        public double preco_prod { get; set; }

        [Required]
        public double unidade_prod { get; set; }
    }
}
