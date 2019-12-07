import Resource from "./resource";

/**
 * Represent the Expense resource.
 *
 * @type {Resource}
 */
const Expense = new Resource(`${process.env.VUE_APP_API_URL}/expenses`)

export default Expense
