const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [{ model: Product }],
    order: ['tag_name'],
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: [{ model: Product }],
    where: { id: req.params.id },
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      Tag.findOne({
        include: [{ model: Product }],
        where: { id: req.params.id },
      }).then((tagData) => {
        res.json(tagData);
      });
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json(`The tag with id:${req.params.id} has been deleted.`);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
