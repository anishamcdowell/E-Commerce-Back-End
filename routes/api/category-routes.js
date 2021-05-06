const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{
          model: 'product',
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }] 
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const aCategory = await Category.findByPk(req.params.id, {
      include: [{
        model: 'product',
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }] 
    });

    if (!aCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(aCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
      id:req.params.id
      }
    });
    if (!updateCategory) {
      res.status(404).json({ message: "No new category update!" });
      return;
    }
    res.status(200).json(updateCategory)
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
