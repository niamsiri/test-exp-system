const express = require('express')
const path = require('path')
const router = express()

router.get('/:name', async (req, res) => {

    const pathImg = path.resolve(`images/`, req.params.name)

    return res.status(200).sendFile(pathImg)
})

module.exports = router