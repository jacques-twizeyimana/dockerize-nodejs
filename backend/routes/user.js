const {getAllUsers, createUser, getUserById, updateUser, deleteUserById, loginUser} = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const router = require('express').Router();


router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put([auth,updateUser]).delete([auth,deleteUserById]);

router.route("/login").post(loginUser);

exports.userRoutes = router;