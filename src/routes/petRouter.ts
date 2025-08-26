import express from "express"; 
import PetController from "../controller/petController";

const router = express.Router(); 

const petController = new PetController(); 

router.get("/", petController.listaPets); 
router.post("/", petController.criaPet); 
router.put("/:id", petController.atualizaPet); 
router.delete("/:id", petController.deletaPet); 

export default router; 