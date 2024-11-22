using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_VENDA
    {
        [Key]
        public int venda_id { get; set; }

        [Required]
        public int funcionario_id { get; set; }

        [Required]
        public DateOnly data_venda { get; set; }

        [Required]
        public decimal total_venda { get; set; }
    }
}
