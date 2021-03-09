const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [{ model: Product }],
    order: ['category_name'],
  }).then((categoryData) => {
    res.json(categoryData);
  });

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // Category.findByPk(req.params.id).then((categoryData) => {
  //   res.json(categoryData);
  // });
  Category.findOne({
    include: [{ model: Product }],
    where: { id: req.params.id },
    // order: ['category_name'],
  }).then((categoryData) => {
    res.json(categoryData);
  });

  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    // .catch((err) => res.json(err));
    // try {
    //   const userData = await Category.update(req.body, {
    //     where: {
    //       id: req.params.id,
    //     },
    //   });
    //   if (!userData[0]) {
    //     res.status(404).json({ message: 'No category with this id!' });
    //     return;
    //   }
    //   res.status(200).json(userData);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
