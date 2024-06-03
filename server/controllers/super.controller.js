const db = require("../models");
const Salon = db.salon;
const ClientBase = db.clientbase;
const Appointment = require("../models/appointment.model");


exports.getSalonsDeep = async (req, res) => {
  db.Foo = db.sequelize.define("Foo", { name: db.Sequelize.TEXT });
  db.Bar = db.sequelize.define("Bar", { name: db.Sequelize.TEXT });
  db.Foo.belongsToMany(db.Bar, { through: "Foo_Bar" });
  db.Bar.belongsToMany(db.Foo, { through: "Foo_Bar" });

  // await db.sequelize.sync();
  const foo = await db.Foo.create({ name: "foo" });
  const bar = await db.Bar.create({ name: "bar" });
  const bar2 = await db.Bar.create({ name: "bark" });
  await foo.addBar(bar);
  await foo.addBar(bar2);
  const fetchedFoo = await db.Foo.findAll({ include: db.Bar });
  const fetchedBar = await db.Bar.findAll({ include: db.Foo }, {orderBy: ["id"]}, {orderBy: ["id"]});
  const fetchedBarwithFoo = await db.Bar.findAll({include: {all: true}}, {orderBy: ["id"]}, {orderBy: ["id"]});
  // console.log(JSON.stringify(fetchedFoo, null, 2));
  
  
  const salons = await db.salon.findAll({
    include: {all: true },
  })
  // console.log(JSON.stringify(salons, null, 3));
  // console.log('salon deep');
  // const clients = await db.client.findAll({
  //   include: { model: db.appointment, include: [db.master] },
  // })
  // res.send(clients);
  // .then((data) => {

  //   res.send(data);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(501).send({
  //     message:
  //       err.message || "Some error occurred while retrieving Appointments.",
  //   });
  // });
};
