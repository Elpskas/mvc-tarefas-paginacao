const { tarefasModel } = require("../models/tarefasModel");
const moment = require("moment");

moment.locale("pt-br");

const tarefasController = {

    // LISTAR
    listar: async (req, res) => {
        res.locals.moment = moment;

        try {
            const result = await tarefasModel.findAll();

            res.render("pages/index", {
                listaTarefas: result
            });

        } catch (erro) {
            console.log(erro);
        }
    },

    // FORM NOVA TAREFA
    novaTarefa: (req, res) => {
        res.locals.moment = moment;

        res.render("pages/cadastro", {
            tituloPagina: "Cadastro de Tarefas",
            tituloAba: "Cadastro",

            tarefa: {
                id_tarefa: 0,
                nome_tarefa: "",
                prazo_tarefa: "",
                situacao_tarefa: 1
            }
        });
    },

    // SALVAR
    salvar: async (req, res) => {

        const objDados = {
            id: req.body.id,
            nome: req.body.nome,
            prazo: req.body.prazo,
            situacao: req.body.situacao
        };

        try {

            if (objDados.id == 0) {
                await tarefasModel.create(objDados);
            } else {
                await tarefasModel.update(objDados);
            }

            res.redirect("/");

        } catch (erro) {
            console.log(erro);
        }
    },

    // EDITAR
    editar: async (req, res) => {

        res.locals.moment = moment;

        const id = req.query.id;

        try {

            const result = await tarefasModel.findById(id);

            res.render("pages/cadastro", {
                tituloPagina: "Alterar Tarefa",
                tituloAba: "Edição de Tarefa",
                tarefa: result[0]
            });

        } catch (erro) {
            console.log(erro);
        }
    },

    // DELETE FÍSICO
    excluir: async (req, res) => {

        const id = req.query.id;

        try {

            await tarefasModel.delete(id);

            res.redirect("/");

        } catch (erro) {
            console.log(erro);
        }
    },

    // DELETE LÓGICO
    excluirLogico: async (req, res) => {

        const id = req.query.id;

        try {

            await tarefasModel.deleteLogico(id);

            res.redirect("/");

        } catch (erro) {
            console.log(erro);
        }
    }

};

module.exports = { tarefasController };