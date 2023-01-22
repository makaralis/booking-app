import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/checkauth", verifyToken, (req, res, next) => {
    res.send("hello user, you are authenticated");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account");
});

// UPDATE
router.put("/:id", updateUser);

// DELETE 
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);

// GET ALL
router.get("/", getAllUsers);

export default router;