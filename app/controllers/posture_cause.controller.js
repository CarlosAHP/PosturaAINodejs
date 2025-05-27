const db = require('../config/db.config.js');
const PostureCause = db.PostureCause;
const PostureCorrection = db.PostureCorrection;

// Crear una nueva causa postural
exports.create = async (req, res) => {
  try {
    const cause = await PostureCause.create(req.body);
    res.status(201).json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /posture-causes?posture=<texto>&posture_correction_id=<id>
exports.findAll = async (req, res) => {
  try {
    const where = {};

    // Filtro por postura de la corrección asociada (alias 'correction')
    if (req.query.posture) {
      where['$correction.posture$'] = req.query.posture;
    }

    // Filtro directo por id de corrección
    if (req.query.posture_correction_id) {
      where.posture_correction_id = req.query.posture_correction_id;
    }

    const causes = await PostureCause.findAll({
      where,
      include: [{
        model: PostureCorrection,
        as: 'correction',
        attributes: ['posture']
      }]
    });

    res.status(200).json(causes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
