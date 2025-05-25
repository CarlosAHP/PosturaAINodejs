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
