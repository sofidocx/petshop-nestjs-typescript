import express from "express"; 
import PetController from "../controller/petController";

const router = express.Router(); 

const petController = new PetController(); 

router.post("/", petController.criaPet); 

export default router; 