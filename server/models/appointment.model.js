module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointments", {
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    UID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      alllowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    cost: {
      type: DataTypes.INTEGER,
    },

    start: {
      type: DataTypes.DATE,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
    },
    end: {
      type: DataTypes.DATE,
    },
    service: {
      type: DataTypes.STRING,
    },
    master: {
      type: DataTypes.STRING,
    },
    client: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
    },

    
  },
  {
    hooks: {
      beforeBulkCreate: async (appointments) => {
        // console.log('appointments', appointments)
        // console.log('bulk creating appointments');
        for (let i = 0; i < appointments.length; i++) {
          if (!appointments[i].start) {
            return Promise.reject(new Error('Не указано время начала записи, запись не создан'));
          }
          if (!appointments[i].end && !appointments[i].durationMinutes) {
            return Promise.reject(new Error('Не указано время конца записи или продолжительность, запись не создана'));
          }

          if (appointments[i].end && appointments[i].durationMinutes && appointments[i].end !== appointments[i].start) {
            return Promise.reject(new Error('Не может быть указаны несовпадающие продолжительность и время конца, запись не создана'));
          }

          if (appointments[i].end && !appointments[i].durationMinutes) {
            // console.log('checking appointment duration: ', appointments[i].end, appointments[i].start)
            // console.log(Math.round((appointments[i].end - appointments[i].start) / 60000));
            appointments[i].durationMinutes = Math.round((appointments[i].end - appointments[i].start) / 60000);
          }

          if (!appointments[i].end && appointments[i].durationMinutes) {
            appointments[i].end = appointments[i].start + appointments[i].durationMinutes;
          }

        }
        // TODO: check if there are any overlapping appointments in the array with appointments with start and end
        
      },
      beforeSave: async (appointment) => {
        try {
          if (appointment.start.typeof === 'string') {
            appointment.start = new Date(appointment.start);
            if (appointment.end.typeof === 'string') {
              appointment.end = new Date(appointment.end);
            }
          }
        } catch (error) {
          return Promise.reject(new Error('Ошибка в формате даты начала записи, запись не создана, первоначальная ошибка: ' + error));
        }
        if (appointment.start >= appointment.end) {
          return Promise.reject(new Error('Время начала записи не может быть позже времени конца'));
        }
        // try {
        //   console.log('checking appointment')
        //   Appointment.findAll({
        //     where: {
        //       start: {
        //         [DataTypes.Op.between]: [appointment.start, appointment.end]
        //       },
        //       end: {
        //         [DataTypes.Op.between]: [appointment.start, appointment.end]
        //       }
        //     }
        //   }).then ((appointments) => {
        //     if (appointments.length > 0) {
        //       return Promise.reject({message: 'Время записи занято, запись не создана', conflictingAppointments: appointments, initialAppointment: appointment});
        //     }
        //   }).catch((error) => {
        //     return Promise.reject(new Error('Ошибка при проверке времени записи, запись не создана, первоначальная ошибка: ' + error));
        //   });

        // } catch (error) {
        //   return Promise.reject(new Error('Ошибка при проверке времени записи, первоначальная ошибка: ' + error));
        // }
      }
    }
  });
  
  return Appointment;
};

// TODO:
