import { admin, settings } from "../models";
const Admin = admin;
const Settings = settings;

exports.signup = (req, res) => {
  let admin = null;
  let settings = null;
  let type = "admin_unsigned";
  if (req.body.secret_key) {
    if (req.body.secret_key === process.env.SECRET_KEY) {
      type = "admin";
    }
  }
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // check if frontend passes password and email or username, otherwise send error
  if ((!req.body.email || !req.body.telegram) && !req.body.password) {
    res.status(400).send({
      message: "Пароль и почта не могут быть пустыми!",
    });
  }
  const newadmin = {
    firstName: req.body.firstName ? req.body.firstName : null,
    firstName: req.body.lastName ? req.body.lastName : null,
    patronymic: req.body.patronymic ? req.body.patronymic : null,
    phone: req.body.phone ? req.body.phone : null,
    email: req.body.email ? req.body.email : null,
    telegram: req.body.telegram ? req.body.telegram : null,
    rights: [],
  };
  const newsettings = {
    name: req.body.username
      ? req.body.username
      : req.body.firstName
      ? req.body.firstName
      : null,
    password: req.body.password,
    usertype: type,
    push_token: req.body.push_token,
    prefers_telegram: req.body.prefers_telegram,
    prefers_email: req.body.prefers_email,
    prefers_push: req.body.prefers_push,
    prefers_: req.body.prefers_,
  };
  Admin.create(newadmin)
    .then((data) => {
      res.send(data);
      admin = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    });

  Settings.create(newsettings)
    .then((data) => {
      res.send(data);
      settings = data;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Settings.",
      });
    });
    admin.setSettings(settings);
    settings.setAdmin(admin);
  
}

exports.telegramSignin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}

exports.signin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const login = req.body.login;
  const password = req.body.password;
  if (!login || !password) {
    res.status(400).send({
      message: "Пароль и почта не могут быть пустыми!",
    });
  }
  Settings.findOne({
    where: { name: login },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Пользователь не найден!" });
      }
      if (!data.validatePassword(password)) {
        return res.status(401).send({ message: "Неверный пароль!" });
      } 

      const token = jwt.sign({ UID: data.UID }, process.env.SECRET_KEY, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        token: token,
        user: data
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

exports.addSalons = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}

exports.getSalons = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // checkToken 

  // TODO:
}

exports.addMasters = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}

exports.getMasters = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}

exports.addManagers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}

exports.getManagers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // TODO:
}
exports.getAdmins = async (req, res) => {
  const admins = await Admin.findAll({
    include: [
      { model: Salon, through: { attributes: ["id", "title"] } },
    ],
  });
  res.status(200).json(admins);
};

exports.getAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  const admin = await Admin.findByPk(adminId, {
    include: [
      { model: Salon, through: { attributes: ["id", "title"] } },
    ],
  });
  if (!admin) {
    return res.status(404).send({ message: "Администратор не найден" });
  }
  res.status(200).json(admin);
};

exports.getAdminWithSettings = async (req, res) => {
  const adminId = req.params.adminId;
  const admin = await Admin.findByPk(adminId, {
    include: [
      { model: Settings, attributes: ["setting1", "setting2", "setting3"] },
    ],
  });
  if (!admin) {
    return res.status(404).send({ message: "Администратор не найден" });
  }
  res.status(200).json(admin);
};

exports.updateAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  const { firstName, lastName, patronymic } = req.body;
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    return res.status(404).send({ message: "Администратор не найден" });
  }
  await admin.update({ firstName, lastName, patronymic });
  res.status(200).send({ message: "Администратор обновлен" });
};

exports.createSalon = async (req, res) => {
  const { title, address } = req.body;
  const adminId = req.params.adminId;
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    return res.status(404).send({ message: "Администратор не найден" });
  }
  const salon = await Salon.create({ title, address });
  await admin.addSalon(salon);
  res.status(201).json(salon);
};

exports.bulkCreateSalons = async (req, res) => {
  const { salons } = req.body;
  const adminId = req.params.adminId;
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    return res.status(404).send({ message: "Администратор не найден" });
  }
  let createdSalons = [];
  for (let i = 0; i < salons.length; i++) {
    const { title, address } = salons[i];
    const newSalon = await Salon.create({ title, address });
    await admin.addSalon(newSalon);
    createdSalons.push(newSalon);
  }
  res.status(201).json(createdSalons);
};
