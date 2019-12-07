import Resource from "./resource";

/**
 * Represents statistical data.
 *
 * @type {Resource}
 */
const Stats = new Resource(`${process.env.VUE_APP_API_URL}/stats`);

export default Stats
