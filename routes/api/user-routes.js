const router = require("express").Router();

const {
    createUser,
    deleteUser,
    updateUser,
    findOneUser,
    findAllUsers,
    addFriend,
    removeFriend
} = require("../../controllers/user-controller")

router.route("/").get(findAllUsers).post(createUser);

router.route("/:userId")
.get(findOneUser)
.put(updateUser)
.delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
