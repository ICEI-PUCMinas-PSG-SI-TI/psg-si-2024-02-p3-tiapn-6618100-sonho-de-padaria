using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sonhopadaria.Migrations
{
    /// <inheritdoc />
    public partial class SonhoPadaria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_ETIQUETAGEM",
                columns: table => new
                {
                    etiqueta_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    produto_id = table.Column<int>(type: "int", nullable: false),
                    preco_prod = table.Column<double>(type: "float", nullable: false),
                    unidade_prod = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_ETIQUETAGEM", x => x.etiqueta_id);
                });

            migrationBuilder.CreateTable(
                name: "TB_FUNCIONARIO",
                columns: table => new
                {
                    funcionario_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome_funcionario = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    senha_funcionario = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    salario = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_FUNCIONARIO", x => x.funcionario_id);
                });

            migrationBuilder.CreateTable(
                name: "TB_PRODUTO",
                columns: table => new
                {
                    produto_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    produto = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    tipo_prod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    preco_prod = table.Column<double>(type: "float", nullable: false),
                    qtd_estoque_prod = table.Column<double>(type: "float", nullable: false),
                    unidade_prod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    cod_produto = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_PRODUTO", x => x.produto_id);
                });

            migrationBuilder.CreateTable(
                name: "TB_TRASACAO_ESTOQUE",
                columns: table => new
                {
                    transacao = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    produto_id = table.Column<int>(type: "int", nullable: false),
                    tipo_trasacao = table.Column<int>(type: "int", nullable: false),
                    qtd_transacao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    data = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_TRASACAO_ESTOQUE", x => x.transacao);
                });

            migrationBuilder.CreateTable(
                name: "TB_VENDA",
                columns: table => new
                {
                    venda_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    funcionario_id = table.Column<int>(type: "int", nullable: false),
                    data_venda = table.Column<DateOnly>(type: "date", nullable: false),
                    total_venda = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_VENDA", x => x.venda_id);
                });

            migrationBuilder.CreateTable(
                name: "TB_VENDAS_PRODUTOS",
                columns: table => new
                {
                    venda_prod_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    produto_id = table.Column<int>(type: "int", nullable: false),
                    venda_id = table.Column<int>(type: "int", nullable: false),
                    preco = table.Column<double>(type: "float", nullable: false),
                    quantidade = table.Column<int>(type: "int", nullable: false),
                    etiqueta_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_VENDAS_PRODUTOS", x => x.venda_prod_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_ETIQUETAGEM");

            migrationBuilder.DropTable(
                name: "TB_FUNCIONARIO");

            migrationBuilder.DropTable(
                name: "TB_PRODUTO");

            migrationBuilder.DropTable(
                name: "TB_TRASACAO_ESTOQUE");

            migrationBuilder.DropTable(
                name: "TB_VENDA");

            migrationBuilder.DropTable(
                name: "TB_VENDAS_PRODUTOS");
        }
    }
}
