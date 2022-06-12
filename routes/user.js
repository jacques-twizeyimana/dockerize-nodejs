const {getAllUsers, createUser, getUserById, updateUser, deleteUserById} = require('../controllers/user');
const router = require('express').Router();


router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUserById);



exports.userRoutes = router;