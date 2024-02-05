const { Op } = require("sequelize");
const moment = require("moment");
const schedule = require("node-schedule");
const db = require("../../models");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/schedule/clearCredential.js";

const job = schedule.scheduleJob("*/2 * * * *", async () => {
  const transaction = await db.sequelize.transaction();
  try {
    const now = moment().format();

    const customer = await db.Customer.findAll({});

    for (let i = 0; i < customer.length; i++) {
      console.log(
        moment(customer[i].credentialExpAt).isBefore(now),
        "<<<<< IMPORTANT"
      );
      if (moment(customer[i].credentialExpAt).isBefore(now)) {
        // eslint-disable-next-line no-await-in-loop
        await db.Customer.update(
          {
            credential: null,
            credentialExpAt: null,
          },
          {
            where: {
              id: customer[i].id,
            },
            transaction,
          }
        );
      }
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "delete customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
});
