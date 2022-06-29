const router = require("express").Router();

const {
    createUser,
    deleteUser,
    updateUser,
    findOneUser,
    findAllUsers
} = require("../../controllers/user-controller")

router.route("/").get(findAllUsers).post(createUser);
router.route("/:userId")
.get(findOneUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router