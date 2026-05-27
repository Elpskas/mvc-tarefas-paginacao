var express = require("express");
var router = express.Router();

const { tarefasController } = require("../controllers/tarefasController");

router.get("/", tarefasController.listar);

router.get("/nova-tarefa", tarefasController.novaTarefa);

router.post("/manter-tarefa", tarefasController.salvar);

router.get("/editar", tarefasController.editar);

// exclusão física
router.get("/teste-delete", tarefasController.excluir);

// exclusão lógica
router.get("/teste-delete-logico", tarefasController.excluirLogico);

module.exports = router;