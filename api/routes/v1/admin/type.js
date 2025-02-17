const express = require('express')
const router = express.Router()

const auth = require('../../../middlewares/auth')
const { Type, Tile } = require('../../../models')

// Get single categorie
router.get('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const type = await Type.findById(id)
		if (!type) return res.status(404).json({ success: false, message: 'Type has not been found' })

		res.status(200).json({ success: true, data: type })
	} catch (err) {
		res.status(404).json({ success: false, message: err.message })
	}
})

// Add single categorie
router.post('/', auth, async (req, res) => {
	try {
		await Type.create({ ...req.body, url: Math.random().toString(36).slice(-8) })

		res.status(201).json({ success: true, message: 'Type has been successfully created' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Update single categorie
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		await Type.findByIdAndUpdate(id, req.body)

		res.status(200).json({ success: true, message: 'Type has been successfully updated' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Delete single categorie
router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const tiles = await Tile.find({ type: id })

		if (tiles.length > 0) {
			const titles = tiles.map(tile => tile.title).join()
			res.status(500).json({
				success: false,
				message: `There are several tiles belonging to this type. Either edit the tile type, or remove the tiles before deleting the type. 
					Tiles related to this type: ${titles}`,
			})
		} else {
			await Type.findByIdAndDelete(id)
			res.status(200).json({ success: true, message: 'Successfully removed' })
		}
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
