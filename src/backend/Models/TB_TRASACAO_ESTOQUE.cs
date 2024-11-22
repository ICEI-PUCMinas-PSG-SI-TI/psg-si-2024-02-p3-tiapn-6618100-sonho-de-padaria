using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_TRASACAO_ESTOQUE
    {
        [Key]
        public int transacao { get; set; }

        [Required]
        public int produto_id { get; set; }

        [Required]
        public int tipo_trasacao { get; set; }

        [Required]
        public string qtd_transacao { get; set; }

        [Required]
        public DateTime data { get; set; }

    }
}
