const { Router } = require('express');
const { Pokemon, Types } = require("../db.js");
const router = Router();
const { getTypes } = require('../middlewares/typeMiddleware.js');

router.get('/', async (req, res) => {
    try {
            await getTypes();
            const types = await Types.findAll()
            return res.json(types);  
    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = router;