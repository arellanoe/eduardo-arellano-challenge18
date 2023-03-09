const express = require('express');
const router = express.Router();

const {
    fetchAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
  } = require('../../controllers/users-controller');

router.route('/').get(fetchAllUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;
