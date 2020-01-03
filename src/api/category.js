import Resource from "./resource";

/**
 * Represent the Category resource.
 *
 * @type {Resource}
 */
const Category = new Resource(`${process.env.VUE_APP_API_URL}/categories`)

export default Category
