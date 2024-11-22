using System.ComponentModel.DataAnnotations;

namespace sonhopadaria.Models
{
    public class TB_FUNCIONARIO
    {
        [Key]
        public int funcionario_id { get; set; }

        [Required]
        [MaxLength(100)]
        public string nome_funcionario { get; set; }

        [Required]
        [MaxLength(10)]
        public string senha_funcionario { get; set; }

        [Required]
        public double salario { get; set; }
    }
}
