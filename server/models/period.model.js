module.exports = (sequelize, DataTypes) => {
  const Op = DataTypes.Op;
  const Period = sequelize.define("periods", {
    UID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    type : {
      type: DataTypes.ENUM('busy', 'available', 'holiday', 'forVIP'),
      defaultValue: 'busy'
    },
    available: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.type === 'available';
      },
      set(value) {
        if (value) {
          this.type = 'available';
        } else {
          this.type = 'busy';
        }
      }
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    durationMinutes: {
      type: DataTypes.INTEGER
    },
    end: {
      type: DataTypes.DATE
    },
    daypart: {
      type: DataTypes.VIRTUAL,
      get() {
        let type = 'morning';
        let hour = this?.start?.getHours();

        if (hour >= 12) {
          type = 'afternoon';
        }

        if (hour >= 18) {
          type = 'evening';
        }
        if (hour >= 22) {
          type = 'night';
        }
        return type;
      }
    },



  },
  {
    hooks: {
      beforeBulkCreate: async (periods) => {
        // console.log('periods', periods)
        // console.log('bulk creating periods');
        for (let i = 0; i < periods.length; i++) {
          if (!periods[i].start) {
            return Promise.reject(new Error('Не указано время начала периода, слот не создан'));
          }
          if (!periods[i].end && !periods[i].durationMinutes) {
            return Promise.reject(new Error('Не указано время конца периода или продолжительность, слот не создан'));
          }

          if (periods[i].end && periods[i].durationMinutes && periods[i].end !== periods[i].start) {
            return Promise.reject(new Error('Не может быть указаны несовпадающие продолжительность и время конца, слот не создан'));
          }

          if (periods[i].end && !periods[i].durationMinutes) {
            // console.log('checking period duration: ', periods[i].end, periods[i].start)
            // console.log(Math.round((periods[i].end - periods[i].start) / 60000));
            periods[i].durationMinutes = Math.round((periods[i].end - periods[i].start) / 60000);
          }

          if (!periods[i].end && periods[i].durationMinutes) {
            periods[i].end = periods[i].start + periods[i].durationMinutes;
          }
          // try {
          //   console.log('checking period for scheduleUID', scheduleUID_passed)
          //   Period.findAll({
          //     where: {
          //       start: {
          //         [Op.between]: [periods[i].start, periods[i].end]
          //       },
          //       end: {
          //         [Op.between]: [periods[i].start, periods[i].end]
          //       },
          //       scheduleUID: scheduleUID_passed
          //     }
          //   }).then ((found) => {
          //     if (found.length > 0) {
          //       return Promise.reject({message: 'Период занят, слот не создан', conflictingPeriod: found.dataValues, initialPeriod: periods[i]});
          //     }
          //   }).catch((error) => {
          //     console.log(error)
          //     return Promise.reject(error);
          //   });
  
          // } catch (error) {
          //   return Promise.reject(new Error('Ошибка в формате даты периода, слот не создан'));
          // }


        }
        // TODO: check if there are any overlapping periods in the array with periods with start and end
        
      },
      beforeSave: async (period) => {
        console.log('period', period)
        try {
          if (period.start.typeof === 'string') {
            period.start = new Date(period.start);
            if (period.end.typeof === 'string') {
              period.end = new Date(period.end);
            }
          }
        } catch (error) {
          return Promise.reject(new Error('Ошибка в формате даты периода, слот не создан'));
        }
        if (period.start >= period.end) {
          return Promise.reject(new Error('Начало периода не может быть позже конца bkb совпадать с ним'));
        }
        try {
          console.log('checking period')
          Period.findAll({
            where: {
              start: {
                [Op.between]: [period.start, period.end]
              },
              end: {
                [Op.between]: [period.start, period.end]
              }
            }
          }).then ((periods) => {
            if (periods.length > 0) {
              return Promise.reject({message: 'Период занят dj, слот не создан', conflictingPeriods: periods, initialPeriod: period});
            }
          }).catch((error) => {
            return Promise.reject(error);
          });

        } catch (error) {
          return Promise.reject(new Error('Ошибка в формате даты периода, слот не создан'));
        }

      }
    }
  });

  return Period;
}