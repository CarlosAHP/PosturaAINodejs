// controllers/posture_cause.controller.js
const db = require('../models');
const PostureCause = db.PostureCause;

// GET /posture-causes?posture=<texto>
exports.findAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.posture) {
      where.posture_correction_id = (
        await db.PostureCorrection.findOne({
          where: { posture: req.query.posture },
          attributes: ['id']
        })
      )?.id;
    }
    const causes = await PostureCause.findAll({ where, attributes: ['possible_cause'] });
    res.json(causes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/posture_cause.controller.js
const { PostureCause } = db;
exports.findAll = async (req, res) => {
  const where = {};
  if (req.query.posture) where['$correction.posture$'] = req.query.posture;
  if (req.query.posture_correction_id) where.posture_correction_id = req.query.posture_correction_id;

  const causes = await PostureCause.findAll({
    where,
    include: [{ model: db.PostureCorrection, as: 'correction', attributes: ['posture'] }]
  });
  res.json(causes);
};
